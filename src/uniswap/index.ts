import axios from 'axios'

import { Pool, PoolDayData, PoolHourData, Tick, Token } from '@/types/uniswap.interface'

import lscache from './lscache'
import { getCurrentNetwork } from './network'

const promiseCache = {} as {
  [url: string]: Promise<any>
}

const _queryUniswap = async (query: string, useCache = true): Promise<any> => {
  if (!useCache) {
    return sendRequest(query)
  }

  if (promiseCache[query]) {
    return promiseCache[query]
  }

  const req = sendRequest(query)
  promiseCache[query] = req
  return req
    .then((res) => {
      promiseCache[query] = null
      return Promise.resolve(res)
    })
    .catch((err) => {
      promiseCache[query] = null
      return Promise.reject(err)
    })

  async function sendRequest(query: string) {
    const { data } = await axios({
      url: getCurrentNetwork().subgraphEndpoint,
      method: 'post',
      data: {
        query,
      },
    })
    return data.data
  }
}

export const getPoolHourData = async (
  poolAddress: string,
  numberOfDays = 14,
): Promise<PoolHourData[]> => {
  const { poolHourDatas } = await _queryUniswap(`{
    poolHourDatas(skip: 0, first: ${
      numberOfDays * 24
    }, orderBy: periodStartUnix, orderDirection: desc, where:{pool: "${poolAddress}"}) {
      open
      close
      periodStartUnix
      feesUSD
      high
      low
      liquidity
    }
  }`)

  // console.log('poolHourDatas :>> ', poolHourDatas)
  return poolHourDatas
}

export const getPoolDayData = async (
  poolAddress: string,
  numberOfDays = 30,
): Promise<PoolDayData[]> => {
  const { poolDayDatas } = await _queryUniswap(`{
    poolDayDatas(skip: 0, first: ${numberOfDays}, orderBy: date, orderDirection: desc, where:{pool: "${poolAddress}"}) {
      open
      close
      date
      feesUSD
      high
      low
      liquidity
      tvlUSD
      txCount
      volumeUSD
      volumeToken0
      volumeToken1
    }
  }`)

  // console.log('poolDayDatas :>> ', poolDayDatas)
  return poolDayDatas
}

const _getPoolTicksByPage = async (
  poolAddress: string,
  page: number,
): Promise<Tick[]> => {
  const res = await _queryUniswap(`{
    ticks(first: 1000, skip: ${
      page * 1000
    }, where: { poolAddress: "${poolAddress}" }, orderBy: tickIdx) {
      tickIdx
      liquidityNet
      liquidityGross
      pool {
        tick
        token0Price
        token1Price
        token0 {
          decimals
          symbol
        }
        token1 {
          decimals
          symbol
        }
      }
      price0
      price1
    }
  }`)

  return res.ticks
}
export const getPoolTicks = async (poolAddress: string): Promise<Tick[]> => {
  const PAGE_SIZE = 3
  let result: Tick[] = []
  let page = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [pool1, pool2, pool3] = await Promise.all([
      _getPoolTicksByPage(poolAddress, page),
      _getPoolTicksByPage(poolAddress, page + 1),
      _getPoolTicksByPage(poolAddress, page + 2),
    ])

    result = [...result, ...pool1, ...pool2, ...pool3]
    break
    if (pool1.length === 0 || pool2.length === 0 || pool3.length === 0) {
      break
    }
    page += PAGE_SIZE
  }
  // result = await _getPoolTicksByPage(poolAddress, 0)
  // console.log('getPoolTicks result :>> ', result)
  // store.setState({
  //   v3PoolTicks: result
  // });
  return result
}

export const sortTokens = (token0: Token, token1: Token): Token[] => {
  if (token0.id < token1.id) {
    return [token0, token1]
  }
  return [token1, token0]
}

const _processTokenInfo = (token: Token) => {
  if (token.name === 'Wrapped Ether' || token.name === 'Wrapped Ethereum') {
    token.name = 'Ethereum'
    token.symbol = 'ETH'
    token.logoURI =
      'https://cdn.iconscout.com/icon/free/png-128/ethereum-2752194-2285011.png'
  }
  if (token.name === 'Wrapped Matic') {
    token.name = 'Polygon Native Token'
    token.symbol = 'MATIC'
  }

  return token
}

export const getTopTokenList = async (): Promise<Token[]> => {
  const cacheKey = `${getCurrentNetwork().id}_getTopTokenList`
  const cacheData = lscache.get(cacheKey)
  const searchTokenPageItems = localStorage.getItem(
    `SearchTokenPage_${getCurrentNetwork().id}_tokens`,
  )
  if (cacheData) {
    if (searchTokenPageItems !== null) {
      return [...cacheData, ...JSON.parse(searchTokenPageItems)]
    }
    return cacheData
  }

  const res = await _queryUniswap(`{
    tokens(skip: 0, first: 50, orderBy: volumeUSD, orderDirection: desc) {
      id
      name
      symbol
      volumeUSD
      decimals
    }
  }`)

  if (res === undefined || res.tokens.length === 0) {
    return []
  }

  const tokens = res.tokens as Token[]
  let result = tokens.map(_processTokenInfo).filter((token) => token.symbol.length < 30)

  lscache.set(cacheKey, result, 10) // 10 mins
  if (searchTokenPageItems !== null) {
    result = [...result, ...JSON.parse(searchTokenPageItems)]
  }

  return result
}

export const getTopTvlPools = async (limit = 50): Promise<Pool[]> => {
  const { pools } = await _queryUniswap(`{
    pools(
      first: ${limit},
      orderBy: totalValueLockedETH,
      orderDirection:desc, where: {
        totalValueLockedUSD_gt: 10000,
        volumeUSD_gt: 1}) {
      id
      feeTier
      totalValueLockedUSD
      totalValueLockedETH
      token0Price
      token1Price
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      poolDayData(orderBy: date, orderDirection:desc,first:1)
      {
        date
        volumeUSD
        tvlUSD
        feesUSD
        liquidity
        high
        low
        volumeToken0
        volumeToken1
        close
        open
      }
    }
  }`)

  // console.log('getTopTvlPools :>> ', pools)

  return pools as Pool[]
}

export const getPoolFromPair = async (token0: Token, token1: Token): Promise<Pool[]> => {
  const sortedTokens = sortTokens(token0, token1)
  // const sortedTokens = [token0, token1];

  const { pools } = await _queryUniswap(`{
    pools(orderBy: feeTier, where: {
        token0: "${sortedTokens[0].id}",
        token1: "${sortedTokens[1].id}"}) {
      id
      tick
      sqrtPrice
      feeTier
      liquidity
      token0Price
      token1Price
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      poolDayData(orderBy: date, orderDirection:desc,first:1) {
        date
        volumeUSD
        tvlUSD
        feesUSD
        liquidity
        high
        low
        volumeToken0
        volumeToken1
        close
        open
      }
    }
  }`)

  console.log('getPoolFromPair :>> ', pools)
  // store.setState({
  //   v3PoolsFromPair: pools
  // });
  return pools as Pool[]
}

export const getPoolInfo = async (poolAddress: string): Promise<Pool> => {
  const { pools } = await _queryUniswap(`{
    pools(
      where:{id: "${poolAddress}"}) {
      id
      feeTier
      totalValueLockedUSD
      totalValueLockedETH
      tick
      liquidity
      token0Price
      token1Price
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      poolDayData(orderBy: date, orderDirection:desc,first:1)
      {
        date
        volumeUSD
        tvlUSD
        feesUSD
        liquidity
        high
        low
        volumeToken0
        volumeToken1
        close
        open
      }
    }
  }`)

  // console.log('getPoolInfo :>> ', pools)

  return pools?.[0] || {}
}

export const getTokensInfo = async (tokenAddresses: string[]) => {
  const str = tokenAddresses.map((item) => `"${item}"`)
  const res = await _queryUniswap(`{
    tokens(
      where:{id_in: [${str}]}
    ) {
      id
      symbol
      name
      decimals
      volumeUSD
      poolCount
    }
  }`)

  console.log('getTokensInfo :>> ', res)

  return res
}

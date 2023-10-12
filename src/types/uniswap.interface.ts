export interface Network {
  id: string
  name: string
  desc: string
  logoURI: string
  disabled?: boolean
  isNew?: boolean
  subgraphEndpoint: string
}

export interface Tick {
  tickIdx: string
  liquidityNet: string
  liquidityGross: string
  price0: string
  price1: string
  pool: {
    tick: string
    token0Price: string
    token1Price: string
    token0: {
      decimals: string
      symbol: string
    }
    token1: {
      decimals: string
      symbol: string
    }
  }
}

export interface Token {
  id: string
  name: string
  symbol: string
  volumeUSD: string
  logoURI: string
  decimals: string
}

export interface Pool {
  id: string
  feeTier: string
  liquidity: string
  tick: string
  sqrtPrice: string
  token0Price: string
  token1Price: string
  token0: Token
  token1: Token
  totalValueLockedUSD: string
  totalValueLockedETH: string
  poolDayData: PoolDayData[]
}

export interface PoolDayData {
  open: string
  close: string
  date: number
  feesUSD: string
  high: string
  low: string
  liquidity: string
  tvlUSD: string
  txCount: number
  volumeUSD: string
  volumeToken0: string
  volumeToken1: string
}

export interface PoolHourData {
  open: string
  close: string
  periodStartUnix: number
  feesUSD: string
  high: string
  low: string
  liquidity: string
}

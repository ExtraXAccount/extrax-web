import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'

import { getTokenConfigByAddress, TOKEN_LIST } from '@/constants/token'

import { SupportedChainId } from '../constants/chains'

export function isWETH(chainId: SupportedChainId, address: string) {
  return TOKEN_LIST[chainId || 1]?.WETH?.address === address
}

export function isStable(chainId: SupportedChainId, address: string) {
  const tokenInfo = getTokenConfigByAddress(chainId, address)
  if (tokenInfo) {
    return (
      tokenInfo.name === 'USDC' ||
      tokenInfo.name === 'USDT' ||
      tokenInfo.name === 'USX' ||
      tokenInfo.name === 'DOLA' ||
      tokenInfo.name === 'USDbC'
    )
  }
  return false
}

export function strToDecimals(bn?: string, decimals = 18) {
  if (!bn) {
    return 0
  }
  return new BigNumber(bn).div(new BigNumber(`1e+${decimals}`)).toNumber()
}

export function toDecimals(bn: BN | bigint, decimals = 18) {
  if (!bn) {
    return 0
  }
  return new BigNumber(bn.toString()).div(new BigNumber(`1e+${decimals}`)).toNumber()
}

export function formatFarmPoolName(poolKey: string) {
  if (!poolKey) {
    return ''
  }
  return poolKey.replace(/^(v|s)AMM(V2)?-/g, '').replace('/', '-')
}

export function formatSymbol(poolKey: string) {
  if (!poolKey) {
    return ''
  }
  const [symbol] = poolKey.split('-')
  return symbol
}

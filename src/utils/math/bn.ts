import { BigNumber as BN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'

import { toFixed } from '.'

export const bn18 = BN.from('1000000000000000000')

export const bn10 = BN.from('10000000000')

export function toBNString(base: number | string, decimals = 18) {
  if (!base) {
    return '0'
  }
  return new BigNumber(base)
    .multipliedBy(new BigNumber(`1e+${decimals}`))
    .toFixed()
    .replace(/\..*$/, '')
}

export function toDecimals(bn: BN, decimals = 18) {
  if (!bn) {
    return 0
  }
  return new BigNumber(bn.toString()).div(new BigNumber(`1e+${decimals}`)).toNumber()
}

export function toDecimalsString(bn: BN, decimals = 18) {
  if (!bn) {
    return ''
  }
  return new BigNumber(bn.toString())
    .div(new BigNumber(`1e+${decimals}`))
    .toFixed(decimals)
    .replace(/\.?0+$/, '')
}

export function toDecimalsFixed4(bn: BN, decimals = 18) {
  if (!bn) {
    return 0
  }
  const amount = toDecimals(bn, decimals)
  if (amount > 100) {
    return toFixed(amount, 2)
  } else if (amount > 1) {
    return toFixed(amount, 4)
  } else if (amount > 0.0001) {
    return toFixed(amount, 6)
  }
  return toFixed(amount, 8)
}

export function stringToDecimals(numStr: string, decimals = 18) {
  return BigNumber(numStr)
    .div(new BigNumber(`1e+${decimals}`))
    .toNumber()
}

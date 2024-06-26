import { BigNumber as EthersBN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'

import { stringToDecimalStr, toBNString } from './math/bn'

export function bi2decimalStr(bi: bigint, decimals = 18) {
  return stringToDecimalStr(bi.toString(), decimals)
}

export function num2bn(num: string | number, decimals = 18) {
  return BigInt(toBNString(num, decimals))
}

export function bn2bi(bn: BigNumber | EthersBN) {
  return BigInt(bn.toString())
}

export function bi2ebn(bi: bigint) {
  return EthersBN.from(bi.toString())
}

export function bi2num(bi: bigint) {
  return Number(bi)
}

export function ebn2bi(bn: EthersBN) {
  return BigInt(bn.toString())
}

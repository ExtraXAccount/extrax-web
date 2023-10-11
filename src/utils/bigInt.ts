import { BigNumber as EthersBN } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'

export function bi2bn(bi: bigint) {
  return BigNumber(bi.toString())
}

export function bn2bi(bn: BigNumber | EthersBN) {
  return BigInt(bn.toString())
}

export function bi2ebn(bi: bigint) {
  return EthersBN.from(bi.toString())
}

export function ebn2bi(bn: EthersBN) {
  return BigInt(bn.toString())
}

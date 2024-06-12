import { BigNumber as BN } from '@ethersproject/bignumber'

export function X96toNumber(x96: BN) {
  if (!x96) {
    return 0
  }
  return (
    x96.mul(BN.from(1000000000000)).div(BN.from(1).shl(96)).toNumber() / 1000000000000
  )
}

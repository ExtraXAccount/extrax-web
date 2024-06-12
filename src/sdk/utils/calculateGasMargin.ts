import { BigNumber } from '@ethersproject/bignumber'

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(140).div(100)
}

export function calculateGasLimit(estimate: bigint) {
  return (estimate * 120n) / 100n
}

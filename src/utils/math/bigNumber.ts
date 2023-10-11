import BigNumber from 'bignumber.js'

export function plus(str1: string | number, str2: string | number) {
  return new BigNumber(str1).plus(new BigNumber(str2))
}

export function minus(str1: string | number, str2: string | number) {
  return new BigNumber(str1).minus(new BigNumber(str2))
}

export function mul(str1: string | number, str2: string | number) {
  return new BigNumber(str1).multipliedBy(new BigNumber(str2))
}

export function div(str1: string | number, str2: string | number) {
  return new BigNumber(str1).div(new BigNumber(str2))
}

export function isGt(str1: string | number, str2: string | number) {
  return new BigNumber(str1).gt(new BigNumber(str2))
}

export function isGte(str1: string | number, str2: string | number) {
  return new BigNumber(str1).gte(new BigNumber(str2))
}

export function isLt(str1: string | number, str2: string | number) {
  return new BigNumber(str1).lt(new BigNumber(str2))
}

export function isLte(str1: string | number, str2: string | number) {
  return new BigNumber(str1).lte(new BigNumber(str2))
}

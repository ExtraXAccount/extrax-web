import BigNumber from 'bignumber.js'

export function toBNString(base: number | string, decimals = 18) {
  if (!base) {
    return '0'
  }
  return new BigNumber(base)
    .multipliedBy(new BigNumber(`1e+${decimals}`))
    .toFixed()
    .replace(/\..*$/, '')
}

export function stringToDecimals(numStr: string, decimals = 18) {
  return BigNumber(numStr)
    .div(new BigNumber(`1e+${decimals}`))
    .toNumber()
}

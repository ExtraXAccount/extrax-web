export function nameChecker(tokenName: string | undefined) {
  if (!tokenName) {
    return ''
  }
  if (tokenName === 'WETH') {
    return 'ETH'
  }
  return tokenName
}

// get pair default base token
export function getDefaultBaseToken(token0: string, token1: string) {
  const baseTokenPriority = [
    'USDC',
    'USDbC',
    'USDT',
    'DAI',
    'DOLA',
    'ETH',
    'WETH',
    'BUSD',
    'OP',
    'VELO',
    'EXTRA',
  ]
  for (let ii = 0; ii < baseTokenPriority.length; ii++) {
    const item = baseTokenPriority[ii]
    if (item === token0) {
      return 0
    }
    if (item === token1) {
      return 1
    }
  }
  return 0
}

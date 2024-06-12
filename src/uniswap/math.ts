import bn from 'bignumber.js'

import { token0price2tick } from '@/utils/math/priceTickConvert'

export const findMin = (data: number[]): number => {
  return data.reduce((min, val) => (min > val ? val : min), Number.MAX_SAFE_INTEGER)
}

export const findMax = (data: number[]): number => {
  return data.reduce((max, val) => (max > val ? max : val), 0)
}

export const averageArray = (data: number[]): number => {
  return data.reduce((result, val) => result + val, 0) / data.length
}

export const divideArray = (data0: number[], data1: number[]): number[] => {
  const result: number[] = []
  data0.forEach((d, i) => {
    result[i] = d / data1[i]
    if (isNaN(result[i])) result[i] = result[i - 1]
  })
  return result
}

export const getFeeTierPercentage = (tier: string): number => {
  if (tier == '100') return 0.01 / 100
  if (tier == '500') return 0.05 / 100
  if (tier == '3000') return 0.3 / 100
  if (tier == '10000') return 1 / 100
  return 0
}

export interface Tick {
  tickIdx: string
  liquidityNet: string
  price0: string
  price1: string
}

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

const Q96 = new bn(2).pow(96)

// for calculation detail, please visit README.md (Section: Calculation Breakdown, No. 1)
interface TokensAmount {
  amount0: number
  amount1: number
}
export const getTokensAmountFromDepositAmountUSD = (
  P: number,
  Pl: number,
  Pu: number,
  priceUSDX: number,
  priceUSDY: number,
  depositAmountUSD: number,
): TokensAmount => {
  const deltaL =
    depositAmountUSD /
    ((Math.sqrt(P) - Math.sqrt(Pl)) * priceUSDY +
      (1 / Math.sqrt(P) - 1 / Math.sqrt(Pu)) * priceUSDX)

  let deltaY = deltaL * (Math.sqrt(P) - Math.sqrt(Pl))
  if (deltaY * priceUSDY < 0) deltaY = 0
  if (deltaY * priceUSDY > depositAmountUSD) deltaY = depositAmountUSD / priceUSDY

  let deltaX = deltaL * (1 / Math.sqrt(P) - 1 / Math.sqrt(Pu))
  if (deltaX * priceUSDX < 0) deltaX = 0
  if (deltaX * priceUSDX > depositAmountUSD) deltaX = depositAmountUSD / priceUSDX

  return { amount0: deltaX, amount1: deltaY }
}

// for calculation detail, please visit README.md (Section: Calculation Breakdown, No. 2)
const getLiquidityForAmount0 = (
  sqrtRatioAX96: bn,
  sqrtRatioBX96: bn,
  amount0: bn,
): bn => {
  // amount0 * (sqrt(upper) * sqrt(lower)) / (sqrt(upper) - sqrt(lower))
  const intermediate = mulDiv(sqrtRatioBX96, sqrtRatioAX96, Q96)
  return mulDiv(amount0, intermediate, sqrtRatioBX96.minus(sqrtRatioAX96))
}

const getLiquidityForAmount1 = (
  sqrtRatioAX96: bn,
  sqrtRatioBX96: bn,
  amount1: bn,
): bn => {
  // amount1 / (sqrt(upper) - sqrt(lower))
  return mulDiv(amount1, Q96, sqrtRatioBX96.minus(sqrtRatioAX96))
}

const getSqrtPriceX96 = (
  price: number,
  token0Decimal: number,
  token1Decimal: number,
): bn => {
  const token0 = expandDecimals(price, token0Decimal)
  const token1 = expandDecimals(1, token1Decimal)

  return token0.div(token1).sqrt().multipliedBy(Q96)
}

export const getLiquidityDelta = (
  P: number,
  lowerP: number,
  upperP: number,
  amount0: number,
  amount1: number,
  token0Decimal: number,
  token1Decimal: number,
): bn => {
  const amt0 = expandDecimals(amount0, token1Decimal)
  const amt1 = expandDecimals(amount1, token0Decimal)

  const sqrtRatioX96 = getSqrtPriceX96(P, token0Decimal, token1Decimal)
  const sqrtRatioAX96 = getSqrtPriceX96(lowerP, token0Decimal, token1Decimal)
  const sqrtRatioBX96 = getSqrtPriceX96(upperP, token0Decimal, token1Decimal)

  let liquidity: bn
  if (sqrtRatioX96.lte(sqrtRatioAX96)) {
    liquidity = getLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amt0)
  } else if (sqrtRatioX96.lt(sqrtRatioBX96)) {
    const liquidity0 = getLiquidityForAmount0(sqrtRatioX96, sqrtRatioBX96, amt0)
    const liquidity1 = getLiquidityForAmount1(sqrtRatioAX96, sqrtRatioX96, amt1)

    liquidity = bn.min(liquidity0, liquidity1)
  } else {
    liquidity = getLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amt1)
  }

  return liquidity
}

export const estimateFee = (
  liquidityDelta: bn,
  liquidity: bn,
  volume24H: number,
  feeTier: string,
): number => {
  const feeTierPercentage = getFeeTierPercentage(feeTier)
  const liquidityPercentage = liquidityDelta
    .div(liquidity.plus(liquidityDelta))
    .toNumber()

  return feeTierPercentage * volume24H * liquidityPercentage
}

export const getLiquidityFromTick = (poolTicks: Tick[], tick: number): bn => {
  // calculate a cumulative of liquidityNet from all ticks that poolTicks[i] <= tick
  let liquidity: bn = new bn(0)
  for (let i = 0; i < poolTicks.length - 1; ++i) {
    liquidity = liquidity.plus(new bn(poolTicks[i].liquidityNet))

    const lowerTick = Number(poolTicks[i].tickIdx)
    const upperTick = Number(poolTicks[i + 1]?.tickIdx)

    if (lowerTick <= tick && tick <= upperTick) {
      break
    }
  }

  return liquidity
}

const expandDecimals = (n: number | string | bn, exp: number): bn => {
  return new bn(n).multipliedBy(new bn(10).pow(exp))
}

const mulDiv = (a: bn, b: bn, multiplier: bn) => {
  return a.multipliedBy(b).div(multiplier)
}

export function getAssetsValue({ token1, token0, Pu, Pl, token1FuturePrice }) {
  // const currentPrice = token1.currentPrice;
  const futurePrice = token1FuturePrice

  const calculateTokensAmount = (pricesUSD: number) => {
    const P = Math.min(pricesUSD, Pu - 1)
    const priceUSDX = token1.currentPrice
    const priceUSDY = token0.currentPrice
    const depositAmountUSD = token1.baseValue + token0.baseValue

    // if (state.isFullRange && state.poolTicks) {
    //   const firstTick = state.poolTicks[0];
    //   const lastTick = state.poolTicks[state.poolTicks.length - 1];
    //   Pl = Number(firstTick.price0);
    //   Pu = Number(lastTick.price0);
    // }

    const { amount0, amount1 } = getTokensAmountFromDepositAmountUSD(
      P,
      Pl,
      Pu,
      priceUSDX,
      priceUSDY,
      depositAmountUSD,
    )

    return { price: P, amount0, amount1 }
  }

  const future = calculateTokensAmount(futurePrice)

  const token0AmountB = future.amount1
  const token1AmountB = future.amount0
  const valueUSDToken0B = token0AmountB * 1
  const valueUSDToken1B = token1AmountB * futurePrice

  // console.log('totalValueB :>> ', {
  //   valueUSDToken0B,
  //   valueUSDToken1B,
  //   token1AmountB,
  //   futurePrice,
  // });
  return valueUSDToken0B + valueUSDToken1B
}

export function getEstimateFee24H({
  priceAssumptionValue,
  Pl,
  Pu,
  token1price0,
  token0price0,
  token0Decimal,
  token1Decimal,
  depositAmountUSD,
  volume24H,
  feeTier,
  poolTicks,
}) {
  const P = priceAssumptionValue
  const priceUSDX = token1price0 || 1
  const priceUSDY = token0price0 || 1
  // const depositAmountUSD = depositAmountUSD;

  // if (state.isFullRange && state.poolTicks) {
  //   const firstTick = state.poolTicks[0];
  //   const lastTick = state.poolTicks[state.poolTicks.length - 1];
  //   Pl = Number(firstTick.price0);
  //   Pu = Number(lastTick.price0);
  // }

  const { amount0, amount1 } = getTokensAmountFromDepositAmountUSD(
    P,
    Pl,
    Pu,
    priceUSDX,
    priceUSDY,
    depositAmountUSD,
  )

  const deltaL = getLiquidityDelta(
    P,
    Pl,
    Pu,
    amount0,
    amount1,
    Number(token0Decimal || 18),
    Number(token1Decimal || 18),
  )

  const currentTick = token0price2tick(P, token0Decimal, token1Decimal)

  const L = getLiquidityFromTick(poolTicks || [], currentTick)

  const estimatedFeeResult =
    P >= Pl && P <= Pu ? estimateFee(deltaL, L, volume24H, feeTier) : 0

  return estimatedFeeResult
}

// uni v3 simulator
export const strategyV3b = (inputs) => {
  const token1V2 = inputs.investment / 2
  const token2V2 = token1V2 / inputs.currentPrice
  const L = Math.sqrt(token1V2 * token2V2)
  const L2 = token1V2 * token2V2
  const T = L * Math.sqrt(inputs.minPrice)
  const H = L / Math.sqrt(inputs.maxPrice)
  const maxToken2 = L2 / H - T
  const maxToken1 = L2 / T - H

  const LP_a =
    inputs.currentPrice > inputs.maxPrice
      ? 0
      : (L / Math.sqrt(inputs.currentPrice) - H) * inputs.currentPrice
  const LP_b =
    inputs.currentPrice > inputs.maxPrice
      ? maxToken2
      : L * Math.sqrt(inputs.currentPrice) - T
  const LP = LP_a + LP_b
  const multiplier =
    inputs.currentPrice > inputs.minPrice
      ? inputs.investment / LP
      : inputs.investment / (inputs.currentPrice * maxToken1)

  let x, y, value
  const price = inputs.futurePrice

  if (price < inputs.minPrice) {
    x = maxToken1 * multiplier
    y = 0
    value = x * price
  } else if (price >= inputs.minPrice && price <= inputs.maxPrice) {
    x = (L / Math.sqrt(price) - H) * multiplier
    y = (L * Math.sqrt(price) - T) * multiplier
    value = x * price + y
  } else if (price > inputs.maxPrice) {
    x = 0
    y = maxToken2 * multiplier
    value = y
  }

  return value
}

// uni v3 simulator
export const strategyV3 = ({
  investment,
  currentPrice,
  minPrice,
  maxPrice,
  futurePrice,
}) => {
  // x = L * Math.sqrt(p)
  // y = L / Math.sqrt(p)
  const token1V2 = investment / 2
  const token2V2 = token1V2 / currentPrice
  const L = Math.sqrt(token1V2 * token2V2)
  const L2 = token1V2 * token2V2
  const Xb = L * Math.sqrt(minPrice) // Xb
  const Ya = L / Math.sqrt(maxPrice) // Ya
  const maxTokenX = L2 / Ya - Xb // maxTokenXAmount = Xa - Xb
  const maxTokenY = L2 / Xb - Ya // maxTokenYAmount = Yb - Ya

  const LP_y =
    currentPrice > maxPrice ? 0 : (L / Math.sqrt(currentPrice) - Ya) * currentPrice
  const LP_x = currentPrice > maxPrice ? maxTokenX : L * Math.sqrt(currentPrice) - Xb
  const LP = LP_y + LP_x
  const multiplier =
    currentPrice > minPrice ? investment / LP : investment / (currentPrice * maxTokenY)

  let x, y, value
  const price = futurePrice

  if (price < minPrice) {
    y = maxTokenY
    y = maxTokenY * multiplier
    x = 0
    value = y * price // investment / currentPrice * futurePrice
    // value = maxTokenX * price
  } else if (price >= minPrice && price <= maxPrice) {
    y = (L / Math.sqrt(price) - Ya) * multiplier
    x = (L * Math.sqrt(price) - Xb) * multiplier
    value = y * price + x
  } else if (price > maxPrice) {
    y = 0
    x = maxTokenX * multiplier // maxTokenX * investment / (currentPrice * maxTokenY)
    value = x
  }

  return value
}

export const calcLiquidity0 = (sqrtA, sqrtB, amount, decimals) => {
  const lowest = Math.min(sqrtA, sqrtB)
  const highest = Math.max(sqrtA, sqrtB)
  return amount / ((highest - lowest) / highest / lowest / Math.pow(10, decimals))
}

export const calcLiquidity1 = (sqrtA, sqrtB, amount, decimals) => {
  const lowest = Math.min(sqrtA, sqrtB)
  const highest = Math.max(sqrtA, sqrtB)
  return amount / ((highest - lowest) / Math.pow(10, decimals))
}

export const calc24HrFee = (priceData, decimal0, decimal1) => {
  // console.log('priceData :>> ', priceData);

  const priceToken0usd =
    parseFloat(priceData.volumeUSD) / parseFloat(priceData.volumeToken0)
  const priceToken1usd =
    parseFloat(priceData.volumeUSD) / parseFloat(priceData.volumeToken1)

  // const decimal0 = pool.token0.decimals;
  // const decimal1 = pool.token1.decimals;
  const decimal = decimal1 - decimal0

  const sqrtHigh = Math.sqrt(parseFloat(priceData.high)) //SqrtA
  const sqrtLow = Math.sqrt(parseFloat(priceData.low)) //SQRTB
  const sqrtClose = Math.sqrt(parseFloat(priceData.close)) // sqrt

  const target = 1
  const delta =
    target /
    ((sqrtClose - sqrtLow) * priceToken0usd +
      (1 / sqrtClose - 1 / sqrtHigh) * priceToken1usd)
  const amount1 = delta * (sqrtClose - sqrtLow)
  const amount0 = delta * (1 / sqrtClose - 1 / sqrtHigh)

  const sqrtHighDec = Math.sqrt(priceData.high * Math.pow(10, decimal))
  const sqrtLowDec = Math.sqrt(priceData.low * Math.pow(10, decimal))
  const sqrtCloseDec = Math.sqrt(priceData.close * Math.pow(10, decimal))

  let liquidity
  const lowest = Math.min(sqrtHighDec, sqrtLowDec)
  const highest = Math.max(sqrtHighDec, sqrtLowDec)

  if (sqrtCloseDec <= lowest) {
    liquidity = calcLiquidity0(lowest, highest, amount0, decimal0)
  } else if (sqrtCloseDec > lowest && sqrtCloseDec < highest) {
    const liquidity0 = calcLiquidity0(sqrtCloseDec, highest, amount0, decimal0)
    const liquidity1 = calcLiquidity1(lowest, sqrtCloseDec, amount1, decimal1)
    liquidity = liquidity0 < liquidity1 ? liquidity0 : liquidity1
  } else {
    liquidity = calcLiquidity1(lowest, highest, amount1, decimal1)
  }

  const fee =
    parseFloat(priceData.feesUSD) *
    (liquidity / (liquidity + parseFloat(priceData.liquidity))) *
    100
  return isNaN(fee) ? 0 : fee
}

import BigNumber from 'bignumber.js'

export const InterestRates = {
  'model-1': {
    utilizationA: 6000,
    borrowingRateA: 1800,
    utilizationB: 9000,
    borrowingRateB: 2400,
    maxBorrowingRate: 10000,
  },

  'model-2': {
    utilizationA: 8000,
    borrowingRateA: 2000,
    utilizationB: 9000,
    borrowingRateB: 5000,
    maxBorrowingRate: 15000,
  },

  'model-stable': {
    utilizationA: 1,
    borrowingRateA: 500,
    utilizationB: 8000,
    borrowingRateB: 500,
    maxBorrowingRate: 10000,
  },
}

export interface IBorrowingRateConfig {
  utilizationA: number
  borrowingRateA: number
  utilizationB: number
  borrowingRateB: number
  maxBorrowingRate: number
}

export function calculateNextBorrowingRate(props: {
  liquidityChangedValue?: number
  borrowChangedValue?: number
  poolKey: string
  totalLiquidity: number
  utilizationRate: number
}) {
  const {
    totalLiquidity,
    utilizationRate,
    poolKey,
    borrowChangedValue = 0,
    liquidityChangedValue = 0,
  } = props
  const totalBorrow = totalLiquidity * utilizationRate
  const nextUtilizationRate =
    (totalBorrow + borrowChangedValue) / (totalLiquidity + liquidityChangedValue)

  const nextBorrowingRate = calculateBorrowingRate(
    nextUtilizationRate * 10000,
    getBorrowConfigByPoolKey(poolKey),
  )
  return {
    nextBorrowingRate: nextBorrowingRate / 10000,
    nextUtilizationRate,
  }
}

export function getBorrowConfigByPoolKey(poolKey: string) {
  if (poolKey.includes('STABLE')) {
    return InterestRates['model-stable']
  } else if (poolKey === 'USDC' || poolKey === 'WETH') {
    return InterestRates['model-1']
  }
  return InterestRates['model-2']
}

export default function calculateBorrowingRate(
  utilizationRate: number,
  config: IBorrowingRateConfig,
) {
  let borrowingRate = 0
  const maxUtilization = 10000
  const utilizationRateBn = new BigNumber(utilizationRate)
  if (utilizationRate <= config.utilizationA) {
    if (config.utilizationA == 0) {
      return config.borrowingRateA
    }
    borrowingRate = utilizationRateBn
      .multipliedBy(config.borrowingRateA)
      .div(config.utilizationA)
      .toNumber()
  } else if (utilizationRate <= config.utilizationB) {
    if (config.utilizationB == config.utilizationA) {
      return config.borrowingRateB
    }
    borrowingRate = new BigNumber(config.borrowingRateB)
      .minus(config.borrowingRateA)
      .multipliedBy(utilizationRateBn.minus(config.utilizationA))
      .div(new BigNumber(config.utilizationB).minus(config.utilizationA))
      .plus(config.borrowingRateA)
      .toNumber()
  } else {
    if (utilizationRate >= maxUtilization) {
      return config.maxBorrowingRate
    }
    borrowingRate = new BigNumber(config.maxBorrowingRate)
      .minus(config.borrowingRateB)
      .multipliedBy(utilizationRateBn.minus(config.utilizationB))
      .div(new BigNumber(maxUtilization).minus(config.utilizationB))
      .plus(config.borrowingRateB)
      .toNumber()
  }
  return borrowingRate
}

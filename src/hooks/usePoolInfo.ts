import { useMemo } from 'react'

import usePoolDayData from '@/hooks/usePoolDayData'
import usePoolTicks from '@/hooks/usePoolTicks'
import { getHistoricalAprFromPool } from '@/pages/Calculator/fn'

import usePoolBaseInfo from './usePoolBaseInfo'

export interface IUsePoolInfoOptions {
  isStable?: boolean
  priceLower?: number
  priceUpper?: number
  deposit0?: number
  deposit1?: number
}

const defaultPriceRangeSettings = {
  stable: [0.999, 1.001],
  unstable: [0.9, 1.1],
}

export default function usePoolInfo(poolAddress: string, options?: IUsePoolInfoOptions) {
  const baseInfo = usePoolBaseInfo(poolAddress)
  const daysData = usePoolDayData(poolAddress)
  const ticks = usePoolTicks(poolAddress)

  const currentPrice = useMemo(() => {
    return parseFloat(baseInfo.token0Price)
  }, [baseInfo.token0Price])

  const apr = useMemo(() => {
    if (!ticks.length || !daysData.length || !baseInfo.id) {
      return 0
    }
    const { isStable, priceLower, priceUpper, deposit0, deposit1 } = options || {}

    const defaultPriceRange = isStable ? defaultPriceRangeSettings.stable : defaultPriceRangeSettings.unstable
    const res = getHistoricalAprFromPool({
      backDays: 30,
      Pl: priceLower ?? currentPrice * defaultPriceRange[0],
      Pu: priceUpper ?? currentPrice * defaultPriceRange[1],
      feeTier: Number(baseInfo.feeTier),
      token0Decimals: Number(baseInfo.token0.decimals),
      token1Decimals: Number(baseInfo.token1.decimals),
      token0Count0: deposit0 || 1,
      token1Count0: deposit1 || 0,
      poolTicks: ticks,
      v3PoolDaysData: daysData,
      // reverseBaseToken: false,
    })
    return res
  }, [baseInfo, currentPrice, daysData, options, ticks])

  return {
    baseInfo,
    daysData,
    ticks,
    apr,
    currentPrice,
  }
}

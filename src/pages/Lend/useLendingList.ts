import { sumBy } from 'lodash'
import { useCallback, useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import usePrices from '@/hooks/usePrices'
import { useLendingManager2 } from '@/hooks/useSDK'
// import useSmartAccount from '@/hooks/useSmartAccount'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { useAccountStore, useLendStore } from '@/store'
import { IFormattedLendPool } from '@/store/lend'
import { aprToApy } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'
import { stringToDecimals } from '@/utils/math/bn'

// export interface
type chainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[chainId]

export default function useLendingList() {
  const lendingMng = useLendingManager2()
  const { lendPools, positions, isFetching, updateLendPools, updateIsFetching } = useLendStore()
  const { balances } = useAccountStore()
  const { getPrice } = usePrices()

  const { chainId } = useWagmiCtx()

  const chainLendingConfig = useMemo(() => {
    return Object.values<(typeof LendingConfig)[chainId][LendPoolConfig]>(LendingConfig[chainId] || {})
  }, [chainId])

  const fetchLendPools = useCallback(async () => {
    updateIsFetching(true)
    try {
      const res = await lendingMng.getPoolStatus()
      console.log('multicallPoolsStatus :>> ', res)
      updateLendPools([])
    } finally {
      updateIsFetching(false)
    }
  }, [lendingMng, updateIsFetching, updateLendPools])

  const formattedLendPools: IFormattedLendPool[] = useMemo(() => {
    return lendPools.map((pool, index) => {
      const config = chainLendingConfig[index]
      const position = positions.find(
        (item) => item.reserveId === config.reserveId && item.marketId === config.marketId
      )

      const apr =
        stringToDecimals(pool.currentBorrowingRate.toString(), 18) *
          div(pool.totalDebts.toString(), pool.totalLiquidity.toString()).toNumber() || 0
      const borrowApr = stringToDecimals(pool.currentBorrowingRate.toString(), 18) || 0
      return {
        ...config,
        ...pool,
        tokenSymbol: config.name,
        poolKey: config.name,
        formatted: {
          apr,
          apy: aprToApy(apr) || 0,
          borrowApr,
          borrowApy: aprToApy(borrowApr) || 0,
          totalSupply: stringToDecimals(pool.totalLiquidity.toString(), config.decimals) || 0,
          supplyCap: stringToDecimals(pool.config.supplyCap.toString(), 68) || 0,
          totalBorrowed: stringToDecimals(pool.totalDebts.toString(), config.decimals) || 0,
          borrowCap: stringToDecimals(pool.config.borrowCap.toString(), 68) || 0,
          availableLiquidity: stringToDecimals(pool.availableLiquidity.toString(), config.decimals) || 0,
          utilization: div(pool.totalDebts.toString(), pool.totalLiquidity.toString()).toNumber() || 0,
          exchangeRate: stringToDecimals(pool.exchangeRate.toString()) || 0,
          balance: stringToDecimals(balances[index * 3]?.toString(), config.decimals) || 0,
          deposited: position ? stringToDecimals(position.liquidity?.toString(), config.decimals) || 0 : 0,
          borrowed: position ? stringToDecimals(position.debt?.toString(), config.decimals) || 0 : 0,
          depositedBal: stringToDecimals(balances[index * 3 + 1]?.toString(), config.decimals) || 0,
          borrowedBal: stringToDecimals(balances[index * 3 + 2]?.toString(), config.decimals) || 0,
        },
      }
    })
  }, [balances, positions, chainLendingConfig, lendPools])

  const totalInfos = useMemo(() => {
    let totalSize = 0
    let totalBorrowed = 0
    formattedLendPools.forEach((pool) => {
      const tokenPrice = getPrice(pool.tokenSymbol)
      totalSize += pool.formatted.totalSupply * tokenPrice
      totalBorrowed += pool.formatted.totalBorrowed * tokenPrice
    })
    const totalAvailable = totalSize - totalBorrowed
    const globalUtilization = totalBorrowed / totalSize

    return {
      totalSize,
      totalBorrowed,
      totalAvailable,
      globalUtilization,
      maxOutflow: 5_000_000,
    }
  }, [formattedLendPools, getPrice])

  return {
    formattedLendPools,
    totalInfos,
    fetchLendPools,
    isFetching,
  }
}

import { useCallback, useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { useLendingManager } from '@/hooks/useSDK'
// import useSmartAccount from '@/hooks/useSmartAccount'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { useAccountStore, useLendStore } from '@/store'
import { div } from '@/utils/math/bigNumber'
import { stringToDecimals } from '@/utils/math/bn'

// export interface
type chainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[chainId]

export default function useLendingList() {
  const lendingMng = useLendingManager()
  const { lendPools, positions, isFetching, updateLendPools, updateIsFetching } =
    useLendStore()
  const { balances } = useAccountStore()

  const { chainId } = useWagmiCtx()

  const chainLendingConfig = useMemo(() => {
    return Object.values<(typeof LendingConfig)[chainId][LendPoolConfig]>(
      LendingConfig[chainId] || {},
    )
  }, [chainId])

  const fetchLendPools = useCallback(async () => {
    updateIsFetching(true)
    try {
      const res = await lendingMng.multicallPoolsStatus(
        chainLendingConfig.map((item) => item.reserveId),
      )
      console.log('multicallPoolsStatus :>> ', res)
      updateLendPools(res)
    } finally {
      updateIsFetching(false)
    }
  }, [chainLendingConfig, lendingMng, updateIsFetching, updateLendPools])

  const formattedLendPools = useMemo(() => {
    return lendPools.map((pool, index) => {
      const config = chainLendingConfig[index]
      const position = positions.find(
        (item) =>
          item.reserveId === config.reserveId && item.marketId === config.marketId,
      )
      return {
        ...config,
        ...pool,
        apr:
          stringToDecimals(pool.currentBorrowingRate.toString(), 18) *
          div(pool.totalDebts.toString(), pool.totalLiquidity.toString()).toNumber(),
        borrowApr: stringToDecimals(pool.currentBorrowingRate.toString(), 18),
        tokenSymbol: config.name,
        poolKey: config.name,
        totalSupply: stringToDecimals(pool.totalLiquidity.toString(), config.decimals),
        supplyCap: stringToDecimals(pool.config.supplyCap.toString(), 74),
        totalBorrowed: stringToDecimals(pool.totalDebts.toString(), config.decimals),
        borrowCap: stringToDecimals(pool.config.borrowCap.toString(), 74),
        availableLiquidity: stringToDecimals(
          pool.availableLiquidity.toString(),
          config.decimals,
        ),
        utilization: div(
          pool.totalDebts.toString(),
          pool.totalLiquidity.toString(),
        ).toNumber(),
        balance: stringToDecimals(balances[index * 3]?.toString(), config.decimals),
        deposited: position
          ? stringToDecimals(position.liquidity?.toString(), config.decimals)
          : 0,
        borrowed: position
          ? stringToDecimals(position.debt?.toString(), config.decimals)
          : 0,
        depositedBal: stringToDecimals(
          balances[index * 3 + 1]?.toString(),
          config.decimals,
        ),
        borrowedBal: stringToDecimals(
          balances[index * 3 + 2]?.toString(),
          config.decimals,
        ),
      }
    })
  }, [balances, positions, chainLendingConfig, lendPools])

  return {
    formattedLendPools,
    fetchLendPools,
    isFetching,
  }
}

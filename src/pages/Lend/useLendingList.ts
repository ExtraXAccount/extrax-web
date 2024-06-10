import { useCallback, useEffect, useMemo, useState } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { stringToDecimals } from '@/utils/math/bn'

// export interface
type chainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[chainId]

export default function useLendingList() {
  const lendingMng = useLendingManager()
  const accountMng = useAccountManager()
  const [lendPools, setLendPools] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const [balances, setBalances] = useState([] as bigint[])
  const { chainId } = useWagmiCtx()
  const {
    smartAccount,
    // accounts,
  } = useSmartAccount()

  const chainLendingConfig = useMemo(() => {
    return Object.values<(typeof LendingConfig)[chainId][LendPoolConfig]>(LendingConfig[chainId] || {})
  }, [chainId])

  const fetchLendPools = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await lendingMng.multicallPoolsStatus(chainLendingConfig.map((item) => item.reserveId))
      setLendPools(res)
    } finally {
      setIsFetching(false)
    }
  }, [chainLendingConfig, lendingMng])

  const fetchBalances = useCallback(
    async (safeAccounts: Address[]) => {
      if (!safeAccounts?.[0]) {
        return []
      }
      const tokens = chainLendingConfig.reduce(
        (arr, item) => arr.concat([item.underlyingTokenAddress, item.eToken, item.debtToken]),
        [],
      )
      console.log('fetchBalances :>> ', tokens)
      const [...res] = await accountMng.getBalances(safeAccounts, tokens)
      // return balances
      setBalances(res)
    },
    [chainLendingConfig, accountMng],
  )

  useEffect(() => {
    fetchLendPools()
  }, [fetchLendPools])

  useEffect(() => {
    fetchBalances([smartAccount])
  }, [smartAccount, fetchBalances])

  const formattedLendPools = useMemo(() => {
    return lendPools.map((pool, index) => {
      const config = chainLendingConfig[index]
      return {
        ...config,
        ...pool,
        apr: stringToDecimals(pool.currentBorrowRate.toString(), 18),
        borrowApr: stringToDecimals(pool.currentBorrowRate.toString(), 18),
        tokenSymbol: config.name,
        poolKey: config.name,
        totalSupply: stringToDecimals(pool.availableLiquidity.toString(), config.decimals),
        balance: stringToDecimals(balances[index * 3]?.toString(), config.decimals),
        deposited: stringToDecimals(balances[index * 3 + 1]?.toString(), config.decimals),
        borrowed: stringToDecimals(balances[index * 3 + 2]?.toString(), config.decimals),
      }
    })
  }, [balances, lendPools])

  return {
    formattedLendPools,
    fetchLendPools,
    isFetching,
  }
}

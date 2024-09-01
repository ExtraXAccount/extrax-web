import {
  FormatReserveUSDResponse,
  formatUserSummary,
  FormatUserSummaryResponse,
} from '@aave/math-utils'
import { sumBy } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
import { chainIdToName, SupportedChainId } from '@/constants/chains'
import { useAccountManager } from '@/hooks/useSDK'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { strToDecimals } from '@/sdk/utils/token'
import { getAccounts } from '@/sdk-ethers'
import { getLendingUserState } from '@/sdk-ethers/extra-x-lending/state'
import { useAccountStore, useLendStore } from '@/store'
import { IBalanceMap } from '@/store/account'
import { bi2decimalStr } from '@/utils/bigInt'
import { div, minus, mul, plus } from '@/utils/math/bigNumber'

import { useCurrentTimestamp } from './useCurrentTimestamp'

type ChainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[ChainId]

export default function useSmartAccount() {
  const { chainId, signer, account } = useWagmiCtx()
  const {
    accounts,
    currentAccount: _currentAccount,
    positions: userReserves,
    updateAccounts,
    updateBalances,
    updatePositions,
    healthStatus,
    updateHealthStatus,
  } = useAccountStore()
  const { reservesData } = useLendStore()
  const currentAccount = _currentAccount || account || ''

  const currentTimestamp = useCurrentTimestamp(10)

  const formattedUserPosition = useMemo(() => {
    if (!reservesData.formattedReserves.length) {
      return
    }
    const formatted = formatUserSummary({
      currentTimestamp,
      formattedReserves: reservesData.formattedReserves,
      marketReferenceCurrencyDecimals:
        reservesData.baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd: reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      userReserves,
      userEmodeCategoryId: 0,
    })
    // console.log('formattedUserPosition :>> ', formatted)
    return formatted
  }, [
    currentTimestamp,
    reservesData.baseCurrencyData.marketReferenceCurrencyDecimals,
    reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reservesData.formattedReserves,
    userReserves,
  ])

  const { depositedVal, debtVal, leverage, netWorth } = useMemo(() => {
    const depositedVal = Number(formattedUserPosition?.totalLiquidityUSD)
    const debtVal = Number(formattedUserPosition?.totalBorrowsUSD)
    const netWorth = Number(formattedUserPosition?.netWorthUSD)
    const leverage = !netWorth ? 0 : div(depositedVal, netWorth).toString()
    return {
      depositedVal,
      debtVal,
      leverage: Number(leverage) || 0,
      netWorth,
    }
  }, [formattedUserPosition])

  const { accountApr, accountApy } = useMemo(() => {
    // console.log('accountApr formattedLendPools :>> ', depositedVal, formattedLendPools)
    if (!depositedVal) {
      return {
        accountApr: 0,
        accountApy: 0,
      }
    }

    const totalApr =
      sumBy(formattedUserPosition?.userReservesData, (item) =>
        mul(item.reserve.supplyAPR, item.underlyingBalanceUSD)
          .minus(mul(item.reserve.variableBorrowAPR, item.totalBorrowsUSD))
          .toNumber()
      ) / depositedVal

    const totalApy =
      sumBy(formattedUserPosition?.userReservesData, (item) =>
        mul(item.reserve.supplyAPY, item.underlyingBalanceUSD)
          .minus(mul(item.reserve.variableBorrowAPY, item.totalBorrowsUSD))
          .toNumber()
      ) / depositedVal

    return {
      accountApr: totalApr,
      accountApy: totalApy,
    }
  }, [depositedVal, formattedUserPosition?.userReservesData])

  const accountMng = useAccountManager()

  // const chainLendingConfig = useMemo(() => {
  //   return Object.values<(typeof LendingConfig)[ChainId][LendPoolConfig]>(
  //     LendingConfig[chainId] || {}
  //   )
  // }, [chainId])

  const fetchBalances = useCallback(
    async (acc) => {
      if (!acc) {
        return []
      }
      const tokens = reservesData.formattedReserves.map(item => item.underlyingAsset) as Address[]
      console.log('fetchBalances :>> ', { acc, tokens })
      const res = await accountMng.getBalances([acc], tokens)
      const balances: IBalanceMap = {}
      tokens.forEach((token, index) => {
        balances[token] = strToDecimals(res[index].toString(), reservesData.formattedReserves[index].decimals)
      })
      updateBalances(balances)
    },
    [reservesData.formattedReserves, accountMng, updateBalances]
  )
  // const fetchUserHealthStatus = useCallback(
  //   async (acc) => {
  //     const healthStatus = await lendingMng.getUserHealthStatus(acc)
  //     updateHealthStatus(healthStatus)
  //   },
  //   [lendingMng, updateHealthStatus],
  // )

  const fetchUserReserves = useCallback(
    async (acc: string | undefined, chainId: SupportedChainId) => {
      if (!acc) {
        return
      }
      const userReserves = await getLendingUserState(chainId, acc)
      // console.log('fetchUserReserves :>> ', acc, userReserves)
      updatePositions(userReserves)
    },
    [updatePositions]
  )

  const fetchAccounts = useCallback(async () => {
    if (!signer || !account) {
      return
    }
    console.log('getAccounts start:>> ', account)
    const accounts = await getAccounts(chainIdToName[chainId], signer, account)
    console.log('getAccounts :>> ', account, accounts)
    updateAccounts(accounts as Address[])
  }, [account, chainId, signer, updateAccounts])

  const getInitData = useCallback(async () => {
    fetchAccounts()
  }, [fetchAccounts])

  useEffect(() => {
    fetchUserReserves(currentAccount || account, chainId)
  }, [account, chainId, currentAccount, fetchUserReserves])

  const updateAfterAction = useCallback(
    async (account = currentAccount) => {
      fetchBalances(account)
      fetchUserReserves(account, chainId)
    },
    [chainId, currentAccount, fetchBalances, fetchUserReserves]
  )

  const LTV = useMemo(() => {
    if (!depositedVal) {
      return {
        current: 0,
        max: 0,
        liquidation: 0,
      }
    }
    return {
      current: debtVal / depositedVal,
      max: Number(healthStatus.formatted?.ltv) / depositedVal,
      liquidation: Number(healthStatus.formatted?.liquidationThreshold) / depositedVal,
    }
  }, [
    debtVal,
    depositedVal,
    healthStatus.formatted?.liquidationThreshold,
    healthStatus.formatted?.ltv,
  ])

  return {
    accounts,
    currentAccount,
    isSmartAccount: _currentAccount !== undefined,
    formattedUserPosition,
    healthStatus,
    leverage,
    depositedVal,
    debtVal,
    netWorth,
    healthFactor: Number(formattedUserPosition?.healthFactor) || 0,
    liquidationThreshold: Number(healthStatus.formatted?.liquidationThreshold) || 0,
    LTV,
    maxCredit: healthStatus.formatted?.ltv,
    availableCredit: formattedUserPosition?.availableBorrowsUSD || 0,
    usedCredit: debtVal,
    accountApr,
    accountApy,

    getInitData,
    fetchBalances,
    updateAfterAction,
    fetchAccounts,
  }
}

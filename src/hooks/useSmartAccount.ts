import { formatUserSummary } from '@aave/math-utils'
import { sumBy } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
import { chainIdToName, SupportedChainId } from '@/constants/chains'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { getAccounts } from '@/sdk-ethers'
import { getLendingUserState } from '@/sdk-ethers/extra-x-lending/state'
import { useAccountStore, useLendStore } from '@/store'
import { bi2decimalStr } from '@/utils/bigInt'
import { div, minus, mul, plus } from '@/utils/math/bigNumber'

import { useCurrentTimestamp } from './useCurrentTimestamp'

type ChainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[ChainId]

export default function useSmartAccount() {
  const { prices, getPrice } = usePrices()

  const { chainId, signer, account } = useWagmiCtx()
  const {
    accounts,
    currentAccount: _currentAccount,
    updateCurrentAccount,
    positions: userReserves,
    // accountInfo,
    updateAccounts,
    updateAccountInfo,
    updateBalances,
    updatePositions,
    updateSupportedAssets,
    updateSupportedDebts,
    healthStatus,
    updateHealthStatus,
  } = useAccountStore()
  const { reservesData } = useLendStore()
  const currentAccount = _currentAccount || account || ''

  // const { updatePositions } = useLendStore()
  // const { formattedLendPools } = useLendingList()
  // console.log('accountInfo :>> ', accountInfo);

  const currentTimestamp = useCurrentTimestamp(600)

  const formattedUserPosition = useMemo(() => {
    if (!reservesData.formattedReserves.length) {
      return
    }
    const formatted = formatUserSummary({
      currentTimestamp,
      formattedReserves: reservesData.formattedReserves,
      marketReferenceCurrencyDecimals: reservesData.baseCurrencyData.marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd: reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
      userReserves,
      userEmodeCategoryId: 0,
    })
    return formatted
  }, [
    currentTimestamp,
    reservesData.baseCurrencyData.marketReferenceCurrencyDecimals,
    reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
    reservesData.formattedReserves,
    userReserves,
  ])

  // useEffect(() => {
  //   console.log('formattedUserPosition :>> ', formattedUserPosition)
  // }, [formattedUserPosition])

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

  const chainLendingConfig = useMemo(() => {
    return Object.values<(typeof LendingConfig)[ChainId][LendPoolConfig]>(LendingConfig[chainId] || {})
  }, [chainId])

  const getAccountInfo = useCallback(
    async (acc) => {
      console.log('getAccountInfo :>> ', acc)
      if (!acc) {
        return
      }
      const { account, collateral, collateralDeciamls, debt, debtDecimals } =
        await accountMng.getCollateralAndDebtValue(acc)

      updateAccountInfo({
        account,
        collateral,
        collateralDeciamls,
        debt,
        debtDecimals,
        depositedVal: Number((collateral > 0n ? collateral / BigInt(10 ** collateralDeciamls) : 0n).toString()),
        debtVal: Number((debt > 0n ? debt / BigInt(10 ** debtDecimals) : 0n).toString()),
      })
    },
    [accountMng, updateAccountInfo]
  )

  const fetchBalances = useCallback(
    async (acc) => {
      if (!acc) {
        return []
      }
      const tokens = chainLendingConfig.reduce(
        (arr: any, item) => arr.concat([item.underlyingTokenAddress, item.eToken, item.debtToken]),
        []
      )
      // console.log('fetchBalances :>> ', { acc, tokens })
      const [...res] = await accountMng.getBalances([acc], tokens)
      updateBalances(res)
    },
    [chainLendingConfig, accountMng, updateBalances]
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
      console.log('fetchUserReserves :>> ', acc, userReserves)
      updatePositions(userReserves)
    },
    [updatePositions]
  )

  const fetchAccounts = useCallback(async () => {
    if (!signer || !account) {
      return
    }
    const accounts = await getAccounts(chainIdToName[chainId], signer, account)
    console.log('getAccounts :>> ', accounts)
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
      // getAccountInfo(account)
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
  }, [debtVal, depositedVal, healthStatus.formatted?.liquidationThreshold, healthStatus.formatted?.ltv])

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
    availableCredit: minus(healthStatus.formatted?.ltv, healthStatus.formatted?.debtValueUsd).toString(),
    usedCredit: debtVal,
    accountApr,
    accountApy,

    getInitData,
    updateAfterAction,
    getAccountInfo,
    fetchAccounts,
  }
}

import {
  // FormatReserveUSDResponse,
  formatUserSummary,
  // FormatUserSummaryResponse,
} from '@aave/math-utils'
import { sumBy } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
import { chainIdToName, SupportedChainId } from '@/constants/chains'
import { useAccountManager } from '@/hooks/useSDK'
import { strToDecimals } from '@/sdk/utils/token'
import { getAccounts } from '@/sdk-ethers'
import { getLendingUsersState, getLendingUserState } from '@/sdk-ethers/extra-x-lending/state'
import { useAccountStore, useLendStore } from '@/store'
import { IBalanceMap } from '@/store/account'
import { div, mul, plus } from '@/utils/math/bigNumber'

import { useCurrentTimestamp } from './useCurrentTimestamp'

export function useCurrentAccount() {
  const { account } = useWagmiCtx()
  const {
    currentAccount: _currentAccount,
    positionsMap,
  } = useAccountStore()

  const currentAccount = _currentAccount || account || ''
  return {
    currentAccount,
    currentPositions: positionsMap[currentAccount] || {}
  }
}

export default function useSmartAccount() {
  const { chainId, signer, account } = useWagmiCtx()
  const {
    accounts,
    positionsMap,
    updateAccounts,
    updateBalances,
    // updatePositions,
    updateTargetPositions,
    updatePositionsMap,
  } = useAccountStore()
  const { reservesData } = useLendStore()

  const {
    currentAccount,
    currentPositions: {
      userReserves = [],
      userEmodeCategoryId,
    }
  } = useCurrentAccount()

  const currentTimestamp = useCurrentTimestamp(60)

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
      userEmodeCategoryId,
    })
    // console.log('formattedUserPosition :>> ', formatted)
    return formatted
  }, [currentTimestamp, reservesData.baseCurrencyData.marketReferenceCurrencyDecimals, reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd, reservesData.formattedReserves, userEmodeCategoryId, userReserves])

  const formattedUserPositionMap = useMemo(() => {
    if (!account || !reservesData.formattedReserves.length) {
      return
    }
    return [account, ...accounts].map(item => {
      const targetPositions = positionsMap[item] || {}
      return {
        [item]: formatUserSummary({
          currentTimestamp,
          formattedReserves: reservesData.formattedReserves,
          marketReferenceCurrencyDecimals:
            reservesData.baseCurrencyData.marketReferenceCurrencyDecimals,
          marketReferencePriceInUsd: reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
          userReserves: targetPositions.userReserves,
          userEmodeCategoryId: targetPositions.userEmodeCategoryId,
        })
      }
    })
  }, [account, accounts, currentTimestamp, positionsMap, reservesData.baseCurrencyData.marketReferenceCurrencyDecimals, reservesData.baseCurrencyData.marketReferenceCurrencyPriceInUsd, reservesData.formattedReserves])

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

  const fetchUsersReserves = useCallback(
    async (users: string[], chainId: SupportedChainId) => {
      if (!users.length) {
        return
      }
      const res = await getLendingUsersState(chainId, users)
      console.log('updatePositionsMap :>> ', res)
      updatePositionsMap(res)
    },
    [updatePositionsMap]
  )
  
  const fetchUserReserves = useCallback(
    async (acc: string | undefined, chainId: SupportedChainId) => {
      if (!acc) {
        return
      }
      const {userReserves, userEmodeCategoryId} = await getLendingUserState(chainId, acc)
      // console.log('fetchUserReserves :>> ', {acc, userReserves, userEmodeCategoryId})
      updateTargetPositions(acc, {
        userReserves, userEmodeCategoryId
      })
    },
    [updateTargetPositions]
  )

  const fetchAccounts = useCallback(async () => {
    if (!signer || !account) {
      return
    }
    // console.log('getAccounts start:>> ', account)
    const accounts = await getAccounts(chainIdToName[chainId], signer, account)
    // console.log('getAccounts :>> ', account, accounts)
    updateAccounts(accounts as Address[])
    fetchUsersReserves([account, ...accounts], chainId)
  }, [account, chainId, fetchUsersReserves, signer, updateAccounts])

  const getInitData = useCallback(async () => {
    fetchAccounts()
  }, [fetchAccounts])

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
      current: Number(formattedUserPosition?.currentLoanToValue) || 0,
      max: plus(formattedUserPosition?.currentLoanToValue || 0, formattedUserPosition?.currentLiquidationThreshold || 0).toNumber() / 2,
      liquidation: Number(formattedUserPosition?.currentLiquidationThreshold) || 0,
    }
  }, [depositedVal, formattedUserPosition?.currentLiquidationThreshold, formattedUserPosition?.currentLoanToValue])

  return {
    accounts,
    currentAccount,
    isSmartAccount: currentAccount && currentAccount!== account,
    formattedUserPosition,
    formattedUserPositionMap,
    eModeEnabled: formattedUserPosition?.userEmodeCategoryId !== 0,
    leverage,
    depositedVal,
    debtVal,
    netWorth,
    healthFactor: Number(formattedUserPosition?.healthFactor) || 0,
    LTV,
    maxCredit: plus(formattedUserPosition?.availableBorrowsUSD || 0, formattedUserPosition?.totalBorrowsUSD || 0).toNumber(),
    availableCredit: formattedUserPosition?.availableBorrowsUSD || 0,
    usedCredit: debtVal,
    accountApr,
    accountApy,

    getInitData,
    fetchBalances,
    updateAfterAction,
    fetchAccounts,
    fetchUserReserves,
    fetchUsersReserves,
  }
}

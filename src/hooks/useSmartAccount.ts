import { sumBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

// import { useWagmiCtx } from '@/components/WagmiContext'
// import { useWagmiCtx } from '@/components/WagmiContext'
import useCredit from '@/hooks/useCredit'
// import useDebt from '@/hooks/useDebt'
// import useDeposited from '@/hooks/useDeposited'
import usePrices from '@/hooks/usePrices'
import { useAccountManager } from '@/hooks/useSDK'
import { useAppSelector } from '@/state'
import { useAccountStore } from '@/store'
import { aprToApy } from '@/utils/math'

export const INFINITY = '∞'

export interface AccountInfo {
  account: `0x${string}`
  balances: any
  collateral: bigint
  collateralDeciamls: number
  debt: bigint
  debtDecimals: number
  depositedVal: number
  debtVal: number
}

export default function useSmartAccount() {
  const { prices } = usePrices()
  const { maxCredit, availableCredit, usedCredit } = useCredit()
  const lendingList = useAppSelector((state) => state.lending.poolStatus)
  // const { account = '', smartAccount } = useWagmiCtx()
  const positions = useAppSelector((state) => state.position.userPositions)

  // const { chainId } = useWagmiCtx()
  const {
    accounts,
    accountInfo,
    updateAccountInfo,
    updateAccounts,
    updateSupportedAssets,
    updateSupportedDebts,
  } = useAccountStore()

  // console.log('accountInfo :>> ', accountInfo);

  const accountMng = useAccountManager()

  const getAccountInfo = useCallback(async () => {
    if (!accounts[0]) {
      return
    }
    const { account, collateral, collateralDeciamls, debt, debtDecimals } =
      await accountMng.getCollateralAndDebtValue(accounts[0])

    updateAccountInfo({
      balances: [],
      account,
      collateral,
      collateralDeciamls,
      debt,
      debtDecimals,
      depositedVal: Number(
        (collateral > 0n ? collateral / BigInt(10 ** collateralDeciamls) : 0n).toString(),
      ),
      debtVal: Number((debt > 0n ? debt / BigInt(10 ** debtDecimals) : 0n).toString()),
    })
  }, [accounts, accountMng])

  const getInitData = useCallback(async () => {
    accountMng.getAccounts().then((accounts) => {
      updateAccounts(accounts)
    })

    accountMng.getSupportedAssets().then((res) => {
      updateSupportedAssets(res)
    })

    accountMng.getSupportedDebts().then((res) => {
      updateSupportedDebts(res)
    })
  }, [accountMng])

  const depositedVal = accountInfo?.depositedVal || 0
  const debtVal = accountInfo?.debtVal || 0

  const safetyRatio = useMemo(() => {
    if (!depositedVal) {
      return 0
    }
    // return toPrecision((depositedVal / (depositedVal + debtVal)) * 100) + '%'
    return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const accountAPY = useMemo(() => {
    const totalApy =
      (sumBy(
        lendingList,
        (item: any) =>
          (item.SavingsDAI || 0) * 0.05 +
          aprToApy(item.apr) * item.deposited * prices[item.tokenSymbol] -
          item.borrowingRate * item.borrowed * prices[item.tokenSymbol],
      ) +
        sumBy(positions, (item: any) => item.apr * item.totalPositionValue)) /
      depositedVal

    return totalApy
  }, [depositedVal, lendingList, positions, prices])

  return {
    accounts,
    // smartAccount: depositedVal ? smartAccount : '',
    smartAccount: accounts[0],
    depositedVal,
    getInitData,
    getAccountInfo,
    // depositedAssets,
    debtVal,
    // debtAssets,
    maxCredit,
    availableCredit,
    usedCredit,
    safetyRatio,
    accountAPY,
    // supportedAssets,
    // supportedDebts,
    lendingList,
  }
}

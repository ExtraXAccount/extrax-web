import { sumBy } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

// import { useWagmiCtx } from '@/components/WagmiContext'
import useCredit from '@/hooks/useCredit'
// import useDebt from '@/hooks/useDebt'
// import useDeposited from '@/hooks/useDeposited'
import usePrices from '@/hooks/usePrices'
import { useAppSelector } from '@/state'
import { addComma, aprToApy, toPrecision } from '@/utils/math'
import { useAccountManager } from '@/hooks/useSDK'

export const INFINITY = '∞'

export interface AccountInfo {
  account: `0x${string}`;
  collateral: bigint;
  collateralDeciamls: number;
  debt: bigint;
  debtDecimals: number;
  depositedVal: number
  debtVal: number
}

export default function useSmartAccount() {
  const { prices } = usePrices()
  // const { depositedVal, depositedAssets } = useDeposited()
  // const { debtVal, debtAssets } = useDebt()
  const { maxCredit, availableCredit, usedCredit } = useCredit()
  const lendingList = useAppSelector((state) => state.lending.poolStatus)
  // const { account = '', smartAccount } = useWagmiCtx()
  const positions = useAppSelector((state) => state.position.userPositions)

  const [accountInfo, setAccountInfo] = useState({} as AccountInfo);
  const [accounts, setAccounts] = useState([]);
  const [supportedAssets, setSupportedAssets] = useState([]);
  const [supportedDebts, setSupportedDebts] = useState([]);

  // const {getAccount, getCollateralAndDebtValue} = useAccountContract()
  const accountMng = useAccountManager()

  const getAccountInfo = useCallback(async () => {
    if (!accounts[0]) {
      return
    }
    const {account, collateral, collateralDeciamls, debt, debtDecimals} = await accountMng.getCollateralAndDebtValue(accounts[0])

    setAccountInfo({
      account,
      collateral, collateralDeciamls, debt, debtDecimals,
      depositedVal: Number((collateral > 0n ? collateral / BigInt(10 ** collateralDeciamls) : 0n).toString()),
      debtVal: Number((debt > 0n ? debt / BigInt(10 ** debtDecimals) : 0n).toString()),
    })
  }, [accounts, accountMng])

  const depositedVal = accountInfo.depositedVal
  // console.log('accountInfo :>> ', accountInfo);
  const debtVal = accountInfo.debtVal

  useEffect(() => {
    accountMng.getAccounts()
    .then(res => {
      setAccounts(res)
    })

    accountMng.getSupportedAssets()
    .then(res => {
      setSupportedAssets(res)
    })

    accountMng.getSupportedDebts()
    .then(res => {
      setSupportedDebts(res)
    })
  }, [accountMng])

  useEffect(() => {
    getAccountInfo()
  }, [getAccountInfo])

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
        (item) =>
          (item.SavingsDAI || 0) * 0.05 +
          aprToApy(item.apr) * item.deposited * prices[item.tokenSymbol] -
          item.borrowingRate * item.borrowed * prices[item.tokenSymbol]
      ) +
        sumBy(positions, (item) => item.apr * item.totalPositionValue)) /
      depositedVal

    return totalApy
  }, [depositedVal, lendingList, positions, prices])

  return {
    accounts,
    // smartAccount: depositedVal ? smartAccount : '',
    smartAccount: accounts[0],
    depositedVal,
    // depositedAssets,
    debtVal,
    // debtAssets,
    maxCredit,
    availableCredit,
    usedCredit,
    safetyRatio,
    accountAPY,
    supportedAssets,
    supportedDebts,
    lendingList,
  }
}

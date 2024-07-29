import usePrices from "@/hooks/usePrices";
import useSmartAccount from "@/hooks/useSmartAccount";
import useLendingList from "@/pages/Lend/useLendingList";
import { aprToApy } from "@/utils/math";
import { sumBy } from "lodash";
import { useMemo } from "react";

export default function useInfoChange(props: {
  reserveId: bigint | undefined
  amount: number
  type: 'liquidity' | 'debt',
  price: number
}) {
  const {
    healthStatus,
    accountEquity,
    healthFactorPercent,
    currentAccount,
    depositedVal,
    // depositedAssets,
    // debtVal,
    // debtAssets,
    maxCredit,
    availableCredit,
    usedCredit,
    // safetyRatio,
    accountApy,
    accounts,
    // getInitData,
  } = useSmartAccount()
  const { formattedLendPools } = useLendingList()
  const { prices, getPrice } = usePrices()

  console.log(formattedLendPools, props)

  const pre = {
    borrowingPower: Number(usedCredit),
    accountApy,
    netWorth: Number(accountEquity),
    healthFactorPercent,
  }

  const value = props.amount * props.price

  const nextTotalApy = useMemo(() => {
    const depositedVal = Number(healthStatus?.formatted?.collateralValueUsd) || 0
    const nextApy =
    sumBy(
      formattedLendPools,
      (item) => {
        if (props.reserveId === item.reserveId) {
          const depositAmount = props.type === 'liquidity' ? item.formatted.deposited + props.amount : item.formatted.deposited
          const borrowedAmount = props.type === 'debt' ? item.formatted.borrowed + props.amount : item.formatted.borrowed
            return item.formatted.apy * depositAmount * getPrice(item.tokenSymbol) -
          item.formatted.borrowApy *
          borrowedAmount *
            getPrice(item.tokenSymbol) || 0
        } else {
          return item.formatted.apy * item.formatted.deposited * getPrice(item.tokenSymbol) -
          item.formatted.borrowApy *
            item.formatted.borrowed *
            getPrice(item.tokenSymbol) || 0
        }
      },
    ) / depositedVal
    return nextApy
  }, [healthStatus?.formatted, props])

  const nextDebtValueUsd = props.type === 'debt' ? healthStatus?.formatted?.debtValueUsd + value : healthStatus?.formatted?.debtValueUsd
  const nextPositionValue = props.type === 'liquidity' ? healthStatus?.formatted?.collateralValueUsd + value : healthStatus?.formatted?.collateralValueUsd

  const next = {
    borrowingPower: props.type === 'debt' ? Number(usedCredit) + value : Number(usedCredit),
    accountApy: nextTotalApy,
    netWorth: props.type === 'debt' ? Number(accountEquity) - value : Number(accountEquity) + value,
    healthFactorPercent: Number(nextDebtValueUsd) / Number(nextPositionValue)
  }
  return {
    pre,
    next
  }
}
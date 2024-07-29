import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import usePrices from '@/hooks/usePrices'
import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { IFormattedPosition } from '@/store/lend'
import { nameChecker } from '@/utils'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'

import DialogAccountInfo from './DialogComponents/DialogAccountInfo'
import DialogApyDisplay from './DialogComponents/DialogAPYDisplay'
import useLendingList from './useLendingList'

export default function WithdrawDialog({
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  open: boolean
  onClose: any
  currentLendingPoolDetail?: IFormattedPosition
}) {
  const {
    healthFactor,
    liquidationThreshold,
    usedCredit,
    netWorth,
    debtVal,
    accountApy,
    currentAccount,
    updateAfterAction,
  } = useSmartAccount()
  const lendMng = useLendingManager()
  const { fetchLendPools } = useLendingList()

  const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const tokenPrice = useMemo(() => {
    if (!currentLendingPoolDetail?.tokenSymbol) {
      return 0
    }
    return getPrice(currentLendingPoolDetail?.tokenSymbol) || 0
  }, [getPrice, currentLendingPoolDetail?.tokenSymbol])

  const tokenValueChange = useMemo(() => {
    return Number(value) * tokenPrice || 0
  }, [tokenPrice, value])

  const updatedHealthFactor = useMemo(() => {
    const reserveLiquidationThresholdConfig =
      (currentLendingPoolDetail?.config.liquidationThreshold || 0) / 10000
    const _liquidateThshold =
      liquidationThreshold - tokenValueChange * reserveLiquidationThresholdConfig
    const _borrowedValue = debtVal
    return _liquidateThshold / _borrowedValue
  }, [
    debtVal,
    currentLendingPoolDetail?.config.liquidationThreshold,
    liquidationThreshold,
    tokenValueChange,
  ])

  const updatedSummary = useMemo(() => {
    const tokenValueChange = Number(value) * tokenPrice || 0
    return {
      usedCredit: usedCredit,
      netWorth: netWorth - tokenValueChange,
      debtVal: debtVal,
      // TODO: APY UPDATED
      accountApy,
    }
  }, [accountApy, debtVal, netWorth, tokenPrice, usedCredit, value])

  function reset() {
    setValue('')
  }

  console.log('currentLendingPoolDetail :>> ', currentLendingPoolDetail)
  const withdraw = useCallback(async () => {
    console.log('withdraw :>> ', currentAccount, currentLendingPoolDetail)
    if (!currentLendingPoolDetail) {
      return
    }
    setLoading(true)
    try {
      const res = await lendMng.withdraw(
        currentAccount,
        currentLendingPoolDetail.marketId,
        currentLendingPoolDetail.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail.decimals),
      )
      console.log('withdraw res :>> ', res)
      updateAfterAction(currentAccount)
      fetchLendPools()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [
    currentAccount,
    currentLendingPoolDetail,
    lendMng,
    value,
    updateAfterAction,
    fetchLendPools,
    onClose,
  ])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.reserveId])

  if (!currentLendingPoolDetail) {
    return null
  }

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Withdraw ${nameChecker(currentLendingPoolDetail.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          maxText="Deposited"
          max={
            currentLendingPoolDetail.formatted.deposited -
            currentLendingPoolDetail.formatted.borrowed
          }
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail.tokenSymbol}
          decimals={currentLendingPoolDetail.decimals}
          value={value}
          price={getPrice(currentLendingPoolDetail.tokenSymbol)}
          onChange={(val) => setValue(val)}
        />
      </div>
      <DialogApyDisplay
        list={[
          {
            title: 'APY',
            content: `${remain2Decimal(
              aprToApy100(currentLendingPoolDetail.formatted.apr * 100),
            )}%`,
          },
          {
            title: 'Health Factor',
            content: !currentLendingPoolDetail ? '--' : toPrecision(updatedHealthFactor),
          },
        ]}
      />
      <div className="dialog-divider"></div>
      <DialogAccountInfo
        reserveId={currentLendingPoolDetail.reserveId}
        updatedSummary={updatedSummary}
      />
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={loading}
          disabled={!Number(value)}
          className={classNames('btn-base btn-base-primary btn-base-large flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={() => {
            withdraw()
          }}
        >
          {loading ? 'Withdrawing' : 'Withdraw'}
        </Button>
      </div>
    </Dialog>
  )
}

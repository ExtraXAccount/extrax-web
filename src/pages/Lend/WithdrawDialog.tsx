import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'

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
  const { currentAccount, updateAfterAction, healthFactorPercent, depositedVal } =
    useSmartAccount()
  const lendMng = useLendingManager()
  const { fetchLendPools } = useLendingList()

  const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

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
            title: 'Exchange Rate',
            content: !currentLendingPoolDetail
              ? '--'
              : currentLendingPoolDetail.formatted.exchangeRate,
          },
        ]}
      />
      <div className="dialog-divider"></div>
      <DialogAccountInfo reserveId={currentLendingPoolDetail.reserveId} />
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

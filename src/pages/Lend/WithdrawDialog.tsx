import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import usePrices from '@/hooks/usePrices'
import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
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
  currentLendingPoolDetail: any
}) {
  const { smartAccount, updateAfterAction, healthFactorPercent, depositedVal } =
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

  const withdraw = useCallback(async () => {
    console.log('withdraw :>> ', smartAccount, currentLendingPoolDetail)
    setLoading(true)
    try {
      const res = await lendMng.withdraw(
        smartAccount,
        currentLendingPoolDetail?.marketId,
        currentLendingPoolDetail?.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail?.decimals),
      )
      console.log('withdraw res :>> ', res)
      updateAfterAction(smartAccount)
      fetchLendPools()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [
    smartAccount,
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

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Withdraw ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          maxText="Deposited"
          max={currentLendingPoolDetail?.deposited - currentLendingPoolDetail?.borrowed}
          // ethBalance={ethBalance}
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail?.tokenSymbol}
          decimals={currentLendingPoolDetail?.tokenDecimals}
          value={value}
          price={getPrice(currentLendingPoolDetail?.tokenSymbol)}
          onChange={(val) => setValue(val)}
        />
      </div>
      <DialogApyDisplay
        list={[
          {
            title: 'APY',
            content: `${remain2Decimal(
              aprToApy100(currentLendingPoolDetail?.apr * 100),
            )}%`,
          },
          {
            title: 'Health Factor',
            content: !depositedVal ? '--' : toPrecision(healthFactorPercent, 2) + '%',
          },
        ]}
      />
      <div className="dialog-divider"></div>
      <DialogAccountInfo reserveId={currentLendingPoolDetail?.reserveId} />
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

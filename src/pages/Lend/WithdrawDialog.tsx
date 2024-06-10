import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import usePrices from '@/hooks/usePrices'
import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { nameChecker } from '@/utils'
import { toPrecision } from '@/utils/math'

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
  const { smartAccount } = useSmartAccount()
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
        currentLendingPoolDetail?.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail?.decimals),
      )
      console.log('withdraw res :>> ', res)
      fetchLendPools()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [value, currentLendingPoolDetail?.tokenDecimals, currentLendingPoolDetail?.reserveId, fetchLendPools, onClose])

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
          onChange={(val) => setValue(val)}
        />
      </div>
      <ul className="summary-list">
        <li>
          <p>Value:</p>
          <b className="text-highlight">
            ${toPrecision(Number(value) * getPrice(currentLendingPoolDetail?.tokenSymbol))}
          </b>
        </li>
        {/* <li>
          <p>Current APY:</p>
          <b className="text-highlight">{formatFloatNumber(aprToApy(currentLendingPoolDetail?.apr) * 100)}%</b>
        </li>
        <li>
          <p>Updated APY:</p>
          <b className="text-highlight">{formatFloatNumber(nextApy)}%</b>
        </li> */}
      </ul>
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={loading}
          disabled={!Number(value)}
          className={classNames('btn-base flex1', {
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

import { Button } from 'antd/es'
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

const maxBorrowedRatio = 0.8

export default function BorrowDialog({
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  open: boolean
  onClose: any
  currentLendingPoolDetail: any
}) {
  const { currentAccount, updateAfterAction } = useSmartAccount()
  const lendMng = useLendingManager()
  const { fetchLendPools } = useLendingList()

  const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  function reset() {
    setValue('')
  }
  const borrow = useCallback(async () => {
    console.log('borrow :>> ', currentAccount, currentLendingPoolDetail)
    setLoading(true)
    try {
      const res = await lendMng.borrow(
        currentAccount,
        currentLendingPoolDetail?.marketId,
        currentLendingPoolDetail?.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail?.decimals),
        // HealthManagerConfig[SupportedChainId.OPTIMISM].debts['USDC.e_DEBT'].debtId,
      )
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

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Borrow ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          maxText="Available"
          max={
            (currentLendingPoolDetail?.deposited - currentLendingPoolDetail?.borrowed) *
            maxBorrowedRatio
          }
          allowInputOverflow
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
      <ul className="summary-list">
        <li>
          <p>Value:</p>
          <b className="text-highlight">
            $
            {toPrecision(Number(value) * getPrice(currentLendingPoolDetail?.tokenSymbol))}
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
          className={classNames('btn-base btn-base-primary btn-base-large flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={() => {
            borrow()
          }}
        >
          {loading ? 'Borrowing' : 'Borrow'}
        </Button>
      </div>
    </Dialog>
  )
}

import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import useLendContract from '@/sdk/lend'
import { useAppDispatch, useAppSelector } from '@/state'
import { setLendingStatus } from '@/state/lending/reducer'
import { nameChecker } from '@/utils'
import { aprToApy, formatFloatNumber, formatNumberByUnit, toPrecision } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'
import { calculateNextBorrowingRate } from '@/utils/math/borrowInterest'

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
  const { prices, getPrice } = usePrices()
  const dispatch = useAppDispatch()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  // const [isApproving, setIsApproving] = useState(false)
  // const [isDepositing, setIsDepositing] = useState(false)
  // const lendManager = useLendManager()
  // const dispatch = useAppDispatch()
  const { lendList, depositAndStake, unStakeAndWithdraw, writeLoading } = useLendContract()

  const { balance } = useFetchBalance(currentLendingPoolDetail?.tokenAddress)
  const { balance: ethBalance } = useFetchEthBalance()

  const nextApy = useMemo(() => {
    if (currentLendingPoolDetail) {
      // console.log('currentLendingPoolDetail :>> ', currentLendingPoolDetail)
      const totalLiquidity = currentLendingPoolDetail.amount
      const { nextBorrowingRate, nextUtilizationRate } = calculateNextBorrowingRate({
        liquidityChangedValue: Number(value),
        poolKey: currentLendingPoolDetail.poolKey,
        totalLiquidity,
        utilizationRate: currentLendingPoolDetail.utilizationRate,
      })
      // console.log('calculateNextBorrowingRate :>> ', { nextBorrowingRate, nextUtilizationRate })
      return aprToApy(nextBorrowingRate * nextUtilizationRate) * 100
    }
    return 0
  }, [currentLendingPoolDetail, value])

  function reset() {
    setValue('')
  }
  const borrow = useCallback(async () => {
    const res = await unStakeAndWithdraw(
      currentLendingPoolDetail?.ReserveId,
      toBNString(value || 0, currentLendingPoolDetail?.tokenDecimals)
    )

    const newLendList = [...lendList]
    const targetIndex = newLendList.findIndex((item) => item.ReserveId === currentLendingPoolDetail?.ReserveId)
    const target = newLendList[targetIndex]
    newLendList.splice(targetIndex, 1, {
      ...target,
      borrowed: (target.borrowed || 0) + Number(value),
    })
    // console.log('newLendingData :>> ', targetIndex, newLendList)
    dispatch(setLendingStatus(newLendList))
    reset()
    onClose()

    return res
  }, [
    unStakeAndWithdraw,
    value,
    currentLendingPoolDetail?.tokenDecimals,
    currentLendingPoolDetail?.ReserveId,
    lendList,
    dispatch,
    onClose,
  ])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.ReserveId])

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Borrow ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          maxText="Available"
          max={(currentLendingPoolDetail?.deposited - currentLendingPoolDetail?.borrowed) * maxBorrowedRatio}
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
          loading={writeLoading}
          disabled={!Number(value)}
          className={classNames('btn-base flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={() => {
            borrow()
          }}
        >
          {writeLoading ? 'Borrowing' : 'Borrow'}
        </Button>
      </div>
    </Dialog>
  )
}

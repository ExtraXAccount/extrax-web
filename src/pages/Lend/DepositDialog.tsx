import { BigNumber as BN } from '@ethersproject/bignumber'
import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import useLendContract from '@/sdk/lend'
import { nameChecker } from '@/utils'
import { aprToApy, formatFloatNumber, formatNumberByUnit, toPrecision } from '@/utils/math'
import { toBNString, toDecimals } from '@/utils/math/bn'
import { calculateNextBorrowingRate } from '@/utils/math/borrowInterest'

export default function DepositDialog({
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  open: boolean
  onClose: any
  currentLendingPoolDetail: any
}) {
  const { prices, getPrice } = usePrices()
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
      const totalLiquidity = toDecimals(
        BN.from(currentLendingPoolDetail.totalLiquidity),
        currentLendingPoolDetail.tokenDecimals
      )
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

  const deposit = useCallback(async () => {
    const res = await depositAndStake(
      toBNString(value || 0, currentLendingPoolDetail?.tokenDecimals),
      currentLendingPoolDetail?.ReserveId
    )

    onClose()

    return res
  }, [value, onClose, depositAndStake, currentLendingPoolDetail?.tokenDecimals, currentLendingPoolDetail?.ReserveId])

  useEffect(() => {
    function reset() {
      setValue('')
    }
    reset()
  }, [currentLendingPoolDetail?.ReserveId])

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`DEPOSIT ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          maxText="Balance"
          max={balance}
          ethBalance={ethBalance}
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
        <li>
          <p>Current APY:</p>
          <b className="text-highlight">{formatFloatNumber(aprToApy(currentLendingPoolDetail.apr) * 100)}%</b>
        </li>
        <li>
          <p>Updated APY:</p>
          <b className="text-highlight">{formatFloatNumber(nextApy)}%</b>
        </li>
      </ul>
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={writeLoading}
          disabled={!Number(value)}
          className={classNames('btn-base flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={() => {
            deposit()
          }}
        >
          {writeLoading ? 'Depositing' : 'Deposit'}
        </Button>
      </div>
    </Dialog>
  )
}

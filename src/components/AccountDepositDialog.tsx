import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { 
  // type BaseError, 
  useSendTransaction, 
  // useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useDeposited from '@/hooks/useDeposited'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import useLendContract from '@/sdk/lend'
import { useAppDispatch, useAppSelector } from '@/state'
import { setLendingStatus } from '@/state/lending/reducer'
import { nameChecker } from '@/utils'
import { aprToApy, formatFloatNumber, formatNumberByUnit, toPrecision } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'
import { calculateNextBorrowingRate } from '@/utils/math/borrowInterest'
import useAccountContract from '@/sdk/account'

export default function AccountDepositDialog({
  accounts,
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  accounts: any
  open: boolean
  onClose: any
  currentLendingPoolDetail: any
}) {
  const { getPrice } = usePrices()
  const dispatch = useAppDispatch()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [creatingAccount, setCreatingAccount] = useState(false)
  // const [isApproving, setIsApproving] = useState(false)
  // const [isDepositing, setIsDepositing] = useState(false)
  // const lendManager = useLendManager()
  // const dispatch = useAppDispatch()
  const { lendList, depositAndStake, writeLoading } = useLendContract()
  const { depositedVal } = useDeposited()

  const { balance } = useFetchBalance(currentLendingPoolDetail?.tokenAddress)
  const { balance: ethBalance } = useFetchEthBalance()

  const { createAccount } = useAccountContract()

  // const { 
  //   data: hash,
  //   error, 
  //   // isPending, 
  //   sendTransaction
  // } = useSendTransaction() 


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

  const deposit = useCallback(async () => {
    console.log('deposit :>> ', accounts);
    if (!accounts.length) {
      setCreatingAccount(true)
      try {
        await createAccount()
        // await depositAndStake('2', '4839')
      } finally {
        setCreatingAccount(false)
      }
    }
    // const parsedValue = toBNString(value || 0, currentLendingPoolDetail?.tokenDecimals)
    // await sendTransaction({ to: accounts[0], value: parseEther(parsedValue) }) 
    return

    const params = [
      currentLendingPoolDetail?.ReserveId,
      toBNString(value || 0, currentLendingPoolDetail?.tokenDecimals),
    ]
    console.log('params :>> ', params)
    const res = await depositAndStake(
      currentLendingPoolDetail?.ReserveId,
      toBNString(value || 0, currentLendingPoolDetail?.tokenDecimals)
    )

    const newLendList = [...lendList]
    const targetIndex = newLendList.findIndex((item) => item.ReserveId === currentLendingPoolDetail?.ReserveId)
    const target = newLendList[targetIndex]
    newLendList.splice(targetIndex, 1, {
      ...target,
      deposited: target.deposited + Number(value),
    })
    // console.log('newLendingData :>> ', targetIndex, newLendList)
    dispatch(setLendingStatus(newLendList))
    reset()
    onClose()

    return res
  }, [
    depositAndStake,
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
      title={`Deposit ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
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
          <b className="text-highlight">{formatFloatNumber(aprToApy(currentLendingPoolDetail?.apr) * 100)}%</b>
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
          onClick={async () => {
            // if (!depositedVal) {
            //   setCreatingAccount(true)
            //   try {
            //     await depositAndStake('2', '4839')
            //   } finally {
            //     setCreatingAccount(false)
            //   }
            // }
            deposit()
          }}
        >
          {writeLoading ? (!creatingAccount ? 'Depositing' : 'Creating Smart Account') : 'Deposit'}
        </Button>
      </div>
    </Dialog>
  )
}

import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { nameChecker } from '@/utils'
import { aprToApy, formatFloatNumber, toPrecision } from '@/utils/math'
import { calculateNextBorrowingRate } from '@/utils/math/borrowInterest'

export default function AccountDepositDialog({
  accounts,
  open,
  currentLendingPoolDetail: currentLendingPool,
  onClose,
}: {
  accounts: any
  open: boolean
  onClose: any
  currentLendingPoolDetail?: any
}) {
  const { getAccountInfo } = useSmartAccount()
  const { getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  const { formattedLendPools, fetchLendPools } = useLendingList()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState({ writing: false, desc: '' })

  const accountMng = useAccountManager()
  const lendMng = useLendingManager()

  const currentLendingPoolDetail = useMemo(
    () => currentLendingPool || formattedLendPools[1],
    [currentLendingPool, formattedLendPools[0]],
  )

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

  const deposit = useCallback(async () => {
    console.log('depositToLending :>> ', accounts)
    let newAccounts = [...accounts]
    try {
      if (!accounts.length) {
        setLoading({ writing: true, desc: 'Creating smart account' })
        newAccounts = await accountMng.createAccount()
      }
      setLoading({ writing: true, desc: 'Depositing assets' })
      await lendMng.depositToLending(
        newAccounts[0],
        currentLendingPoolDetail?.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail?.decimals),
      )

      getAccountInfo(accounts[0])
      fetchLendPools()
      onClose()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [
    getAccountInfo,
    fetchLendPools,
    accounts,
    accountMng,
    lendMng,
    value,
    currentLendingPoolDetail?.decimals,
    currentLendingPoolDetail?.reserveId,
    onClose,
  ])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.reserveId])

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
            $
            {toPrecision(Number(value) * getPrice(currentLendingPoolDetail?.tokenSymbol))}
          </b>
        </li>
        <li>
          <p>Current APY:</p>
          <b className="text-highlight">
            {formatFloatNumber(aprToApy(currentLendingPoolDetail?.apr) * 100)}%
          </b>
        </li>
        <li>
          <p>Updated APY:</p>
          <b className="text-highlight">{formatFloatNumber(nextApy)}%</b>
        </li>
      </ul>
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={loading.writing}
          disabled={!Number(value)}
          className={classNames('btn-base flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={deposit}
        >
          {loading.writing ? loading.desc : 'Deposit'}
        </Button>
      </div>
    </Dialog>
  )
}

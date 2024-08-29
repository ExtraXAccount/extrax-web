import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { toDecimals } from '@/sdk/utils/token'
import { createAccount, deposit, depositWithAccount, depositWithWallet } from '@/sdk-ethers'
import { nameChecker } from '@/utils'
import { aprToApy, formatFloatNumber, toPrecision } from '@/utils/math'
import { mul } from '@/utils/math/bigNumber'
import { toBNString } from '@/utils/math/bn'
import { calculateNextBorrowingRate } from '@/utils/math/borrowInterest'

import FormattedNumber from './FormattedNumber'
import { useWagmiCtx } from './WagmiContext'

export default function AccountDepositDialog({
  accounts,
  open,
  onClose,
}: {
  accounts: any
  open: boolean
  onClose: any
  currentLendingPoolDetail?: any
}) {
  const { walletClient, signer, chainId } = useWagmiCtx()
  const { updateAfterAction, currentAccount, isSmartAccount } = useSmartAccount()
  const [useNativeETH, setUseNativeETH] = useState(true)
  const { formattedLendPools, fetchPoolState } = useLendingList()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState({ writing: false, desc: '' })

  const currentLendingPoolDetail = useMemo(() => formattedLendPools[0], [formattedLendPools])

  const { balance } = useFetchBalance(currentLendingPoolDetail?.underlyingAsset)
  const { balance: ethBalance } = useFetchEthBalance()

  const nextApy = useMemo(() => {
    if (currentLendingPoolDetail) {
      // console.log('currentLendingPoolDetail :>> ', currentLendingPoolDetail)
      const totalLiquidity = Number(currentLendingPoolDetail.totalLiquidity)
      const { nextBorrowingRate, nextUtilizationRate } = calculateNextBorrowingRate({
        liquidityChangedValue: Number(value),
        poolKey: currentLendingPoolDetail.symbol,
        totalLiquidity,
        utilizationRate: Number(currentLendingPoolDetail.supplyUsageRatio),
      })
      // console.log('calculateNextBorrowingRate :>> ', { nextBorrowingRate, nextUtilizationRate })
      return aprToApy(nextBorrowingRate * nextUtilizationRate)
    }
    return 0
  }, [currentLendingPoolDetail, value])

  function reset() {
    setValue('')
  }

  const handleDeposit = useCallback(async () => {
    console.log('depositToLending :>> ', currentAccount)
    if (!signer) {
      return
    }
    const reserve = currentLendingPoolDetail?.underlyingAsset
    const amount = toBNString(value, currentLendingPoolDetail?.decimals)
    // if (!isSmartAccount) {
    //   deposit(signer, chainId, reserve, amount)
    // }
    try {
      // setLoading({ writing: true, desc: 'Creating smart account' })
      setLoading({ writing: true, desc: 'Depositing assets' })
      const res = !isSmartAccount
        ? await depositWithWallet(signer, chainId, reserve, amount, true)
        : await depositWithAccount(walletClient, chainId, currentAccount, reserve, amount)
      // await lendMng.depositToLending(
      //   newAccounts[0],
      //   currentLendingPoolDetail?.reserveId,
      //   BigInt(Number(value) * 10 ** currentLendingPoolDetail?.decimals),
      // )

      // getAccountInfo(accounts[0])
      // fetchLendPools()
      updateAfterAction()
      fetchPoolState()
      onClose()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [
    currentAccount,
    signer,
    currentLendingPoolDetail?.underlyingAsset,
    currentLendingPoolDetail?.decimals,
    value,
    isSmartAccount,
    chainId,
    walletClient,
    updateAfterAction,
    fetchPoolState,
    onClose,
  ])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.symbol])

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Deposit ${nameChecker(currentLendingPoolDetail?.symbol)}`}
    >
      <div>
        <AmountInput
          maxText='Balance'
          max={balance}
          ethBalance={ethBalance}
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail?.symbol}
          decimals={currentLendingPoolDetail?.decimals}
          value={value}
          onChange={(val) => setValue(val)}
        />
      </div>
      <ul className='summary-list'>
        <li>
          <p>Value:</p>
          <b className='text-highlight'>
            <FormattedNumber value={mul(value, currentLendingPoolDetail?.priceInUSD).toString()} symbol='$' />
          </b>
        </li>
        <li>
          <p>Current APY:</p>
          <b className='text-highlight'>
            <FormattedNumber value={currentLendingPoolDetail?.supplyAPY} percent />
          </b>
        </li>
        <li>
          <p>Updated APY:</p>
          <b className='text-highlight'>
            <FormattedNumber value={nextApy} percent />
          </b>
        </li>
      </ul>
      <div className='dialog-btns flex jc-sb'>
        <Button
          loading={loading.writing}
          disabled={!Number(value)}
          className={classNames('btn-base flex1', {
            'btn-disable': !Number(value),
          })}
          onClick={handleDeposit}
        >
          {loading.writing ? loading.desc : 'Deposit'}
        </Button>
      </div>
    </Dialog>
  )
}

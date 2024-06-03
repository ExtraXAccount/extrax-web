import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import { nameChecker } from '@/utils'
import { toPrecision } from '@/utils/math'
import useSmartAccount from '@/hooks/useSmartAccount'
import { useLendingManager } from '@/hooks/useSDK'
import useLendingList from './useLendingList'

export default function RepayDialog({
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  open: boolean
  onClose: any
  currentLendingPoolDetail: any
}) {
  const {
    smartAccount,
  } = useSmartAccount()
  const lendMng = useLendingManager()
  const { fetchLendPools } = useLendingList()

  const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false);
  const { balance } = useFetchBalance(currentLendingPoolDetail?.tokenAddress)
  const { balance: ethBalance } = useFetchEthBalance()

  function reset() {
    setValue('')
  }

  const repay = useCallback(async () => {
    console.log('repay :>> ', smartAccount);
    setLoading(true)
    try {
      const res = await lendMng.repay(smartAccount, currentLendingPoolDetail?.reserveId, BigInt(Number(value) * (10 ** currentLendingPoolDetail?.decimals)))
      console.log('repay res :>> ', res);
      fetchLendPools()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [
    value,
    currentLendingPoolDetail?.tokenDecimals,
    currentLendingPoolDetail?.reserveId,
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
      title={`Repay ${nameChecker(currentLendingPoolDetail?.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          sliderMaxText="Borrowed"
          sliderMax={currentLendingPoolDetail?.borrowed}
          max={balance}
          ethBalance={ethBalance}
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail?.tokenSymbol}
          decimals={currentLendingPoolDetail?.tokenDecimals}
          value={value}
          onChange={(val) => {
            if (Number(val) > currentLendingPoolDetail?.borrowed) {
              setValue('' + currentLendingPoolDetail?.borrowed)
            } else {
              setValue(val)
            }
          }}
        />
      </div>
      <ul className="summary-list" style={{marginTop: 20}}>
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
            repay()
          }}
        >
          {loading ? 'Repaying' : 'Repay'}
        </Button>
      </div>
    </Dialog>
  )
}

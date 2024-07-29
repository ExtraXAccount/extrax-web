import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { IFormattedPosition } from '@/store/lend'
import { nameChecker } from '@/utils'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'

import DialogAccountInfo from './DialogComponents/DialogAccountInfo'
import DialogApyDisplay from './DialogComponents/DialogAPYDisplay'
import useLendingList from './useLendingList'
import useInfoChange from '../Positions/hooks/useInfoChange'

export default function RepayDialog({
  open,
  currentLendingPoolDetail,
  onClose,
}: {
  open: boolean
  onClose: any
  currentLendingPoolDetail?: IFormattedPosition
}) {
  const {
    healthFactor,
    usedCredit,
    netWorth,
    debtVal,
    accountApy,
    currentAccount,
    updateAfterAction,
  } = useSmartAccount()
  const lendMng = useLendingManager()
  const { fetchLendPools } = useLendingList()

  const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { balance } = useFetchBalance(currentLendingPoolDetail?.underlyingAsset)
  const { balance: ethBalance } = useFetchEthBalance()

  const tokenPrice = useMemo(() => {
    if (!currentLendingPoolDetail?.tokenSymbol) {
      return 0
    }
    return getPrice(currentLendingPoolDetail?.tokenSymbol) || 0
  }, [getPrice, currentLendingPoolDetail?.tokenSymbol])

  const updatedSummary = useMemo(() => {
    const tokenValueChange = Number(value) * tokenPrice || 0
    return {
      usedCredit: usedCredit,
      netWorth: netWorth + tokenValueChange,
      debtVal: debtVal - tokenValueChange,
      // TODO: APY UPDATED
      accountApy,
    }
  }, [accountApy, debtVal, netWorth, tokenPrice, usedCredit, value])

  function reset() {
    setValue('')
  }

  const {pre, next} = useInfoChange({
    reserveId: currentLendingPoolDetail?.reserveId,
    amount: -Number(value),
    type: 'debt',
    price: getPrice(currentLendingPoolDetail?.tokenSymbol || '')
  })


  const repay = useCallback(async () => {
    console.log('repay :>> ', currentAccount)
    if (!currentLendingPoolDetail) {
      return
    }
    setLoading(true)
    try {
      const res = await lendMng.repay(
        currentAccount,
        currentLendingPoolDetail.marketId,
        currentLendingPoolDetail.reserveId,
        BigInt(Number(value) * 10 ** currentLendingPoolDetail.decimals),
      )
      console.log('repay res :>> ', res)
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
      title={`Repay ${nameChecker(currentLendingPoolDetail.tokenSymbol)}`}
    >
      <div>
        <AmountInput
          sliderMaxText="Borrowed"
          sliderMax={currentLendingPoolDetail.formatted.borrowed}
          max={balance}
          ethBalance={ethBalance}
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail.tokenSymbol}
          decimals={currentLendingPoolDetail.decimals}
          value={value}
          price={getPrice(currentLendingPoolDetail.tokenSymbol)}
          onChange={(val) => {
            if (Number(val) > currentLendingPoolDetail.formatted.borrowed) {
              setValue('' + currentLendingPoolDetail.formatted.borrowed)
            } else {
              setValue(val)
            }
          }}
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
            title: 'Health Factor',
            content: !currentLendingPoolDetail ? '--' : toPrecision(healthFactor),
          },
        ]}
      />
      <div className="dialog-divider"></div>
      <DialogAccountInfo
        reserveId={currentLendingPoolDetail.reserveId}
        updatedSummary={updatedSummary}
      />
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={loading}
          disabled={!Number(value)}
          className={classNames('btn-base btn-base-primary btn-base-large flex1', {
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

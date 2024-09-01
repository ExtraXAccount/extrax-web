import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import { useWagmiCtx } from '@/components/WagmiContext'
import { chainIdToName } from '@/constants/chains'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
// import usePrices from '@/hooks/usePrices'
// import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { strToDecimals } from '@/sdk/utils/token'
import { repay, repayWithAccount } from '@/sdk-ethers'
import { IFormattedPosition } from '@/store/lend'
import { nameChecker } from '@/utils'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'

import useInfoChange from '../Positions/hooks/useInfoChange'
import DialogAccountInfo from './DialogComponents/DialogAccountInfo'
import DialogApyDisplay from './DialogComponents/DialogAPYDisplay'
import useLendingList from './useLendingList'

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
    liquidationThreshold,
    usedCredit,
    netWorth,
    debtVal,
    accountApy,
    currentAccount,
    isSmartAccount,
    updateAfterAction,
  } = useSmartAccount()
  // const lendMng = useLendingManager()
  const { fetchPoolState } = useLendingList()

  // const { prices, getPrice } = usePrices()
  const [useNativeETH, setUseNativeETH] = useState(true)
  const { walletClient, signer, chainId } = useWagmiCtx()
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { balance } = useFetchBalance(currentLendingPoolDetail?.underlyingAsset)
  const { balance: ethBalance } = useFetchEthBalance()

  const tokenPrice = Number(currentLendingPoolDetail?.reserve?.priceInUSD)
  const borrowedAmount = Number(currentLendingPoolDetail?.variableBorrows) || 0

  const tokenValueChange = useMemo(() => {
    return Number(value) * tokenPrice || 0
  }, [tokenPrice, value])

  // const updatedHealthFactor = useMemo(() => {
  //   const _liquidateThshold = liquidationThreshold
  //   const _borrowedValue = debtVal - tokenValueChange
  //   return _liquidateThshold / _borrowedValue
  // }, [debtVal, liquidationThreshold, tokenValueChange])
  // const next = useInfoChange({
  //   reserveId: currentLendingPoolDetail?.reserveId,
  //   amount: -Number(value),
  //   type: 'debt',
  //   price: getPrice(currentLendingPoolDetail?.tokenSymbol || ''),
  // })

  // const updatedSummary = useMemo(() => {
  //   const tokenValueChange = Number(value) * tokenPrice || 0
  //   return {
  //     usedCredit: usedCredit,
  //     netWorth: netWorth + tokenValueChange,
  //     debtVal: debtVal - tokenValueChange,
  //     accountApy: next.accountApy,
  //   }
  // }, [debtVal, netWorth, tokenPrice, usedCredit, value, next.accountApy])

  function reset() {
    setValue('')
  }

  const handleRepay = useCallback(async () => {
    if (!currentLendingPoolDetail) {
      return
    }
    setLoading(true)
    try {
      const reserve = currentLendingPoolDetail?.underlyingAsset
      const amount = toBNString(value, currentLendingPoolDetail?.reserve?.decimals)
      const chain = chainIdToName[chainId]
      console.log('handleRepay :>> ', {currentAccount, currentLendingPoolDetail, amount} )
      const res = isSmartAccount ? 
      await repayWithAccount(walletClient, chain, currentAccount, reserve, amount)
      : await repay(signer as any, chain, reserve, amount) 
      console.log('repay res :>> ', res)
      updateAfterAction(currentAccount)
      fetchPoolState()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [
    currentAccount,
    currentLendingPoolDetail,
    chainId,
    isSmartAccount,
    signer,
    walletClient,
    value,
    updateAfterAction,
    fetchPoolState,
    onClose,
  ])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.reserve?.id])

  if (!currentLendingPoolDetail) {
    return null
  }

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Repay ${nameChecker(currentLendingPoolDetail?.reserve?.symbol)}`}
    >
      <div>
        <AmountInput
          sliderMaxText="Borrowed"
          sliderMax={borrowedAmount}
          max={balance}
          ethBalance={ethBalance}
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail?.reserve?.symbol || ''}
          decimals={currentLendingPoolDetail?.reserve?.decimals}
          value={value}
          price={tokenPrice}
          onChange={(val) => {
            if (Number(val) > borrowedAmount) {
              setValue('' + borrowedAmount)
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
              aprToApy100(Number(currentLendingPoolDetail.reserve?.variableBorrowAPY) * 100),
            )}%`,
          },
          {
            title: 'Health Factor',
            content: !currentLendingPoolDetail ? '--' : toPrecision(healthFactor),
          },
        ]}
      />
      <div className="dialog-divider"></div>
      {/* <DialogAccountInfo
        reserveId={currentLendingPoolDetail.reserveId}
        updatedSummary={updatedSummary}
      /> */}
      <div className="dialog-btns flex jc-sb">
        <Button
          loading={loading}
          disabled={!Number(value)}
          className={classNames('btn-base btn-base-primary btn-base-large flex1', {
            // 'btn-disable': !Number(value) || isApproveActive,
          })}
          onClick={() => {
            handleRepay()
          }}
        >
          {loading ? 'Repaying' : 'Repay'}
        </Button>
      </div>
    </Dialog>
  )
}

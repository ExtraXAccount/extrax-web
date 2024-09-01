import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import Dialog from '@/components/Dialog'
import { useWagmiCtx } from '@/components/WagmiContext'
// import usePrices from '@/hooks/usePrices'
// // import { useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import { chainIdToName } from '@/sdk/constants/chains'
import { strToDecimals, toDecimals } from '@/sdk/utils/token'
import { withdraw,withdrawWithAccount } from '@/sdk-ethers'
import { IFormattedPosition } from '@/store/lend'
import { nameChecker } from '@/utils'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'

import useInfoChange from '../Positions/hooks/useInfoChange'
import DialogAccountInfo from './DialogComponents/DialogAccountInfo'
import DialogApyDisplay from './DialogComponents/DialogAPYDisplay'
import useLendingList from './useLendingList'

export default function WithdrawDialog({
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

  const [useNativeETH, setUseNativeETH] = useState(true)
  const { walletClient, signer, chainId } = useWagmiCtx()
  // const [allowance, setAllowance] = useState(0)
  // const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const tokenPrice = Number(currentLendingPoolDetail?.reserve?.priceInUSD)

  const tokenValueChange = useMemo(() => {
    return Number(value) * tokenPrice || 0
  }, [tokenPrice, value])

  // const updatedHealthFactor = useMemo(() => {
  //   const reserveLiquidationThresholdConfig =
  //     (currentLendingPoolDetail?.config.liquidationThreshold || 0) / 10000
  //   const _liquidateThshold =
  //     liquidationThreshold - tokenValueChange * reserveLiquidationThresholdConfig
  //   const _borrowedValue = debtVal
  //   return _liquidateThshold / _borrowedValue
  // }, [
  //   debtVal,
  //   currentLendingPoolDetail?.config.liquidationThreshold,
  //   liquidationThreshold,
  //   tokenValueChange,
  // ])

  // const next = useInfoChange({
  //   reserveId: currentLendingPoolDetail?.reserveId,
  //   amount: -Number(value),
  //   type: 'liquidity',
  //   price: getPrice(currentLendingPoolDetail?.tokenSymbol || ''),
  // })

  // const updatedSummary = useMemo(() => {
  //   const tokenValueChange = Number(value) * tokenPrice || 0
  //   return {
  //     usedCredit: usedCredit,
  //     netWorth: netWorth - tokenValueChange,
  //     debtVal: debtVal,
  //     accountApy: next.accountApy,
  //   }
  // }, [debtVal, netWorth, tokenPrice, usedCredit, value, next.accountApy])

  function reset() {
    setValue('')
  }

  console.log('currentLendingPoolDetail :>> ', currentLendingPoolDetail)
  const handleWithdraw = useCallback(async () => {
    console.log('withdraw :>> ', currentAccount, currentLendingPoolDetail)
    if (!currentLendingPoolDetail) {
      return
    }
    setLoading(true)
    try {
      const reserve = currentLendingPoolDetail?.underlyingAsset
      const amount = toBNString(value, currentLendingPoolDetail?.reserve.decimals)
      const chain = chainIdToName[chainId]
      const res = isSmartAccount ? 
      await withdrawWithAccount(walletClient, chain, currentAccount, reserve, amount)
      : await withdraw(signer as any, chain, reserve, amount) 
      console.log('withdraw res :>> ', res)
      updateAfterAction(currentAccount)
      fetchPoolState()
      onClose()
      return res
    } finally {
      setLoading(false)
    }
  }, [currentAccount, currentLendingPoolDetail, value, chainId, isSmartAccount, walletClient, signer, updateAfterAction, fetchPoolState, onClose])

  useEffect(() => {
    reset()
  }, [currentLendingPoolDetail?.reserve.id])

  if (!currentLendingPoolDetail) {
    return null
  }
  

  return (
    <Dialog
      open={!!open && !!currentLendingPoolDetail}
      onClose={onClose}
      title={`Withdraw ${nameChecker(currentLendingPoolDetail?.reserve?.symbol)}`}
    >
      <div>
        <AmountInput
          maxText="Deposited"
          max={
            strToDecimals(currentLendingPoolDetail?.scaledATokenBalance, currentLendingPoolDetail?.reserve?.decimals) -
            strToDecimals(currentLendingPoolDetail?.scaledVariableDebt, currentLendingPoolDetail?.reserve?.decimals)
          }
          useNativeETH={useNativeETH}
          onUseNativeETH={setUseNativeETH}
          token={currentLendingPoolDetail?.reserve?.symbol || ''}
          decimals={currentLendingPoolDetail?.reserve.decimals}
          value={value}
          price={tokenPrice}
          onChange={(val) => setValue(val)}
        />
      </div>
      <DialogApyDisplay
        list={[
          {
            title: 'APY',
            content: `${remain2Decimal(
              aprToApy100(Number(currentLendingPoolDetail?.reserve?.supplyAPY) * 100),
            )}%`,
          },
          {
            title: 'Health Factor',
            content: !currentLendingPoolDetail ? '--' : remain2Decimal(healthFactor),
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
            handleWithdraw()
          }}
        >
          {loading ? 'Withdrawing' : 'Withdraw'}
        </Button>
      </div>
    </Dialog>
  )
}

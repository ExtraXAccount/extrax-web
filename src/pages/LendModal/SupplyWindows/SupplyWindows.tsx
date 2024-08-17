import './SupplyWindows.css'

import { Button, Switch, Tooltip } from 'antd/es'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useMatch } from 'react-router-dom'

import AmountInput from '@/components/AmountInput'
import TokenIcon from '@/components/TokenIcon'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import DialogAccountInfo from '@/pages/Lend/DialogComponents/DialogAccountInfo'
import useLendingList from '@/pages/Lend/useLendingList'
import { aprToApy, toPrecision } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

import { SetAsCollateral } from '../SetAsCollateral'
import useLendPoolInfo from '../useLendPoolInfo'

export interface ISupplyWindowsProps {
  className?: string
}

export const SupplyWindows = ({ className }: ISupplyWindowsProps) => {
  const matchLend = useMatch('lend/:marketId/:reserveId')
  const { getPrice } = usePrices()
  const {
    liquidationThreshold,
    usedCredit,
    leverage,
    healthFactor,
    netWorth,
    debtVal,
    accountApy,
    currentAccount,
    availableCredit,
    accounts,
    updateAfterAction,
  } = useSmartAccount()
  const { state } = useLocation()

  const [isBorrowMode, setIsBorrowMode] = useState(!!state?.isBorrowMode)
  // const [leverageMode, setLeverageMode] = useState(false)
  const [useNativeETH, setUseNativeETH] = useState(true)
  const [loading, setLoading] = useState({ writing: false, desc: '' })
  const [value, setValue] = useState('')
  const lendPoolInfo = useLendPoolInfo()

  const { fetchLendPools } = useLendingList()
  const accountMng = useAccountManager()
  const lendMng = useLendingManager()
  const { balance } = useFetchBalance(lendPoolInfo?.underlyingAsset)
  const { balance: ethBalance } = useFetchEthBalance()

  const tokenPrice = useMemo(() => {
    if (!lendPoolInfo?.tokenSymbol) {
      return 0
    }
    return getPrice(lendPoolInfo?.tokenSymbol) || 0
  }, [getPrice, lendPoolInfo?.tokenSymbol])

  const maxBorrowAmount = useMemo(() => {
    if (!lendPoolInfo?.tokenSymbol || !tokenPrice) {
      return 0
    }
    return div(availableCredit, tokenPrice).toString()
  }, [availableCredit, lendPoolInfo?.tokenSymbol, tokenPrice])

  const tokenValueChange = useMemo(() => {
    return Number(value) * tokenPrice || 0
  }, [tokenPrice, value])

  const updatedHealthFactor = useMemo(() => {
    const reserveLiquidationThresholdConfig =
      (lendPoolInfo?.config.liquidationThreshold || 0) / 10000
    const _liquidateThshold = isBorrowMode
      ? liquidationThreshold
      : liquidationThreshold + tokenValueChange * reserveLiquidationThresholdConfig
    const _borrowedValue = isBorrowMode ? debtVal + tokenValueChange : debtVal
    return _liquidateThshold / _borrowedValue
  }, [
    debtVal,
    isBorrowMode,
    lendPoolInfo?.config.liquidationThreshold,
    liquidationThreshold,
    tokenValueChange,
  ])

  const updatedSummary = useMemo(() => {
    return {
      usedCredit: !isBorrowMode ? usedCredit : usedCredit + tokenValueChange,
      netWorth: !isBorrowMode
        ? netWorth + tokenValueChange
        : // : leverageMode
          // ? netWorth - tokenValueChange
          netWorth,
      debtVal: !isBorrowMode ? debtVal : debtVal + tokenValueChange,
      // TODO: APY UPDATED
      accountApy,
    }
  }, [
    accountApy,
    debtVal,
    isBorrowMode,
    // leverageMode,
    netWorth,
    tokenValueChange,
    usedCredit,
  ])

  const handleDeposit = useCallback(async () => {
    if (!lendPoolInfo) {
      return
    }
    console.log('depositToLending :>> ', accounts)
    let newAccounts = [...accounts]
    try {
      if (!accounts.length) {
        setLoading({ writing: true, desc: 'Creating smart account' })
        newAccounts = await accountMng.createAccount()
      }
      setLoading({ writing: true, desc: 'Supplying' })
      await lendMng.depositToLending(
        newAccounts[0],
        lendPoolInfo.reserveId,
        BigInt(Number(value) * 10 ** lendPoolInfo.decimals),
      )

      updateAfterAction(newAccounts[0])
      fetchLendPools()
      // onClose()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [
    accountMng,
    accounts,
    fetchLendPools,
    lendMng,
    lendPoolInfo,
    updateAfterAction,
    value,
  ])

  const handleBorrow = useCallback(async () => {
    if (!lendPoolInfo) {
      return
    }
    try {
      setLoading({ writing: true, desc: 'Borrowing' })
      const res = await lendMng.borrow(
        currentAccount,
        lendPoolInfo.marketId,
        lendPoolInfo.reserveId,
        BigInt(Number(value) * 10 ** lendPoolInfo.decimals),
      )

      updateAfterAction(currentAccount)
      fetchLendPools()
      // onClose()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [currentAccount, fetchLendPools, lendMng, lendPoolInfo, updateAfterAction, value])

  const handleSubmit = useCallback(() => {
    if (isBorrowMode) {
      handleBorrow()
    } else {
      handleDeposit()
    }
  }, [handleBorrow, handleDeposit, isBorrowMode])

  useEffect(() => {
    console.log('lendPoolInfo :>> ', lendPoolInfo)
  }, [lendPoolInfo])

  if (!lendPoolInfo) {
    return null
  }

  return (
    <div className={'supply-windows ' + className}>
      {matchLend && (
        <div className="supply-windows__frame-482102">
          <div className="supply-windows__frame-482101">
            <div className="supply-windows__group-9">
              <TokenIcon
                symbol={lendPoolInfo?.tokenSymbol}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="supply-windows__supply-usdc">
              {isBorrowMode ? 'Borrow' : 'Supply'} {lendPoolInfo.tokenSymbol}
            </div>
          </div>
          <div className="supply-windows__mode-selector">
            <div
              className={classNames('supply-windows__mode', {
                'supply-windows__mode-active': !isBorrowMode,
              })}
              onClick={() => setIsBorrowMode(false)}
            >
              Supply
            </div>{' '}
            /{' '}
            <div
              className={classNames('supply-windows__mode', {
                'supply-windows__mode-active': isBorrowMode,
              })}
              onClick={() => setIsBorrowMode(true)}
            >
              Borrow
            </div>
          </div>
        </div>
      )}
      <div className="supply-windows__frame-482088">
        <div className="supply-windows__frame-481806">
          {/* {isBorrowMode && (
            <div className="leverage-mode-setting-wrapper">
              <div className="leverage-mode-setting-form flex ai-ct jc-sb">
                <span>Leverage Mode</span>
                <Switch
                  checked={leverageMode}
                  size="small"
                  onChange={setLeverageMode}
                ></Switch>
              </div>
              <div className="leverage-mode-setting-hint">
                <i className="iconfont icon-hint"></i>
                {leverageMode ? (
                  <span>
                    Leverage mode off. Asset to borrow will directly go to your{' '}
                    <Tooltip title={account}>
                      <b>Wallet</b>
                    </Tooltip>
                    .
                  </span>
                ) : (
                  <span>
                    Leverage mode on. Asset to borrow will retain go to your{' '}
                    <Tooltip title={currentAccount}>
                      <b>Main Account</b>
                    </Tooltip>
                    .
                  </span>
                )}
              </div>
            </div>
          )} */}
          <AmountInput
            noPadding
            maxText={`${isBorrowMode ? 'Borrowing ' : ''}Available`}
            max={isBorrowMode ? maxBorrowAmount : balance}
            ethBalance={isBorrowMode ? maxBorrowAmount : ethBalance}
            useNativeETH={useNativeETH}
            onUseNativeETH={setUseNativeETH}
            token={lendPoolInfo.tokenSymbol}
            decimals={lendPoolInfo.decimals}
            value={value}
            price={getPrice(lendPoolInfo.tokenSymbol)}
            onChange={(val) => setValue(val)}
          />
          <div className="supply-windows__frame-482084">
            <div className="supply-windows__frame-4820842">
              <div className="supply-windows__supply-apy">
                {/* TODO: calculate afterwards APY */}
                {isBorrowMode ? 'Borrow' : 'Supply'} APY{' '}
              </div>
              <div className="supply-windows__frame-482223">
                <div className="supply-windows___6-73">
                  {toPrecision(
                    aprToApy(
                      (isBorrowMode
                        ? lendPoolInfo.formatted.borrowApr
                        : lendPoolInfo.formatted.apr) * 100,
                    ),
                  )}
                  %{' '}
                </div>
                {/* <div className="supply-windows__frame-482224">
                  <div className="supply-windows___3-2">🎉 +3.2% </div>
                </div>
                <div className="supply-windows__frame-482225">
                  <div className="supply-windows___3-2">❤️‍🔥 +3.2% </div>
                </div> */}
              </div>
            </div>
            <div className="supply-windows__frame-481709">
              <div className="supply-windows__health-factor">Health Factor</div>
              <div className="supply-windows___1-21">
                {toPrecision(updatedHealthFactor)}
              </div>
            </div>
          </div>
          {!isBorrowMode && (
            // (
            //   leverageMode && (
            //     <div className="borrow-risk-hint">
            //       <i className="warn-hint"></i>
            //       <span>
            //         Borrowing this amount will reduce your health factor and increase risk
            //         of liquidation.
            //       </span>
            //     </div>
            //   )
            <SetAsCollateral
              property1="1"
              className="supply-windows__selcetion-instance"
            ></SetAsCollateral>
          )}
        </div>
        <div className="supply-windows__deposit-info">
          <DialogAccountInfo
            reserveId={lendPoolInfo.reserveId}
            updatedSummary={updatedSummary}
          />
          <Button
            loading={loading.writing}
            disabled={!Number(value)}
            className={classNames('btn-base btn-base-primary btn-base-large flex1', {
              // 'btn-disable': !Number(value) || isApproveActive,
            })}
            style={{
              width: '100%',
            }}
            onClick={handleSubmit}
          >
            {loading.writing ? loading.desc : isBorrowMode ? 'Borrow' : 'Supply'}
          </Button>
        </div>
      </div>
    </div>
  )
}

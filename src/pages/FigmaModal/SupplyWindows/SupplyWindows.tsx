import './SupplyWindows.css'

import { Button, Switch, Tooltip } from 'antd/es'
import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import AmountInput from '@/components/AmountInput'
import TokenIcon from '@/components/TokenIcon'
import { useWagmiCtx } from '@/components/WagmiContext'
import useFetchBalance, { useFetchEthBalance } from '@/hooks/useFetchBalance'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { aprToApy, toPrecision } from '@/utils/math'

import { AccountBalancesSupplyProperty1BalancesDetail } from '../AccountBalancesSupplyProperty1BalancesDetail/AccountBalancesSupplyProperty1BalancesDetail'
import { AccountInfoProperty1CompositionD } from '../AccountInfoProperty1CompositionD/AccountInfoProperty1CompositionD'
import { SelcetionProperty11 } from '../SelcetionProperty11/SelcetionProperty11'
import useLendPoolInfo from '../useLendPoolInfo'

export interface ISupplyWindowsProps {
  className?: string
}

export const SupplyWindows = ({ className, ...props }: ISupplyWindowsProps) => {
  const { getPrice } = usePrices()
  const { smartAccount, accounts, updateAfterAction } = useSmartAccount()
  const { account } = useWagmiCtx()
  const { state } = useLocation()

  const [isBorrowMode, setIsBorrowMode] = useState(!!state?.isBorrowMode)
  const [leverageMode, setLeverageMode] = useState(false)
  const [useNativeETH, setUseNativeETH] = useState(true)
  const [loading, setLoading] = useState({ writing: false, desc: '' })
  const [value, setValue] = useState('')
  const lendPoolInfo = useLendPoolInfo()

  const { fetchLendPools } = useLendingList()
  const accountMng = useAccountManager()
  const lendMng = useLendingManager()
  const { balance } = useFetchBalance(lendPoolInfo?.underlyingAsset)
  const { balance: ethBalance } = useFetchEthBalance()

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
        smartAccount,
        lendPoolInfo.marketId,
        lendPoolInfo.reserveId,
        BigInt(Number(value) * 10 ** lendPoolInfo.decimals),
      )

      updateAfterAction(smartAccount)
      fetchLendPools()
      // onClose()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [smartAccount, fetchLendPools, lendMng, lendPoolInfo, updateAfterAction, value])

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
      <div className="supply-windows__frame-482102">
        <div className="supply-windows__frame-482101">
          <div className="supply-windows__group-9">
            <TokenIcon
              symbol={lendPoolInfo?.tokenSymbol}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="supply-windows__supply-usdc">
            Supply {lendPoolInfo.tokenSymbol}{' '}
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
      <div className="supply-windows__frame-482088">
        <div className="supply-windows__frame-481806">
          {isBorrowMode && (
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
                    <Tooltip title={smartAccount}>
                      <b>Main Account</b>
                    </Tooltip>
                    .
                  </span>
                )}
              </div>
            </div>
          )}
          <AmountInput
            noPadding
            maxText={`${isBorrowMode ? 'Borrowing ' : ''}Available`}
            max={balance}
            ethBalance={ethBalance}
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
              <div className="supply-windows__health-factor">Exchange Rate </div>
              <div className="supply-windows___1-21">
                {lendPoolInfo.formatted.exchangeRate}{' '}
              </div>
            </div>
          </div>
          {isBorrowMode ? (
            leverageMode && (
              <div className="borrow-risk-hint">
                <i className="warn-hint"></i>
                <span>
                  Borrowing this amount will reduce your health factor and increase risk
                  of liquidation.
                </span>
              </div>
            )
          ) : (
            <SelcetionProperty11
              property1="1"
              className="supply-windows__selcetion-instance"
            ></SelcetionProperty11>
          )}
        </div>
        <div className="supply-windows__deposit-info">
          <div className="supply-windows__frame-481805">
            <div className="supply-windows__component-101">
              <AccountInfoProperty1CompositionD className="supply-windows__account-info-instance"></AccountInfoProperty1CompositionD>
              <AccountBalancesSupplyProperty1BalancesDetail className="supply-windows__account-balances-supply-instance"></AccountBalancesSupplyProperty1BalancesDetail>
            </div>
          </div>
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
          {/* <MainProperty1Default className="supply-windows__main-instance"></MainProperty1Default> */}
        </div>
      </div>
    </div>
  )
}

import './index.scss'

import { Tooltip } from 'antd'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import AccountDepositDialog from '@/components/AccountDepositDialog'
import useSmartAccount from '@/hooks/useSmartAccount'
import { toPrecision } from '@/utils/math'

export default function AccountInfo() {
  // const navigate = useNavigate()
  const {
    healthStatus,
    LTV,
    netWorth,
    healthFactor,
    currentAccount,
    depositedVal,
    // depositedAssets,
    // debtVal,
    // debtAssets,
    maxCredit,
    // availableCredit,
    usedCredit,
    // safetyRatio,
    accountApy,
    accounts,
    // getInitData,
  } = useSmartAccount()

  useEffect(() => {
    console.log('healthStatus :>> ', healthStatus, healthFactor)
  }, [healthStatus, healthFactor])

  // useEffect(() => {
  //   getInitData()
  // }, [getInitData])

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  return (
    <div className="extrax-account-info">
      <AccountDepositDialog
        accounts={accounts}
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      ></AccountDepositDialog>

      {!currentAccount ? (
        <div className="extrax-account-info-inner extrax-account-creator">
          <div className="extrax-account-create-button">
            <p className="btn-base" onClick={handleAddDeposit}>
              Supply to Start
            </p>
            <span className="text-sm-2" style={{ marginTop: 8 }}>
              to start earning / leveraging (An On-chain smart account will be created)
            </span>
          </div>
        </div>
      ) : (
        <div className="extrax-account-info-inner">
          <div className="extrax-account-info-main">
            <p className="extrax-account-info-main-account">
              <b>Main Account: </b>
              <em>
                {!currentAccount
                  ? '--'
                  : `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}
              </em>
            </p>
            <p className="extrax-account-info-main-splitter"> | </p>
            <p className="extrax-account-info-main-apy">
              <b>Portfolio APY: </b>
              <em className="text-highlight">
                {!depositedVal ? '--' : toPrecision(accountApy * 100) + '%'}
              </em>
            </p>
          </div>
          <div className="extrax-account-info-detail">
            <div className="extrax-account-info-detail-item extrax-account-info-deposited">
              <b>Net Worth</b>
              <em className="text-highlight">
                {!netWorth ? '--' : `$${toPrecision(netWorth)}`}
              </em>
              <button className="btn-add" onClick={handleAddDeposit}></button>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-credit">
              <Tooltip title="Used Credit / Max Credit">
                <b className="flex ai-ct gap-6">
                  Borrowing Power
                  <i className="iconfont icon-hint"></i>
                </b>
              </Tooltip>
              <em className="text-highlight">
                {!depositedVal
                  ? '--'
                  : `$${toPrecision(Number(usedCredit))} / $${toPrecision(
                      Number(maxCredit),
                    )}`}
              </em>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-safety">
              <Tooltip
                overlayInnerStyle={{ width: 400 }}
                title={
                  'Health Factor = LiquidationThreshold of Borrowing Value / Current Borrowed Value'
                }
              >
                <b className="flex ai-ct gap-6">
                  Health Factor
                  <i className="iconfont icon-hint"></i>
                </b>
              </Tooltip>
              <em
                className={cx('', {
                  'farm-buffer-safe': healthFactor < 80,
                  'farm-buffer-warn': healthFactor > 80,
                  'farm-buffer-danger': healthFactor > 90,
                })}
              >
                {!depositedVal ? '--' : toPrecision(healthFactor)}
              </em>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-ltv">
              <b>LTV</b>
              <div className="">
                {!netWorth ? (
                  '--'
                ) : (
                  <div className="ltv-wrapper">
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-current"
                      style={{ width: `${LTV.current * 100}%` }}
                    >
                      <span>Current: {`${toPrecision(LTV.current * 100)}%`}</span>
                    </p>
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-max"
                      style={{ width: `${LTV.max * 100}%` }}
                    >
                      <span>Max: {`${toPrecision(LTV.max * 100)}%`}</span>
                    </p>
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-liquidation"
                      style={{ width: `${LTV.liquidation * 100}%` }}
                    >
                      <span>
                        Liquidation Threshold: {`${toPrecision(LTV.liquidation * 100)}%`}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

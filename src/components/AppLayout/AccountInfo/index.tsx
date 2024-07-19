import './index.scss'

import { Tooltip } from 'antd'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import AccountDepositDialog from '@/components/AccountDepositDialog'
import useSmartAccount from '@/hooks/useSmartAccount'
import { toPrecision } from '@/utils/math'

export const INFINITY = '∞'

export default function AccountInfo() {
  // const navigate = useNavigate()
  const {
    healthStatus,
    accountEquity,
    healthFactorPercent,
    smartAccount,
    depositedVal,
    // depositedAssets,
    // debtVal,
    // debtAssets,
    maxCredit,
    availableCredit,
    usedCredit,
    // safetyRatio,
    accountAPY,
    accounts,
    // getInitData,
  } = useSmartAccount()

  useEffect(() => {
    console.log('healthStatus :>> ', healthStatus, healthFactorPercent)
  }, [healthStatus, healthFactorPercent])

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

      {!smartAccount ? (
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
                {!smartAccount
                  ? '--'
                  : `${smartAccount.slice(0, 6)}...${smartAccount.slice(-4)}`}
              </em>
            </p>
            <p className="extrax-account-info-main-splitter"> | </p>
            <p className="extrax-account-info-main-apy">
              <b>Portfolio APY: </b>
              <em className="text-highlight">
                {!depositedVal ? '--' : toPrecision(accountAPY * 100) + '%'}
              </em>
            </p>
          </div>
          <div className="extrax-account-info-detail">
            <div className="extrax-account-info-detail-item extrax-account-info-deposited">
              <b>Net Worth</b>
              <em className="text-highlight">
                {!accountEquity ? '--' : `$${toPrecision(Number(accountEquity))}`}
              </em>
              <button className="btn-add" onClick={handleAddDeposit}></button>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-credit">
              <Tooltip title="Used Credit / Max Credit">
                <b className="flex ai-ct gap-6">
                  Leverage Credit
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
                  <div>
                    <p>Safety Factor = Debts&apos; Value / Positions&apos; Value</p>
                    <p>
                      The account will be liquidated when the Safety Factor is above{' '}
                      <span className="">90%</span>
                    </p>
                  </div>
                }
              >
                <b className="flex ai-ct gap-6">
                  Health Factor
                  <i className="iconfont icon-hint"></i>
                </b>
              </Tooltip>
              <em
                className={cx('', {
                  'farm-buffer-safe': healthFactorPercent < 80,
                  'farm-buffer-warn': healthFactorPercent > 80,
                  'farm-buffer-danger': healthFactorPercent > 90,
                })}
              >
                {!depositedVal ? '--' : toPrecision(healthFactorPercent, 2) + '%'}
              </em>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

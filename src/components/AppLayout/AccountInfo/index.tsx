import './index.scss'

// import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import cx from 'classnames'
import { useCallback, useState } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import AccountDepositDialog from '@/components/AccountDepositDialog'
import { toPrecision } from '@/utils/math'

export const INFINITY = '∞'

export default function AccountInfo() {
  // const navigate = useNavigate()

  const {
    smartAccount,
    depositedVal,
    // depositedAssets,
    // debtVal,
    // debtAssets,
    maxCredit,
    availableCredit,
    // usedCredit,
    safetyRatio,
    accountAPY,
    lendingList,
    accounts,
  } = useSmartAccount()

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  return (
    <div className="extrax-account-info">
      <AccountDepositDialog
        accounts={accounts}
        open={depositDialogOpen}
        currentLendingPoolDetail={lendingList[0]}
        onClose={() => setDepositDialogOpen(false)}
      ></AccountDepositDialog>

      {!smartAccount ? (
        <div className="extrax-account-info-inner extrax-account-creator">
          <div className="extrax-account-create-button btn-base" onClick={handleAddDeposit}>
            <p>Deposit to start earning / leveraging</p>
            <span>(An On-chain smart account will be created)</span>
          </div>
        </div>
      ) : (
        <div className="extrax-account-info-inner">
          <div className="extrax-account-info-main">
            <p className="extrax-account-info-main-account">
              <b>Main Account: </b>
              <em>{!smartAccount ? '--' : `${smartAccount.slice(0, 6)}...${smartAccount.slice(-4)}`}</em>
            </p>
            <p className="extrax-account-info-main-splitter"> | </p>
            <p className="extrax-account-info-main-apy">
              <b>Portfolio APY: </b>
              <em className="text-highlight">{!depositedVal ? '--' : toPrecision(accountAPY * 100) + '%'}</em>
            </p>
          </div>
          <div className="extrax-account-info-detail">
            <div className="extrax-account-info-detail-item extrax-account-info-deposited">
              <b>Deposited</b>
              <em className="text-highlight">{!depositedVal ? '--' : `$${toPrecision(depositedVal)}`}</em>
              <button className="btn-base btn-base-mini" onClick={handleAddDeposit}></button>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-credit">
              <Tooltip title="Available Credit / Max Credit">
                <b className="flex ai-ct gap-6">
                  Leverage Credit
                  <i className="iconfont icon-hint"></i>
                </b>
              </Tooltip>
              <em className="text-highlight">
                {!depositedVal ? '--' : `$${toPrecision(availableCredit)} / $${toPrecision(maxCredit)}`}
              </em>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-safety">
              <Tooltip
                overlayInnerStyle={{ width: 400 }}
                title={
                  <div>
                    <p>Safety Factor = Debts&apos; Value / Positions&apos; Value</p>
                    <p>
                      The account will be liquidated when the Safety Factor is above <span className="">90%</span>
                    </p>
                  </div>
                }
              >
                <b className="flex ai-ct gap-6">
                  Safety Factor
                  <i className="iconfont icon-hint"></i>
                </b>
              </Tooltip>
              <em
                className={cx('', {
                  'farm-buffer-safe': safetyRatio < 0.8,
                  'farm-buffer-warn': safetyRatio > 0.8,
                  'farm-buffer-danger': safetyRatio > 0.9,
                })}
              >
                {!depositedVal ? '--' : toPrecision(safetyRatio * 100) + '%'}
              </em>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import './index.scss'

import { useCallback, useState } from 'react'

// import { useNavigate } from 'react-router-dom'
import useSmartAccount from '@/hooks/useSmartAccount'
import DepositDialog from '@/pages/Lend/DepositDialog'
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
  } = useSmartAccount()

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  return (
    <div className="extrax-account-info">
      <DepositDialog
        open={depositDialogOpen}
        currentLendingPoolDetail={lendingList[0]}
        onClose={() => setDepositDialogOpen(false)}
      ></DepositDialog>

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
              <em>{!depositedVal ? '--' : `${smartAccount.slice(0, 6)}...${smartAccount.slice(-4)}`}</em>
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
              <b>Leverage Credit</b>
              <em className="text-highlight">
                {!depositedVal ? '--' : `$${toPrecision(availableCredit)} / $${toPrecision(maxCredit)}`}
              </em>
            </div>
            <div className="extrax-account-info-detail-item extrax-account-info-safety">
              <b>Safety Factor</b>
              <em className="text-highlight">{!depositedVal ? '--' : safetyRatio}</em>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

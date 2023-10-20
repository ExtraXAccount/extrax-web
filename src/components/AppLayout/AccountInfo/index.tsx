import './index.scss'

import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import useSmartAccount from '@/hooks/useSmartAccount'
import { addComma, aprToApy, toPrecision } from '@/utils/math'

export const INFINITY = '∞'

export default function AccountInfo() {
  const navigate = useNavigate()

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
  } = useSmartAccount()

  const handleAddDeposit = useCallback(() => {
    navigate('/lend')
  }, [navigate])

  return (
    <div className="extrax-account-info">
      <div className="extrax-account-info-inner">
        <div className="extrax-account-info-main">
          <p className="extrax-account-info-main-account">
            <b>Main Account: </b>
            <em>{!depositedVal ? '--' : `${smartAccount.slice(0, 6)}...${smartAccount.slice(-4)}`}</em>
          </p>
          <p className="extrax-account-info-main-splitter"> | </p>
          <p className="extrax-account-info-main-apy">
            <b>Portfolio APY: </b>
            <em className="text-highlight">{!depositedVal ? '--' : accountAPY}</em>
          </p>
        </div>
        <div className="extrax-account-info-detail">
          <div className="extrax-account-info-detail-item extrax-account-info-deposited">
            <b>Deposited</b>
            <em className="text-highlight">{!depositedVal ? '--' : `$${addComma(depositedVal)}`}</em>
            <button className="btn-base btn-base-mini" onClick={handleAddDeposit}></button>
          </div>
          <div className="extrax-account-info-detail-item extrax-account-info-credit">
            <b>Leverage Credit</b>
            <em className="text-highlight">
              {!depositedVal ? '--' : `$${addComma(availableCredit)} / $${addComma(maxCredit)}`}
            </em>
          </div>
          <div className="extrax-account-info-detail-item extrax-account-info-safety">
            <b>Safety Factor</b>
            <em className="text-highlight">{!depositedVal ? '--' : safetyRatio}</em>
          </div>
        </div>
      </div>
    </div>
  )
}

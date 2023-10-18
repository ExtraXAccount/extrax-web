import './index.scss'

import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useWagmiCtx } from '@/components/WagmiContext'
import useCredit from '@/hooks/useCredit'
import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
import { addComma, toPrecision } from '@/utils/math'

export default function AccountInfo() {
  const navigate = useNavigate()
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()
  const { maxCredit, availableCredit } = useCredit()

  const { account } = useWagmiCtx()

  const safetyRatio = useMemo(() => {
    return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const accountAPY = useMemo(() => {
    const apy = 0.1321
    return addComma(apy * 100) + '%'
  }, [])

  const handleAddDeposit = useCallback(() => {
    navigate('/lend')
  }, [navigate])

  return (
    <div className="extrax-account-info">
      <div className="extrax-account-info-inner">
        <div className="extrax-account-info-main">
          <p className="extrax-account-info-main-account">
            <b>Account: </b>
            <em>{`${account.slice(0, 6)}...${account.slice(-4)}`}</em>
          </p>
          <p className="extrax-account-info-main-splitter"> | </p>
          <p className="extrax-account-info-main-apy">
            <b>Portfolio APY: </b>
            <em className="text-highlight">{accountAPY}</em>
          </p>
        </div>
        <div className="extrax-account-info-detail">
          <div className="extrax-account-info-deposited">
            <b>Deposited: </b>
            <em className="text-highlight">${addComma(depositedVal)}</em>
            <button className="btn-base btn-base-mini" onClick={handleAddDeposit}>
              <b>+</b>
            </button>
          </div>
          <div className="extrax-account-info-credit">
            <b>Leverage Credit: </b>
            <em className="text-highlight">
              ${addComma(debtVal)} / ${addComma(maxCredit)}
            </em>
          </div>
          <div className="extrax-account-info-safety">
            <b>Safety Factor: </b>
            <em className="text-highlight">{toPrecision(safetyRatio * 100)}%</em>
          </div>
        </div>
      </div>
    </div>
  )
}

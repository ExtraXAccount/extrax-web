import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useMemo } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'

import { useWagmiCtx } from '@/components/WagmiContext'
import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
import { addComma, toPrecision } from '@/utils/math'

export default function AccountInfo() {
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()

  const { account } = useWagmiCtx()

  const safetyRatio = useMemo(() => {
    return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const maxDebt = useMemo(() => {
    return depositedVal * 5
  }, [depositedVal])

  const accountAPY = useMemo(() => {
    const apy = 0.1321
    return addComma(apy * 100) + '%'
  }, [])

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
            <button className="btn-base btn-base-mini">
              <b>+</b>
            </button>
          </div>
          <div className="extrax-account-info-credit">
            <b>Leverage Credit: </b>
            <em className="text-highlight">
              ${addComma(debtVal)} / ${addComma(maxDebt)}
            </em>
          </div>
          <div className="extrax-account-info-safety">
            <b>Safety: </b>
            <em className="text-highlight">{toPrecision(safetyRatio * 100)}%</em>
          </div>
        </div>
      </div>
    </div>
  )
}

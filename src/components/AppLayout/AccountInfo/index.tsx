import './index.scss'

// import { Tooltip } from 'antd'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import AccountDepositDialog from '@/components/AccountDepositDialog'
import useSmartAccount from '@/hooks/useSmartAccount'
import PercentCircle from '@/pages/Lend/PercentCircle'
import { formatNumberByUnit, toPrecision, toPrecisionNum } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

export default function AccountInfo() {
  const {
    healthStatus,
    LTV,
    netWorth,
    healthFactor,
    leverage,
    currentAccount,
    depositedVal,
    debtVal,
    maxCredit,
    usedCredit,
    accountApy,
    accounts,
  } = useSmartAccount()

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    console.log('healthStatus :>> ', healthStatus, healthFactor)
  }, [healthStatus, healthFactor])

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  const onCopy = useCallback(() => {
    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

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
            <div className="flex ai-ct">
              <div className="extrax-account-info-market">
                <span>Main Market</span>
              </div>
              <div className="extrax-account-info-main-account">
                <span>Current Account: </span>
                <em>
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  <CopyToClipboard text={currentAccount} onCopy={onCopy}>
                    <span
                      className={cx('copy-hint', {
                        'color-safe': copied,
                      })}
                    >
                      <i className="iconfont icon-copy"></i>
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </CopyToClipboard>
                </em>
              </div>
            </div>

            {/* <p className="extrax-account-info-main-splitter"> | </p>
            <p className="extrax-account-info-main-apy">
              <b>Portfolio APY: </b>
              <em className="text-highlight">
                {!depositedVal ? '--' : toPrecision(accountApy * 100) + '%'}
              </em>
            </p> */}
            <div className="flex ai-ct jc-sb">
              <div className="extrax-account-info-apr-lv">
                <span>Portfolio APR: </span>
                <em
                  className={cx('', {
                    'color-safe': !!accountApy && accountApy > 0,
                    'color-danger': !!accountApy && accountApy < 0,
                  })}
                >
                  {!accountApy ? '--' : toPrecision(accountApy * 100) + '%'}
                </em>

                <span style={{ marginLeft: 20 }}>Account Leverage: </span>
                <em
                  className={cx('', {
                    // 'color-safe': !!accountApy && accountApy > 0,
                    // 'color-danger': !!accountApy && accountApy < 0,
                  })}
                >
                  {!leverage ? '--' : toPrecision(leverage) + 'x'}
                </em>
              </div>
              <button className="btn-base" onClick={handleAddDeposit}>
                Supply
              </button>
            </div>
          </div>
          <div className="extrax-account-info-detail">
            <div className="extrax-account-info-detail-item extrax-account-info-deposited">
              <span>Net Worth</span>
              <em className="">${toPrecision(netWorth).toLocaleString()}</em>
              <span>
                Deposited: ${formatNumberByUnit(depositedVal)} | Borrowed: $
                {formatNumberByUnit(debtVal)}
              </span>
            </div>

            <div className="extrax-account-info-detail-item extrax-account-info-health">
              <div className="extrax-account-info-health-factor">
                <span>Health Factor</span>
                <em>{!depositedVal ? '--' : toPrecision(healthFactor)}</em>
                <span
                  className={cx('extrax-account-info-health-judge', {
                    'color-safe': healthFactor >= 2,
                    'color-warn': healthFactor < 2 && healthFactor >= 1.5,
                    'color-danger': healthFactor < 1.5,
                  })}
                >
                  {'Conservative'}
                </span>
              </div>
              <div className="ltv-wrapper">
                <span className="ltv-wrapper-label">LTV</span>
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
                  <span>Liq: {`${toPrecision(LTV.liquidation * 100)}%`}</span>
                </p>
              </div>
            </div>

            <div className="extrax-account-info-detail-item extrax-account-info-credit flex jc-sb ai-ct">
              <div>
                <span>Borrowing Power</span>
                <div
                  className="flex ai-ct gap-10"
                  style={{ margin: '10px 0', fontSize: 20 }}
                >
                  <em className="">
                    {!depositedVal
                      ? '--'
                      : `$${toPrecisionNum(Number(usedCredit)).toLocaleString()}`}
                  </em>
                  <span className="tag-percent">
                    {toPrecision(div(String(usedCredit), maxCredit).toNumber() * 100)}%
                  </span>
                </div>
                <span>Debt Limit: ${toPrecision(Number(maxCredit))}</span>
              </div>
              <PercentCircle
                radix={32}
                percent={div(String(usedCredit), maxCredit).toNumber()}
                strokeWidth={6}
                strokeColor={'#5767BE'}
                bgColor="#78788029"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

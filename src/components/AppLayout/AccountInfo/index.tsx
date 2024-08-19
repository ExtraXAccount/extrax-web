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

export default function AccountInfo(props: { portfolioMode?: boolean }) {
  const { portfolioMode } = props
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
                  <i className="iconfont icon-copy"></i>
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
            {portfolioMode && (
              <div className="flex ai-ct jc-sb">
                <div className="extrax-account-info-portfoliomode-infos">
                  <section>
                    <span className="text-sm-2">Total Supply:</span>
                    <b>${formatNumberByUnit(depositedVal)}</b>
                  </section>
                  <section>
                    <span className="text-sm-2">Total Borrow:</span>
                    <b>${formatNumberByUnit(debtVal)}</b>
                  </section>
                  <section>
                    <span className="text-sm-2">Networth:</span>
                    <b>${formatNumberByUnit(netWorth)}</b>
                  </section>
                </div>
              </div>
            )}

            {/* <p className="extrax-account-info-main-splitter"> | </p>
            <p className="extrax-account-info-main-apy">
              <b>Portfolio APY: </b>
              <em className="text-highlight">
                {!depositedVal ? '--' : toPrecision(accountApy * 100) + '%'}
              </em>
            </p> */}
            {!portfolioMode && (
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

                  {/* <span style={{ marginLeft: 20 }}>Account Leverage: </span>
                <em className={cx('', {})}>
                  {!leverage ? '--' : toPrecision(leverage) + 'x'}
                </em> */}
                </div>
                <button
                  className="btn-base extrax-account-info-apr-supply-btn"
                  onClick={handleAddDeposit}
                >
                  Supply
                </button>
              </div>
            )}
          </div>
          <div className="extrax-account-info-detail">
            <div className="extrax-account-info-detail-item extrax-account-info-deposited">
              <section className="extrax-account-info-deposited-info">
                <span>Net Worth</span>
                <em className="">${toPrecision(netWorth).toLocaleString()}</em>
                <span>
                  Deposited: ${formatNumberByUnit(depositedVal)} | Borrowed: $
                  {formatNumberByUnit(debtVal)}
                </span>
              </section>
              <section className="extrax-account-info-deposited-graph">
                <div className="extrax-account-info-deposited-graph-wrap"></div>
              </section>
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
                {!(LTV.max === 0) && (
                  <div className="ltv-wrapper-content">
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-current"
                      style={{ width: `${LTV.current * 100}%` }}
                    >
                      <span>
                        Current: <b>{`${toPrecision(LTV.current * 100)}%`}</b>
                      </span>
                    </p>
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-max"
                      style={{ width: `${(LTV.max - LTV.current) * 100}%` }}
                    >
                      <span>MAX {`${toPrecision(LTV.max * 100)}%`}</span>
                    </p>
                    <p
                      className="ltv-wrapper-item ltv-wrapper-item-liquidation"
                      style={{
                        width: `${(LTV.liquidation - LTV.max) * 100}%`,
                      }}
                    >
                      <span>
                        Liquidation Threshold: {`${toPrecision(LTV.liquidation * 100)}%`}
                      </span>
                    </p>
                  </div>
                )}
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
                </div>
                <span>Total: ${toPrecision(Number(maxCredit))}</span>
              </div>
              <PercentCircle
                radix={32}
                percent={div(String(usedCredit), maxCredit).toNumber()}
                strokeWidth={6}
                strokeColor={'#7A87FF'}
                bgColor="#78788029"
              />
              <div className="extrax-account-info-credit-percent">
                <div className="extrax-account-info-credit-percent-item used">
                  <p>Used</p>
                  <span>
                    {toPrecision(div(String(usedCredit), maxCredit).toNumber() * 100)}%
                  </span>
                </div>
                <div className="extrax-account-info-credit-percent-item available">
                  <p>Available</p>
                  <span>
                    {toPrecision(
                      (1 - div(String(usedCredit), maxCredit).toNumber()) * 100,
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

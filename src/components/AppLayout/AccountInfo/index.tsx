import './index.scss'

import cx from 'classnames'
import { useCallback, useMemo, useState } from 'react'

import AccountDepositDialog from '@/components/AccountDepositDialog'
import FormattedNumber from '@/components/FormattedNumber'
import useSmartAccount from '@/hooks/useSmartAccount'
import PercentCircle from '@/pages/Lend/PercentCircle'
import { formatNumberByUnit, toPrecision } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

import AccountHeader from './AccountHeader'
import { getHealthFactorInfo } from './healthFactorFn'

export default function AccountInfo(props: { portfolioMode?: boolean }) {
  const { portfolioMode } = props
  const {
    LTV,
    netWorth,
    healthFactor,
    depositedVal,
    debtVal,
    maxCredit,
    usedCredit,
    availableCredit,
  } = useSmartAccount()

  console.log('maxCredit :>> ', div(availableCredit, maxCredit).toNumber(), {
    availableCredit,
    usedCredit,
    maxCredit
  });

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  const healthFactorInfo = useMemo(() => {
    return getHealthFactorInfo(healthFactor)
  }, [healthFactor])

  return (
    <div className='extrax-account-info'>
      <AccountDepositDialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      ></AccountDepositDialog>

      <div className='extrax-account-info-inner'>
        <AccountHeader portfolioMode={portfolioMode} handleAddDeposit={handleAddDeposit} />
        {
          !depositedVal ?
          <div className='extrax-account-create-button'>
            <p className='btn-base' onClick={handleAddDeposit}>
              Supply to Start
            </p>
            <span className='text-sm-2' style={{ marginTop: 8 }}>
              to start earning / leveraging (An On-chain smart account will be created)
            </span>
          </div>
          :
          <div className='extrax-account-info-detail'>
            <div className='extrax-account-info-detail-item extrax-account-info-deposited'>
              <section className='extrax-account-info-deposited-info'>
                <span>Net Worth</span>
                <em className=''>${toPrecision(netWorth).toLocaleString()}</em>
                <span>
                  Deposited: ${formatNumberByUnit(depositedVal)} | Borrowed: $
                  {formatNumberByUnit(debtVal)}
                </span>
              </section>
              <section className='extrax-account-info-deposited-graph'>
                <div className='extrax-account-info-deposited-graph-wrap'></div>
              </section>
            </div>

            <div className='extrax-account-info-detail-item extrax-account-info-health'>
              <div className='extrax-account-info-health-factor'>
                <span>Health Factor</span>
                <em>{!depositedVal ? '--' : toPrecision(healthFactor)}</em>
                <span
                  className={cx('extrax-account-info-health-judge', `color-${healthFactorInfo.type}`)}
                >
                  {healthFactorInfo.label}
                </span>
              </div>
              <div className='ltv-wrapper'>
                <span className='ltv-wrapper-label'>LTV</span>
                {!(LTV.max === 0) && (
                  <div className='ltv-wrapper-content'>
                    <p
                      className='ltv-wrapper-item ltv-wrapper-item-current'
                      style={{ width: `${LTV.current * 100}%` }}
                    >
                      <span>
                        Current: <b>{`${toPrecision(LTV.current * 100)}%`}</b>
                      </span>
                    </p>
                    <p
                      className='ltv-wrapper-item ltv-wrapper-item-max'
                      style={{ width: `${(LTV.max - LTV.current) * 100}%` }}
                    >
                      <span>MAX {`${toPrecision(LTV.max * 100)}%`}</span>
                    </p>
                    <p
                      className='ltv-wrapper-item ltv-wrapper-item-liquidation'
                      style={{
                        width: `${(LTV.liquidation - LTV.max) * 100}%`,
                      }}
                    >
                      <span>Liquidation Threshold: {`${toPrecision(LTV.liquidation * 100)}%`}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className='extrax-account-info-detail-item extrax-account-info-credit flex jc-sb ai-ct'>
              <div>
                <span>Borrowing Power</span>
                <div className='flex ai-ct gap-10' style={{ margin: '10px 0', fontSize: 20 }}>
                  <em className=''>
                    {!depositedVal
                      ? '--'
                      : <FormattedNumber symbol='$' value={availableCredit} />}
                  </em>
                </div>
                <span>Total: ${toPrecision(Number(maxCredit))}</span>
              </div>
              <PercentCircle
                radix={32}
                percent={div(availableCredit, maxCredit).toNumber()}
                strokeWidth={6}
                strokeColor={'#7A87FF'}
                bgColor='#78788029'
              />
              <div className='extrax-account-info-credit-percent'>
                <div className='extrax-account-info-credit-percent-item used'>
                  <p>Available</p>
                  <span>{toPrecision(div(availableCredit, maxCredit).toNumber() * 100)}%</span>
                </div>
                {/* <div className='extrax-account-info-credit-percent-item available'>
                  <p>Available</p>
                  <span>
                    {toPrecision((1 - div(String(usedCredit), maxCredit).toNumber()) * 100)}%
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

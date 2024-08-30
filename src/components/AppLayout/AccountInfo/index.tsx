import './index.scss'

import { Dropdown } from 'antd'
// import { Tooltip } from 'antd'
import cx from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import AccountDepositDialog from '@/components/AccountDepositDialog'
import AddressWithCopy from '@/components/AddressWithCopy'
import CreateAccountButton from '@/components/CreateAccountButton'
import { useWagmiCtx } from '@/components/WagmiContext'
import useSmartAccount from '@/hooks/useSmartAccount'
import PercentCircle from '@/pages/Lend/PercentCircle'
import { createAccount } from '@/sdk-ethers'
import { deposit, depositETH, depositWithAccount } from '@/sdk-ethers/extra-x-lending'
import { getLendingUserState } from '@/sdk-ethers/extra-x-lending/state'
import { useAccountStore } from '@/store'
import { formatNumberByUnit, toPrecision, toPrecisionNum } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

export default function AccountInfo(props: { portfolioMode?: boolean }) {
  const { portfolioMode } = props
  const { updateCurrentAccount } = useAccountStore()
  const {
    formattedUserPosition,
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
  const { chainId, signer, account, walletClient } = useWagmiCtx()

  const [name, setName] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    console.log('healthStatus :>> ', healthStatus, healthFactor)
  }, [healthStatus, healthFactor])

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)

  const handleAddDeposit = useCallback(() => {
    setDepositDialogOpen(true)
  }, [])

  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)
  const accountName = name || nameList[currentAccount?.toLowerCase()] || ''

  return (
    <div className='extrax-account-info'>
      <AccountDepositDialog
        accounts={accounts}
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
      ></AccountDepositDialog>

      {!depositedVal ? (
        <div className='extrax-account-info-inner extrax-account-creator'>
          <div className='extrax-account-create-button'>
            <p className='btn-base' onClick={handleAddDeposit}>
              Supply to Start
            </p>
            <span className='text-sm-2' style={{ marginTop: 8 }}>
              to start earning / leveraging (An On-chain smart account will be created)
            </span>
          </div>
        </div>
      ) : (
        <div className='extrax-account-info-inner'>
          <div className='extrax-account-info-main'>
            <div className='flex ai-ct jc-sb'>
              <div className='extrax-account-info-market'>
                <span>Main Market</span>
              </div>
              <div className='extrax-account-info-main-account'>
                <span>Current Account: </span>
                <AddressWithCopy address={currentAccount} />
                <section className='extrax-account-info-edit'>
                  {!!accountName && !isEdit && <p>({accountName})</p>}
                  {!isEdit && (
                    <i
                      className='iconfont icon-edit'
                      onClick={() => {
                        setIsEdit(true)
                        setName(accountName)
                      }}
                    ></i>
                  )}
                  {isEdit && (
                    <>
                      <input
                        className='extrax-account-info-edit-input'
                        type='text'
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                        placeholder='Add a name'
                      />
                      <i
                        className='iconfont icon-check'
                        onClick={() => {
                          console.log(name)
                          nameList[currentAccount?.toLowerCase()] = name
                          localStorage.setItem('extrax-account-name', JSON.stringify(nameList))
                          setIsEdit(false)
                        }}
                      ></i>
                    </>
                  )}
                </section>
                <Dropdown
                  overlayClassName='account-list-overlay'
                  trigger={['click']}
                  placement='bottomRight'
                  menu={{
                    items: [...accounts, account!]
                      .map((item, index) => ({
                        key: item,
                        label: (
                          <div
                            className='account-list-item flex jc-sb'
                            onClick={(e) => {
                              updateCurrentAccount(item)
                              e.stopPropagation()
                            }}
                          >
                            <span>{item === account ? 'EOA' : `Account${index + 1}`}</span>
                            <AddressWithCopy address={item} />
                          </div>
                        ),
                      }))
                      .concat([
                        {
                          key: '0x',
                          label: (
                            <div
                              className='account-list-item account-list-item-create'
                              onClick={(e) => {
                                e.stopPropagation()
                              }}
                            >
                              <CreateAccountButton label={'+ Create New Account'} />
                            </div>
                          ),
                        },
                      ]),
                  }}
                >
                  <div className='extrax-account-info-menu'>
                    <i className='iconfont icon-menu'></i>
                  </div>
                </Dropdown>
              </div>
            </div>
            {portfolioMode && (
              <div className='flex ai-ct jc-sb'>
                <div className='extrax-account-info-portfoliomode-infos'>
                  <section>
                    <span className='text-sm-2'>Total Supply:</span>
                    <b>${formatNumberByUnit(depositedVal)}</b>
                  </section>
                  <section>
                    <span className='text-sm-2'>Total Borrow:</span>
                    <b>${formatNumberByUnit(debtVal)}</b>
                  </section>
                  <section>
                    <span className='text-sm-2'>Networth:</span>
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
              <div className='flex ai-ct jc-sb'>
                <div className='extrax-account-info-apr-lv'>
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
                  className='btn-base extrax-account-info-apr-supply-btn'
                  onClick={handleAddDeposit}
                >
                  Supply
                </button>
              </div>
            )}
          </div>
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
                  className={cx('extrax-account-info-health-judge', {
                    'color-safe': healthFactor >= 2,
                    'color-warn': healthFactor < 2 && healthFactor >= 1.5,
                    'color-danger': healthFactor < 1.5,
                  })}
                >
                  {'Conservative'}
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
                bgColor='#78788029'
              />
              <div className='extrax-account-info-credit-percent'>
                <div className='extrax-account-info-credit-percent-item used'>
                  <p>Used</p>
                  <span>{toPrecision(div(String(usedCredit), maxCredit).toNumber() * 100)}%</span>
                </div>
                <div className='extrax-account-info-credit-percent-item available'>
                  <p>Available</p>
                  <span>
                    {toPrecision((1 - div(String(usedCredit), maxCredit).toNumber()) * 100)}%
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

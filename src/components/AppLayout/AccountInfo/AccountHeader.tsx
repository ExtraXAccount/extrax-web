import { Dropdown } from 'antd'
import cx from 'classnames'
import { useState } from 'react'

import AddressWithCopy from '@/components/AddressWithCopy'
import CreateAccountButton from '@/components/CreateAccountButton'
import FormattedNumber from '@/components/FormattedNumber'
import { useWagmiCtx } from '@/components/WagmiContext'
import useSmartAccount from '@/hooks/useSmartAccount'
import { useAccountStore } from '@/store'
import { formatNumberByUnit } from '@/utils/math'

export default function AccountHeader({ portfolioMode, handleAddDeposit }: { portfolioMode?: boolean, handleAddDeposit: () => void }) {
  const { updateCurrentAccount } = useAccountStore()
  const {
    netWorth,
    currentAccount,
    depositedVal,
    debtVal,
    accountApy,
    accounts,
  } = useSmartAccount()
  const { account } = useWagmiCtx()

  const [name, setName] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)
  const accountName = name || nameList[currentAccount?.toLowerCase()] || ''

  if (!account) {
    return null
  }

  return (
    <div className='extrax-account-info-main'>
      <div className='flex ai-ct jc-sb'>
        <div className='extrax-account-info-market'>
          <span>Main Market</span>
        </div>
        <div className='extrax-account-info-main-account'>
          <span>Current: </span>
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
              items: [...accounts, account]
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
      {!!depositedVal && portfolioMode && (
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
      {!!depositedVal && !portfolioMode && (
        <div className='flex ai-ct jc-sb'>
          <div className='extrax-account-info-apr-lv'>
            <span>Portfolio APR: </span>
            <em
              className={cx('', {
                'color-safe': !!accountApy && accountApy > 0,
                'color-danger': !!accountApy && accountApy < 0,
              })}
            >
              {!accountApy ? '--' : <FormattedNumber precision={2} value={accountApy} percent />}
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
  )
}

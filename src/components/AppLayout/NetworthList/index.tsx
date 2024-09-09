import './index.scss'

import classNames from 'classnames'
import { useMemo } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import { useAccountStore } from '@/store'
import { formatNumberByUnit } from '@/utils/math'

export default function NetworthList() {
  const { currentAccount, accounts, netWorth, isSmartAccount } = useSmartAccount()
  const { updateAccountLayer } = useAccountStore()
  console.log(accounts)
  const data = useMemo(() => {
  }, [])
  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)
  return (
    <div className='networth-list-wrap'>
    <div className='networth-list'>
      <h2>Account Networth</h2>
      <section className='networth-list-main'>
        <div className='networth-list-main-item'>
          <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
            <p>Total Networth</p>
            <p>${formatNumberByUnit(netWorth)}</p>
          </div>
        </div>
        <div className='networth-list-main-item-sub'>
          <div className={classNames('networth-list-main-item', {
            active: !isSmartAccount
          })}>
            <i className='networth-list-main-item-line'></i>
            <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
              <p>EOA Mode</p>
              <p>${formatNumberByUnit(netWorth)}</p>
            </div>
          </div>
          <div className='networth-list-main-item last'>
            <i className='networth-list-main-item-line'></i>
            <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
              <p>Smart Account</p>
              <p>$0</p>
            </div>
          </div>
          <div className='networth-list-main-item-sub'>
            {
              accounts.map((i, index) => {
                const accountName = nameList[currentAccount?.toLowerCase()] || `Account ${index}`
                return (
                  <div className={classNames('networth-list-main-item', {
                    last: index === accounts.length - 1,
                    active: currentAccount?.toLowerCase() === i?.toLowerCase()
                  })} key={index}>
                    <i className='networth-list-main-item-line'></i>
                    <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
                      <p>{accountName}</p>
                      <p>$0</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <section className='networth-list-btn'>
        <button className='btn-base' onClick={() => {
          updateAccountLayer(true)
        }}>Manage Account</button>
      </section>
    </div>
    </div>
  )
}
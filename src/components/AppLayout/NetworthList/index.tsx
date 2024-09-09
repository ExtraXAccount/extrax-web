import './index.scss'

import classNames from 'classnames'
import { useMemo } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import { useAccountStore } from '@/store'
import { formatNumberByUnit } from '@/utils/math'

export default function NetworthList() {
  const { currentAccount, accounts, netWorth } = useSmartAccount()
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
          <p>Total Networth</p>
          <p>${formatNumberByUnit(netWorth)}</p>
        </div>
        <div className='networth-list-main-item-sub'>
          <div className='networth-list-main-item'>
            <p>EOA Mode</p>
            <p>${formatNumberByUnit(netWorth)}</p>
          </div>
          <div className='networth-list-main-item last'>
            <p>Smart Account</p>
            <p>$0</p>
          </div>
          <div className='networth-list-main-item-sub'>
            {
              accounts.map((i, index) => {
                const accountName = nameList[currentAccount?.toLowerCase()] || `Account ${index}`
                return (
                  <div className={classNames('networth-list-main-item', {
                    last: index === accounts.length - 1
                  })} key={index}>
                    <p>{accountName}</p>
                    <p>$0</p>
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
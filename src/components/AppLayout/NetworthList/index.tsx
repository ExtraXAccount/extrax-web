import './index.scss'

import classNames from 'classnames'

import FormattedNumber from '@/components/FormattedNumber'
import useNetworthInfo from '@/hooks/useNetworthInfo'
import useSmartAccount from '@/hooks/useSmartAccount'
import { useAccountStore } from '@/store'

export default function NetworthList() {
  const { currentAccount, accounts, netWorth, isSmartAccount, formattedUserPositionMap } = useSmartAccount()
  const { updateAccountLayer, updateCurrentAccount } = useAccountStore()
  const { totalNetworth, eoaNetworth, smartNetworth, eoaAccount} = useNetworthInfo()
  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)
  return (
    <div className='networth-list-wrap'>
    <div className='networth-list'>
      <h2>Account Networth</h2>
      <section className='networth-list-main'>
        <div className='networth-list-main-item'>
          <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
            <p>Total Networth</p>
            <p><FormattedNumber value={totalNetworth} symbol={`$`} /></p>
          </div>
        </div>
        <div className='networth-list-main-item-sub'>
          <div className={classNames('networth-list-main-item', {
            active: !isSmartAccount
          })}>
            <i className='networth-list-main-item-line'></i>
            <div className='networth-list-main-item-inner flex jc-sb ai-ct' onClick={() => {
              updateCurrentAccount(eoaAccount)
            }}>
              <p>EOA Mode</p>
              <p><FormattedNumber value={eoaNetworth} symbol={`$`} /></p>
            </div>
          </div>
          <div className='networth-list-main-item last'>
            <i className='networth-list-main-item-line'></i>
            <div className='networth-list-main-item-inner flex jc-sb ai-ct'>
              <p>Smart Account</p>
              <p><FormattedNumber value={smartNetworth} symbol={`$`} /></p>
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
                    <div className='networth-list-main-item-inner flex jc-sb ai-ct' onClick={() => {
                      updateCurrentAccount(i)
                    }}>
                      <p>{accountName}</p>
                      <p><FormattedNumber value={formattedUserPositionMap? formattedUserPositionMap[i]?.netWorthUSD : '0'} symbol={`$`} /></p>
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
import { useAccountStore } from '@/store'
import cx from 'classnames'
import './index.scss'

import { createPortal } from 'react-dom'
import { Drawer } from 'antd'
import AccountCard from './AccountCard'
import useSmartAccount from '@/hooks/useSmartAccount'
import AccountTxHistory from './AccountTxHistory'

export default function AccountLayer() {
  const { showAccountLayer, updateAccountLayer } = useAccountStore()
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

  console.log(accounts)

  return (
    <Drawer title={'Credit Accounts'} open={showAccountLayer} onClose={() => {
      updateAccountLayer(false)
    }}
    styles={{
      wrapper: {
        width: 528
      },
      content: {
        width: 528
      }
    }}
    >
      <div className='account-layer-list'>
        {accounts.map((account, index) => {
          return (
            <div className='account-layer-item'>
              <div className='account-layer-item-title flex ai-ct gap-8'>
                Account{index}
                <div className='btn-base btn-base-primary'>{account?.slice(0, 6)}....{account?.slice(-4)}</div>
              </div>
              <div className='account-layer-item-cardwrap'>
                <AccountCard address={account} netWorth={netWorth} supplyValue={depositedVal} borrowValue={debtVal} />
              </div>  
              <div className='account-layer-item-history'>
                <AccountTxHistory list={
                  [
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0b',
                      action: 'Deposit to',
                      time: 1722834776
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0c',
                      action: 'Deposit to',
                      time: 1722834770
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0d',
                      action: 'Deposit to',
                      time: 1722123456
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0e',
                      action: 'Deposit to',
                      time: 1722023456
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0f',
                      action: 'Deposit to',
                      time: 1721123456
                    }
                  ]
                } />
              </div>
            </div>
            
          )
        })}
      </div>
      
    </Drawer>
  )
}
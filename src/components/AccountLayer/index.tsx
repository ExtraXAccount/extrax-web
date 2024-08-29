import './index.scss'

import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

import useSmartAccount from '@/hooks/useSmartAccount'
import { createAccount, getAccounts } from '@/sdk-ethers'
import { useAccountStore } from '@/store'

import { useWagmiCtx } from '../WagmiContext'
import AccountCard from './AccountCard'
import AccountTxHistory from './AccountTxHistory'

export default function AccountLayer() {
  const [loading, setLoading] = useState({ writing: false, desc: '' })
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
    fetchAccounts,
    accounts,
  } = useSmartAccount()

  const [name, setName] = useState('')
  const [isEdit, setIsEdit] = useState(-1)
  const { signer, chainId } = useWagmiCtx()

  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)

  const handleCreate = useCallback(async () => {
    if (!signer) {
      return
    }
    try {
      setLoading({ writing: true, desc: 'Creating smart account' })
      await createAccount(signer, chainId)
      await fetchAccounts()
    } finally {
      setLoading({ writing: false, desc: '' })
    }
  }, [chainId, fetchAccounts, signer])

  return (
    <Drawer
      title={'Credit Accounts'}
      open={showAccountLayer}
      onClose={() => {
        updateAccountLayer(false)
      }}
      styles={{
        wrapper: {
          width: 528,
        },
        content: {
          width: 528,
        },
      }}
    >
      <div className='account-layer-list'>
        {accounts.length === 0 && (
          <Button
            loading={loading.writing}
            disabled={loading.writing}
            className={classNames('', {
              // 'btn-disable': loading.writing,
            })}
            onClick={handleCreate}
          >
            {loading.writing ? loading.desc : 'Create Smart Account'}
          </Button>
        )}
        {accounts.map((account, index) => {
          const accountName = nameList[account.toLocaleLowerCase()] || `Account${index}`
          return (
            <div className='account-layer-item' key={account}>
              <div className='account-layer-item-title flex ai-ct gap-8'>
                {accountName}
                <div className='btn-base btn-base-primary'>
                  {account?.slice(0, 6)}....{account?.slice(-4)}
                </div>
              </div>
              <div className='account-layer-item-cardwrap'>
                <AccountCard address={account} netWorth={netWorth} supplyValue={depositedVal} borrowValue={debtVal} />
              </div>
              <div className='account-layer-item-history'>
                <AccountTxHistory
                  list={[
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0b',
                      action: 'Deposit to',
                      time: 1722834776,
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0c',
                      action: 'Deposit to',
                      time: 1722834770,
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0d',
                      action: 'Deposit to',
                      time: 1722123456,
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0e',
                      action: 'Deposit to',
                      time: 1722023456,
                    },
                    {
                      asset: 'USDC.e',
                      txId: '0x3b4655e81c784f4cd8e4a484e63eb02e64c9dc1704a11ed7c658626c19467b0f',
                      action: 'Deposit to',
                      time: 1721123456,
                    },
                  ]}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Drawer>
  )
}

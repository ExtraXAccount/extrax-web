import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useState } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import { createAccount, getAccounts } from '@/sdk-ethers'

import { useWagmiCtx } from './WagmiContext'

export default function CreateAccountButton({ label = 'Create Smart Account' }) {
  const [loading, setLoading] = useState({ writing: false, desc: '' })
  const { signer, chainId } = useWagmiCtx()
  const { fetchAccounts } = useSmartAccount()

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
    <Button
      loading={loading.writing}
      disabled={loading.writing}
      className={classNames('', {
        // 'btn-disable': loading.writing,
      })}
      onClick={handleCreate}
    >
      {loading.writing ? loading.desc : label}
    </Button>
  )
}

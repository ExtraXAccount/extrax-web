import './index.scss'
import './lendingList.scss'

import { useEffect } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'

import LendingTable from './LendingTable'
import useLendingList from './useLendingList'

export default function Lend() {
  const {
    smartAccount,
    // accounts,
  } = useSmartAccount()
  const { fetchLendPools, fetchBalances } = useLendingList()
  useEffect(() => {
    fetchLendPools()
  }, [fetchLendPools])
  // }, [])

  useEffect(() => {
    fetchBalances([smartAccount])
    // }, [smartAccount, fetchBalances])
  }, [smartAccount])

  return (
    <div className="page-app page-lending">
      <div className="box">
        <h3 className="page-app-title">Lending Assets</h3>

        <LendingTable />
      </div>
    </div>
  )
}

import './index.scss'
import './lendingList.scss'

import { useEffect } from 'react'

// import useSmartAccount from '@/hooks/useSmartAccount'
import LendingTable from './LendingTable'
import useLendingList from './useLendingList'

export default function Lend() {
  const { fetchLendPools } = useLendingList()
  useEffect(() => {
    fetchLendPools()
  }, [fetchLendPools])

  return (
    <div className="page-app page-lending">
      <div className="box">
        <h3 className="page-app-title">Lending Assets</h3>

        <LendingTable />
      </div>
    </div>
  )
}

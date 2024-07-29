import './index.scss'
import './lendingList.scss'

// import { useEffect } from 'react'
import AccountInfo from '@/components/AppLayout/AccountInfo'

// import useSmartAccount from '@/hooks/useSmartAccount'
import LendingTable from './LendingTable'
// import useLendingList from './useLendingList'

export default function Lend() {
  // const { fetchLendPools } = useLendingList()
  // useEffect(() => {
  //   fetchLendPools()
  // }, [fetchLendPools])

  return (
    <div className="page-app page-lending">
      <div className="box">
        <AccountInfo />
      </div>
      <div className="box lending-list-box">
        <h3 className="page-app-title">Main Market</h3>

        <LendingTable />
      </div>
    </div>
  )
}

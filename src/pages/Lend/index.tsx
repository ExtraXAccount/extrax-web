import './index.scss'
import './lendingList.scss'

// import { useEffect } from 'react'
import AccountInfo from '@/components/AppLayout/AccountInfo'

import LendBanner from './LendBanner'
import LendInfo from './LendInfo'
// import useSmartAccount from '@/hooks/useSmartAccount'
import LendingTable from './LendingTable'
import MarketSwitch from './MarketSwitch'
import useLendingList from './useLendingList'

export default function Lend() {
  const { totalInfos } = useLendingList()
  // useEffect(() => {
  //   fetchLendPools()
  // }, [fetchLendPools])

  return (
    <div className="page-app page-lending">
      <div className="box">
        <AccountInfo />
      </div>
      <div className="box lending-list-box">
        <MarketSwitch />
        <LendBanner />
        <LendInfo
          totalAvailable={totalInfos.totalAvailable}
          totalBorrow={totalInfos.totalBorrowed}
          totalSize={totalInfos.totalSize}
          globalUtilization={totalInfos.globalUtilization}
          maxOutflow={totalInfos.maxOutflow}
        />
        <LendingTable />
      </div>
    </div>
  )
}

import './index.scss'
import './lendingList.scss'

// import { useEffect } from 'react'
import AccountInfo from '@/components/AppLayout/AccountInfo'
import QuickPosition from '@/components/QuickPosition'
import { useWagmiCtx } from '@/components/WagmiContext'

import LendBanner from './LendBanner'
import LendInfo from './LendInfo'
// import useSmartAccount from '@/hooks/useSmartAccount'
import LendingTable from './LendingTable'
import MarketSwitch from './MarketSwitch'
import useLendingList from './useLendingList'

export default function Lend() {
  const { totalInfos } = useLendingList()
  const { account } = useWagmiCtx()
  // useEffect(() => {
  //   fetchLendPools()
  // }, [fetchLendPools])

  return (
    <div className="page-app page-lending">
      {
        !!account &&
        <>
          <div className="box" style={{marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
            <AccountInfo />
          </div>
          <QuickPosition />
        </>
      }
      <div className="box lending-list-box">
        <MarketSwitch />
        <LendBanner />
        <LendInfo
          totalAvailable={totalInfos.totalAvailable}
          totalBorrow={totalInfos.totalBorrowed}
          totalSize={totalInfos.totalSize}
          globalUtilization={totalInfos.globalUtilization}
        />
        <LendingTable />
      </div>
    </div>
  )
}

import './index.scss'
import './lendingList.scss'

import useLendContract from '@/sdk/lend'

// import Contract from './Contract'
import LendingTable from './LendingTable'

export default function Lend() {
  const { lendList } = useLendContract()

  console.log('lendlist :>> ', lendList)

  return (
    <div className="page-app page-lending">
      <div className="box">
        <h3 className="page-app-title">Lending Assets</h3>

        <LendingTable />
      </div>
    </div>
  )
}

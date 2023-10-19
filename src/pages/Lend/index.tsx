import './index.scss'
import './lendingList.scss'

import LendingTable from './LendingTable'

export default function Lend() {
  return (
    <div className="page-app page-lending">
      <div className="box">
        <h3 className="page-app-title">Lending Assets</h3>

        <LendingTable />
      </div>
    </div>
  )
}

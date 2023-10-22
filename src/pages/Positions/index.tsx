import './index.scss'

import { useAppSelector } from '@/state'

import UniPositionTable from './UniPositionTable'

export default function Positions() {
  return (
    <div className="page-app page-positions">
      <div className="box">
        <h3 className="page-app-title">My Positions</h3>
        <UniPositionTable />
      </div>
    </div>
  )
}

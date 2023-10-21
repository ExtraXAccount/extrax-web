import './index.scss'

import { useAppSelector } from '@/state'

export default function Positions() {
  const positions = useAppSelector((state) => state.position.userPositions)
  return (
    <div className="page-app page-positions">
      <div className="box">
        <h3>My Positions</h3>
      </div>
    </div>
  )
}

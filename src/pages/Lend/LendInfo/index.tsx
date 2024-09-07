import './index.scss'

import { formatNumberByUnit, remain2Decimal } from '@/utils/math'

export default function LendInfo(props: {
  totalSize: number
  totalAvailable: number
  totalBorrow: number
  globalUtilization: number
}) {
  const { totalSize, totalAvailable, totalBorrow, globalUtilization } = props
  return (
    <div className="lend-info">
      <ul className="lend-info-list">
        <li>
          <div className='lend-info-item-text'>
            The TRUNK/USDC pool offers increased LTV to allow a leveraged position up to
            4x. Higher leverage comes at the cost of increased liquidation risk so proceed
            with caution.
          </div>
        </li>
        <li>
          <p>Total Market Size</p>
          <b>${formatNumberByUnit(totalSize)}</b>
        </li>
        <li>
          <p>Total Available</p>
          <b>${formatNumberByUnit(totalAvailable)}</b>
        </li>
        <li>
          <p>Total Borrows</p>
          <b>${formatNumberByUnit(totalBorrow)}</b>
        </li>
        <li>
          <p>Global Utilization</p>
          <b>{remain2Decimal(globalUtilization * 100)}%</b>
        </li>
      </ul>
    </div>
  )
}

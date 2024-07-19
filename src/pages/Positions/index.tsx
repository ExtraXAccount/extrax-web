import './index.scss'

import { remain2Decimal } from '@/utils/math'

import useFormatPositions from './hooks/useFormatPositions'
import UniPositionTable from './UniPositionTable'

export default function Positions() {
  const { assetPositions, debtPositions, totalAssetValue, totalDebtValue } =
    useFormatPositions()
  console.log(assetPositions, debtPositions)
  return (
    <div className="page-app page-positions">
      <div className="box">
        <h3 className="page-app-title">Main Market Balance</h3>
        <div className="page-positions-box">
          <div className="page-positions-wrap page-positions-wrap-safe">
            <section className="page-positions-wrap-title page-positions-wrap-title-safe flex ai-ct">
              <h4>
                <i></i>Asset
              </h4>
              <p>Total: ${remain2Decimal(totalAssetValue)}</p>
            </section>
            <UniPositionTable positions={assetPositions} />
          </div>
          <div className="page-positions-wrap  page-positions-wrap-danger">
            <section className="page-positions-wrap-title page-positions-wrap-title-danger flex ai-ct">
              <h4>
                <i></i>Debt
              </h4>
              <p>Total: ${remain2Decimal(totalDebtValue)}</p>
            </section>
            <UniPositionTable positions={debtPositions} />
          </div>
        </div>
      </div>
    </div>
  )
}

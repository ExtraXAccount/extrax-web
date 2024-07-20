import './index.scss'

import { remain2Decimal } from '@/utils/math'

import useFormatPositions from './hooks/useFormatPositions'
import PositionTable from './PositionTable'
import WithdrawDialog from '../Lend/WithdrawDialog'
import RepayDialog from '../Lend/RepayDialog'
import { useState } from 'react'
import { useLendStore } from '@/store'

export default function Positions() {
  const { assetPositions, debtPositions, totalAssetValue, totalDebtValue } =
    useFormatPositions()
  const { currentPosition, currentDialogShow, updateDialogShow } = useLendStore()
  return (
    <div className="page-app page-positions">
      <WithdrawDialog
        open={currentDialogShow === 'withdraw'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></WithdrawDialog>
      <RepayDialog
        open={currentDialogShow === 'repay'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></RepayDialog>
  
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
            <PositionTable positions={assetPositions} />
          </div>
          <div className="page-positions-wrap  page-positions-wrap-danger">
            <section className="page-positions-wrap-title page-positions-wrap-title-danger flex ai-ct">
              <h4>
                <i></i>Debt
              </h4>
              <p>Total: ${remain2Decimal(totalDebtValue)}</p>
            </section>
            <PositionTable positions={debtPositions} />
          </div>
        </div>
      </div>
    </div>
  )
}

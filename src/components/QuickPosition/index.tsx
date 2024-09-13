import './index.scss'

import classNames from 'classnames'
import { useState } from 'react'

import RepayDialog from '@/pages/Lend/RepayDialog'
import WithdrawDialog from '@/pages/Lend/WithdrawDialog'
import useFormatPositions from '@/pages/Positions/hooks/useFormatPositions'
import PositionTable from '@/pages/Positions/PositionTable'
import { useLendStore } from '@/store'

export default function QuickPosition() {
  const [expand, setExpand] = useState(false)
  const { assetPositions, debtPositions, totalAssetValue, totalDebtValue } = useFormatPositions()
  const { currentPosition, currentDialogShow, updateDialogShow } = useLendStore()
  return (!!assetPositions.length || !!debtPositions.length) && (
    <div className={classNames('quick-position', {
      'quick-position-expand': expand
    })}>
      <button className='quick-position-btn' onClick={() => {
        setExpand(!expand)
      }}>
        <i />
        Quick Position
      </button>
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
      {
        expand &&
        <section className='quick-position-list flex'>
          <div className='quick-position-list-wrap'>
            <h4>Asset</h4>
            <PositionTable positions={assetPositions} lite />
          </div>
          <div className='quick-position-list-wrap'>
            <h4>Debt</h4>
            <PositionTable positions={debtPositions} lite />
          </div>
        </section>
      }
    </div>
  )
}
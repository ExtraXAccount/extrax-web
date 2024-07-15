import './index.scss'

import { useCallback } from 'react'

import useLendContract from '@/sdk/lend-deprecated'
import { useAppDispatch, useAppSelector } from '@/state'
import { setShowDSL } from '@/state/dsl/reducer'

import Dialog from '../Dialog'
import Loading from '../Loading'
import IntentDSL from './IntentDSL'
import IntentPanel from './IntentPanel'

export default function IntentView() {
  const showDSL = useAppSelector((state) => state.dsl.showDSL)
  const dispatch = useAppDispatch()

  const { depositAndStake, writeLoading } = useLendContract()

  const handleExecute = useCallback(() => {
    if (writeLoading) return
    depositAndStake('2', '4839')
  }, [depositAndStake, writeLoading])

  return (
    <Dialog
      className="intent-view-dialog"
      open={showDSL}
      onClose={() => {
        dispatch(setShowDSL(false))
      }}
    >
      <div className="intent-view">
        <div className="intent-view-panel">
          <IntentPanel />
        </div>
        <div className="intent-view-dsl">
          <IntentDSL />
          <div className="intent-confirm-button" onClick={handleExecute}>
            <div className="intent-confirm-button-bg"></div>
            <p className="flex gap-10">
              {writeLoading && <Loading />}
              {writeLoading ? 'Executing' : 'Execute'}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

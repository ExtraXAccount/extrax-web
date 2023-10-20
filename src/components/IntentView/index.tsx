import './index.scss'

import { useAppDispatch, useAppSelector } from '@/state'
import { setShowDSL } from '@/state/dsl/reducer'

import Dialog from '../Dialog'
import IntentDSL from './IntentDSL'
import IntentPanel from './IntentPanel'

export default function IntentView() {
  const showDSL = useAppSelector((state) => state.dsl.showDSL)
  const dispatch = useAppDispatch()
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
          <div className="intent-confirm-button">
            <div className="intent-confirm-button-bg"></div>
            <p>Execute</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

import './index.scss'

import IntentDSL from './IntentDSL'
import IntentPanel from './IntentPanel'

export default function IntentView() {
  return (
    <>
      <div className="intent-view">
        <IntentPanel />
        <IntentDSL />
      </div>
      <div className="intent-confirm-button">
        <div className="intent-confirm-button-bg"></div>
        <p>Execute</p>
      </div>
    </>
  )
}

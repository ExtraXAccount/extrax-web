import './index.scss'

import IntentDSL from './IntentDSL'
import IntentPanel from './IntentPanel'

export default function IntentView() {
  return (
    <div className="intent-view">
      <IntentPanel />
      <IntentDSL />
    </div>
  )
}

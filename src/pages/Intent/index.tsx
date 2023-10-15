import './index.scss'

import { useState } from 'react'

import IntentView from '@/components/IntentView'

export default function Intent() {
  const [intentList, setIntentState] = useState([])

  return (
    <div className="page-intent">
      <h2>Intent</h2>
      <IntentView />
    </div>
  )
}

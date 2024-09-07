import './index.scss'

import { useLendStore } from '@/store'

export default function LendBanner() {
  const { showEvent, updateEventShow } = useLendStore()
  if (!showEvent) {
    return null
  }
  return (
    <div className="lend-banner">
      <i
        className="lend-banner-close"
        onClick={() => {
          updateEventShow(false)
        }}
      ></i>
      <div className='lend-banner-list'>
        <div className="lend-banner-item"></div>
        <div className="lend-banner-item"></div>
        <div className="lend-banner-item"></div>
      </div>
    </div>
  )
}

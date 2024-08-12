import { useLendStore } from '@/store'
import './index.scss'

export default function LendBanner() {
  const { showEvent, updateEventShow } = useLendStore()
  if (!showEvent) {
    return null
  }
  return (
    <div className='lend-banner'>
      <i className='lend-banner-close iconfont icon-close' onClick={() => {
        updateEventShow(false)
      }}></i>
      <div className='lend-banner-item'>
        <div className='lend-banner-item-mask'>
          <h4>Event</h4>
          <p>The TRUNK/USDC pool offers increased LTV to allow a leveraged position up to 4x. Higher leverage comes at the cost of increased liquidation risk so proceed with caution.</p>
        </div>
      </div>
    </div>
  )
}
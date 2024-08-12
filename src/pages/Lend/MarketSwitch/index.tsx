import { useState } from 'react'
import cx from 'classnames'
import './index.scss'
import { useLendStore } from '@/store'

export default function MarketSwitch() {
  const marketList = [
    {
      name: 'Main Market'
    }
  ]
  const { showEvent, updateEventShow } = useLendStore()
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className='market-switch'>
      {!showEvent && <div className='lend-banner-showbutton' onClick={() => {
        updateEventShow(true)
      }}>ExtraX Event</div>}
      <ul className='market-switch-list'>
        {
          marketList.map((item, index) => {
            return (
              <li className={cx('market-switch-item', {
                active: index === activeIndex
              })}
              onClick={() => setActiveIndex(index)}
              >
                <p>{item.name}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
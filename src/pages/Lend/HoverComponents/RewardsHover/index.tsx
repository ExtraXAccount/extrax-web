import { addComma, formatNumberByUnit, remain2Decimal } from '@/utils/math'
import './index.scss'
import cx from 'classnames'
import { Popover } from 'antd'
import React from 'react'
import { sumBy } from 'lodash'

export default function RewardsHover(props: {
  type?: 'borrow' | 'supply'
  baseApy: number
  rewards?: {
    token: string
    weekAmount: number
    apy: number
  }[]
  children: React.ReactNode
}) {
  const { type = 'supply', baseApy, rewards = [] } = props
  const content = (
    <section className={cx('rewards-hover', 'hover-content', `rewards-hover-${type}`)}>
      <div className='rewards-hover-title flex ai-ct'>
        <p>additional incentives</p>
      </div>
      <div className='rewards-hover-content'>
        <section className='rewards-hover-content-list'>
          {
            rewards.map(i => {
              return (
                <div className='rewards-hover-content-list-item'>
                  <section className='rewards-hover-content-list-item-info'>
                    <b>{i.token} REWARD</b>
                    <p className='text-sm-2'>{i.weekAmount} WEEKLY</p>
                  </section>
                  <section className='rewards-hover-content-list-item-apy'>{i.apy}%</section>
                </div>
              )
            })
          }
        </section>
        <section className='rewards-hover-content-apys'>
          <div className='rewards-hover-content-apys-item'>
            <p>Lending APY</p>
            <p>+{remain2Decimal(baseApy)}%</p>
          </div>
          <div className='rewards-hover-content-apys-item'>
            <p>Total Combined APY</p>
            <p>+{remain2Decimal(baseApy + sumBy(rewards, 'apy'))}%</p>
          </div>
        </section>
      </div>
      <div className='rewards-hover-footer flex ai-ct'>
        <p>The combined APY accounts for interest & incentives.</p>
      </div>
    </section>
  )

  return (
    <Popover content={content} overlayClassName='no-outside'>
      {props.children}
    </Popover>
  )
}
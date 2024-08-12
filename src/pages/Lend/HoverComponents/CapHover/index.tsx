import './index.scss'

import { Popover } from 'antd'
import cx from 'classnames'
import React from 'react'

import { addComma, formatNumberByUnit, remain2Decimal } from '@/utils/math'

export default function CapHover(props: {
  type: 'borrow' | 'supply'
  max: number
  current: number
  price: number
  children: React.ReactNode
}) {
  const { type, max, current, price } = props
  const percent = (current / max) * 100
  const content = (
    <section
      className={cx('cap-hover', 'hover-content', `cap-hover-${type}`)}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="cap-hover-title flex ai-ct">
        <p>
          {type} cap: {addComma(max)}
        </p>
        <p className="text-sm-2">${formatNumberByUnit(max * price)}</p>
      </div>
      <div className="cap-hover-content">
        <section className="cap-hover-content-slide">
          <div
            className="cap-hover-content-slide-inner"
            style={{ width: `${Math.trunc(percent)}%` }}
          ></div>
        </section>
        <section className="cap-hover-content-text flex ai-ct">
          <p className="flex ai-ct gap-4">
            <i className="cap-hover-circle cap-hover-circle-main"></i>
            {type} used: {addComma(current)}
          </p>
          <p className="flex ai-ct gap-4">
            <i className="cap-hover-circle"></i>remaining: {addComma(max - current)} (
            {Math.trunc(100 - percent)}%)
          </p>
        </section>
      </div>
    </section>
  )

  return (
    <Popover content={content} overlayClassName="no-outside">
      {props.children}
    </Popover>
  )
}

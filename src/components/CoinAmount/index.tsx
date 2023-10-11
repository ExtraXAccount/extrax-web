import './index.scss'

import * as React from 'react'

import { nameChecker } from '@/utils'
import { formatFloatNumber } from '@/utils/math'

import { specialNameChecker } from '../LPName'

export default function CoinAmount(props: {
  coin: string
  amount: number
  showZero?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}) {
  const { coin, amount, showZero, prefix, suffix } = props
  // console.log('CoinAmount', coin, amount);
  if (amount <= 0 && !showZero) {
    return null
  }
  return (
    <div className="coin-amount">
      {prefix}
      <i className={`coin coin-${specialNameChecker(coin)}`} />
      <span>{formatFloatNumber(amount)}</span>
      {/* {nameChecker(coin)} */}
      {coin}
      {suffix}
    </div>
  )
}

export function CoinAmountGroup(props: {
  coin0: string
  amount0: number
  coin1: string
  amount1: number
  showZero?: boolean
  suffix?: React.ReactNode
}) {
  const showPlus = props.showZero || (props.amount0 > 0 && props.amount1 > 0)
  return (
    <div className="coin-amount-group">
      <CoinAmount coin={props.coin0} amount={props.amount0} showZero={props.showZero} />
      {showPlus && <p>+</p>}
      <CoinAmount coin={props.coin1} amount={props.amount1} showZero={props.showZero} />
      {props.suffix}
    </div>
  )
}

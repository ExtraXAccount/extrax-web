import { BigNumber } from '@ethersproject/bignumber'
import classNames from 'classnames'

import TokenAmount from './TokenAmount'

export default function TokenAmountGroup(props: {
  symbol0: string
  amount0: BigNumber
  decimals0: number
  symbol1: string
  amount1: BigNumber
  decimals1: number
  showZero?: boolean
  suffix?: React.ReactNode
  percent?: number
  type?: string
}) {
  if (props.amount0?.eq(0) && props.amount1?.eq(0)) {
    return <div>--</div>
  }
  const showPlus = props.showZero || (props.amount0?.gte(0) && props.amount1?.gte(0))
  return (
    <div className={classNames('token-amount-group', `token-amount-group-${props.type || 1}`)}>
      <TokenAmount
        symbol={props.symbol0}
        amount={props.amount0}
        showZero={props.showZero}
        decimals={props.decimals0}
        percent={props.percent}
      />
      {showPlus && <p className="token-amount-group-plus">+</p>}
      <TokenAmount
        symbol={props.symbol1}
        amount={props.amount1}
        showZero={props.showZero}
        decimals={props.decimals1}
        percent={props.percent}
      />
      {props.suffix}
    </div>
  )
}

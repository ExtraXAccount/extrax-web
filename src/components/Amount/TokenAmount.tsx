import { BigNumber } from '@ethersproject/bignumber'

import { toDecimals } from '@/sdk/utils/token'
import { formatFloatNumber } from '@/utils/math'

import { specialNameChecker } from '../LPName'

export default function TokenAmount(props: {
  symbol: string
  amount: BigNumber
  showZero?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  decimals?: number
  percent?: number
}) {
  const { symbol, amount, showZero, prefix, suffix, decimals = 18, percent = 100 } = props
  if (amount?.lt(0) && !showZero) {
    return null
  }
  return (
    <div className="token-amount">
      {prefix}
      <i className={`token token-${specialNameChecker(symbol)}`} />
      <span>{formatFloatNumber((toDecimals(amount, decimals) * percent) / 100)}</span>
      {symbol}
      {suffix}
    </div>
  )
}

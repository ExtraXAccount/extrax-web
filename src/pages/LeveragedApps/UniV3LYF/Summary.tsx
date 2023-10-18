import { useMemo } from 'react'

import { CoinAmountGroup } from '@/components/CoinAmount'
import useCredit from '@/hooks/useCredit'
import useDebt from '@/hooks/useDebt'
import useDeposited from '@/hooks/useDeposited'
import { Token } from '@/types/uniswap.interface'
import { toPrecision, toPrecisionNum } from '@/utils/math'

interface ISummaryProps {
  token0: Token
  token1: Token
  ammPrice: number
  summary: any
}
export default function Summary(props: ISummaryProps) {
  const {
    token0,
    token1,
    ammPrice = 1,
    summary = {
      bi: 0,
      baseApr: 0,
      aprLeveraged: 0,
    },
  } = props

  const positionTotalVal = useMemo(() => {
    return summary.amount0Borrow + ammPrice * summary.amount1Borrow
  }, [ammPrice, summary.amount0Borrow, summary.amount1Borrow])

  const { maxCredit, availableCredit } = useCredit()
  const { depositedVal, depositedAssets } = useDeposited()
  const { debtVal, debtAssets } = useDebt()

  const prevSafetyFactor = useMemo(() => {
    return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const nextSafetyFactor = useMemo(() => {
    return (debtVal + positionTotalVal) / (depositedVal + debtVal + positionTotalVal)
  }, [debtVal, depositedVal, positionTotalVal])
  // return summary.amount0 + summary.amount0Borrow + ammPrice * (summary.amount1 + summary.amount1Borrow)
  // }, [ammPrice, summary.amount0, summary.amount0Borrow, summary.amount1, summary.amount1Borrow])

  return (
    <div className="farm-page-summary">
      <h3>Summary</h3>
      {/* <div className="farm-page-summary-list"></div> */}
      <section className="lppool-summary">
        <ul className="lppool-summary-list">
          <li>
            <p>Borrowing Interest</p>
            <b>
              <span className="item-pre">{toPrecision(summary.bi * 100, 2)}%</span>
            </b>
          </li>
          <li>
            <p>Daily APR</p>
            <b>
              <span className="item-pre">{toPrecision((summary.baseApr / 365) * 100, 2)}% →</span>
              <span className="text-highlight">{toPrecision((summary.aprLeveraged / 365) * 100, 2)}%</span>
            </b>
          </li>
          <li>
            <p>Total APR</p>
            <b>
              <span className="item-pre">{toPrecision(summary.baseApr * 100, 2)}% →</span>
              <span className="text-highlight">{toPrecision(summary.aprLeveraged * 100, 2)}%</span>
            </b>
          </li>
          {/* <li>
            <p>Assets Supplied</p>
            <b>
              <CoinAmountGroup
                showZero
                coin0={token0.symbol}
                amount0={summary.amount0}
                coin1={token1.symbol}
                amount1={summary.amount1}
              />
            </b>
          </li> */}
          <li>
            <p>Assets Borrowed</p>
            <b>
              <CoinAmountGroup
                showZero
                coin0={token0.symbol}
                amount0={summary.amount0Borrow}
                coin1={token1.symbol}
                amount1={summary.amount1Borrow}
              />
            </b>
          </li>
          <li>
            <p>Total Assets in Position</p>
            <b>
              <CoinAmountGroup
                showZero
                coin0={token0.symbol}
                amount0={positionTotalVal / 2}
                coin1={token1.symbol}
                amount1={toPrecisionNum(positionTotalVal / 2 / ammPrice)}
              />
            </b>
          </li>
          <li>
            <p>Left Credit</p>
            <b>
              <span className="item-pre">{toPrecision(availableCredit)} →</span>
              <span className="text-highlight">{toPrecision(availableCredit - positionTotalVal)}</span>
            </b>
          </li>
          <li>
            <p>Safety Factor</p>
            <b>
              <span className="item-pre">{toPrecision(prevSafetyFactor * 100)}% →</span>
              <span className="text-highlight">{toPrecision(nextSafetyFactor * 100)}%</span>
            </b>
          </li>
        </ul>
      </section>
    </div>
  )
}

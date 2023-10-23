import { Tooltip } from 'antd/es'
import cx from 'classnames'
import { sumBy } from 'lodash'
import { useMemo } from 'react'

import { INFINITY } from '@/components/AppLayout/AccountInfo'
import { CoinAmountGroup } from '@/components/CoinAmount'
import usePrices from '@/hooks/usePrices'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendContract from '@/sdk/lend'
import { useAppSelector } from '@/state'
import { Token } from '@/types/uniswap.interface'
import { addComma, aprToApy, toPrecision, toPrecisionNum } from '@/utils/math'

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
    // ammPrice = 1,
    summary = {
      bi: 0,
      baseApr: 0,
      aprLeveraged: 0,
    },
  } = props

  const { prices } = usePrices()
  const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const positionTotalVal = useMemo(() => {
    return summary.amount0Borrow * prices[token0.symbol] + summary.amount1Borrow * prices[token0.symbol]
  }, [prices, summary.amount0Borrow, summary.amount1Borrow, token0.symbol])

  const {
    // smartAccount,
    depositedVal,
    // depositedAssets,
    debtVal,
    // debtAssets,
    // maxCredit,
    availableCredit,
    // usedCredit,
    safetyRatio: prevSafetyFactor,
    accountAPY,
  } = useSmartAccount()

  const { lendList } = useLendContract()

  const { token0data, token1data } = useMemo(() => {
    const token0info = lendList.find((item) => item.tokenSymbol === token0.symbol)
    const token1info = lendList.find((item) => item.tokenSymbol === token1.symbol)
    return {
      token0data: {
        ...token0info,
        price: prices[token0info?.tokenSymbol],
      },
      token1data: {
        ...token1info,
        price: prices[token1info?.tokenSymbol],
      },
    }
  }, [token0, token1, lendList, prices])

  // console.log('token0data token1data :>> ', {
  //   summary,
  //   lendList,
  //   token0,
  //   token1,
  //   token0data,
  //   token1data,
  // })

  const borrowedVal = useMemo(() => {
    return (
      summary.amount0Borrow * token0data.borrowFactor * prices[token0.symbol] +
      summary.amount1Borrow * token1data.borrowFactor * prices[token1.symbol]
    )
  }, [
    prices,
    summary.amount0Borrow,
    summary.amount1Borrow,
    token0.symbol,
    token0data.borrowFactor,
    token1.symbol,
    token1data.borrowFactor,
  ])

  const borrowInterest = useMemo(() => {
    return token0data.borrowingRate * summary.tk0BorrowRatio + token1data.borrowingRate * (1 - summary.tk0BorrowRatio)
  }, [summary.tk0BorrowRatio, token0data.borrowingRate, token1data.borrowingRate])

  const nextSafetyFactor = useMemo(() => {
    const newDebtVal = debtVal + positionTotalVal
    // if (!newDebtVal) {
    //   return INFINITY
    // }
    // return toPrecision((depositedVal / newDebtVal) * 100) + '%'
    return newDebtVal / (depositedVal + newDebtVal)
  }, [debtVal, depositedVal, positionTotalVal])
  // return summary.amount0 + summary.amount0Borrow + ammPrice * (summary.amount1 + summary.amount1Borrow)
  // }, [ammPrice, summary.amount0, summary.amount0Borrow, summary.amount1, summary.amount1Borrow])

  const updatedAccountApy = useMemo(() => {
    if (!depositedVal) {
      return 0
    }
    const result =
      (sumBy(
        lendingList,
        (item) =>
          aprToApy(item.apr) * item.deposited * prices[item.tokenSymbol] -
          item.borrowingRate * item.borrowed * prices[item.tokenSymbol]
      ) +
        borrowedVal * summary.baseApr) /
      depositedVal
    return result
  }, [lendingList, depositedVal, prices, borrowedVal, summary.baseApr])

  return (
    <div className="farm-page-summary">
      <h3>Summary</h3>
      {/* <div className="farm-page-summary-list"></div> */}
      <section className="lppool-summary">
        <ul className="lppool-summary-list">
          <li>
            <p>Farming APR</p>
            <b>
              <span className="farm-buffer-safe">{toPrecision(summary.baseApr * 100)}%</span>
            </b>
          </li>
          <li>
            <p>Borrowing APR</p>
            <b>
              <span className="item-pre farm-buffer-danger">-{toPrecision(borrowInterest * 100)}%</span>
            </b>
          </li>
          <li>
            <p>Position APR</p>
            <b>
              <span
                className={cx('', {
                  'farm-buffer-safe': summary.baseApr - borrowInterest >= 0,
                  'farm-buffer-danger': summary.baseApr - borrowInterest < 0,
                })}
              >
                {toPrecision((summary.baseApr - borrowInterest) * 100)}%
              </span>
              {/* <span className="text-highlight"> → {toPrecision(summary.aprLeveraged * 100, 2)}%</span> */}
            </b>
          </li>
          <li>
            <p>Assets Borrowed</p>
            <Tooltip title={`$${toPrecision(borrowedVal)} total worth`}>
              <b>
                <CoinAmountGroup
                  showZero
                  coin0={token0.symbol}
                  amount0={summary.amount0Borrow * token0data.borrowFactor}
                  coin1={token1.symbol}
                  amount1={summary.amount1Borrow * token0data.borrowFactor}
                />
              </b>
            </Tooltip>
          </li>
          <li>
            <p>Total Assets in Position</p>
            <Tooltip title={`$${toPrecision(borrowedVal)} total worth`}>
              <b>
                <CoinAmountGroup
                  showZero
                  coin0={token0.symbol}
                  amount0={borrowedVal / 2 / prices[token0.symbol]}
                  coin1={token1.symbol}
                  amount1={toPrecisionNum(borrowedVal / 2 / prices[token1.symbol])}
                />
              </b>
            </Tooltip>
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
              <span
                className={cx('item-pre', {
                  'farm-buffer-safe': prevSafetyFactor < 0.8,
                  'farm-buffer-warn': prevSafetyFactor > 0.8,
                  'farm-buffer-danger': prevSafetyFactor > 0.9,
                })}
              >
                {toPrecision(prevSafetyFactor * 100)}% →
              </span>
              <span
                className={cx('', {
                  'farm-buffer-safe': nextSafetyFactor < 0.8,
                  'farm-buffer-warn': nextSafetyFactor > 0.8,
                  'farm-buffer-danger': nextSafetyFactor > 0.9,
                })}
              >
                {toPrecision(nextSafetyFactor * 100)}%
              </span>
            </b>
          </li>
          <li>
            <p>Portfolio APY</p>
            <b>
              <span className="item-pre">{addComma(accountAPY * 100)}% →</span>
              <span className="text-highlight">{addComma(updatedAccountApy * 100)}%</span>
            </b>
          </li>
        </ul>
      </section>
    </div>
  )
}

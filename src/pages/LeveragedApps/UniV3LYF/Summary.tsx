import cx from 'classnames'
import { useMemo } from 'react'

import { INFINITY } from '@/components/AppLayout/AccountInfo'
import { CoinAmountGroup } from '@/components/CoinAmount'
import usePrices from '@/hooks/usePrices'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendContract from '@/sdk/lend'
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

  const { prices } = usePrices()

  const positionTotalVal = useMemo(() => {
    return summary.amount0Borrow + ammPrice * summary.amount1Borrow
  }, [ammPrice, summary.amount0Borrow, summary.amount1Borrow])

  const {
    // smartAccount,
    depositedVal,
    // depositedAssets,
    debtVal,
    // debtAssets,
    // maxCredit,
    availableCredit,
    // usedCredit,
    // safetyRatio,
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

  const borrowInterest = useMemo(() => {
    return token0data.borrowingRate * summary.tk0BorrowRatio + token1data.borrowingRate * (1 - summary.tk0BorrowRatio)
  }, [summary.tk0BorrowRatio, token0data.borrowingRate, token1data.borrowingRate])

  const prevSafetyFactor = useMemo(() => {
    if (!debtVal) {
      return INFINITY
    }
    return toPrecision((depositedVal / debtVal) * 100) + '%'
    // return debtVal / (depositedVal + debtVal)
  }, [debtVal, depositedVal])

  const nextSafetyFactor = useMemo(() => {
    const newDebtVal = debtVal + positionTotalVal
    if (!newDebtVal) {
      return INFINITY
    }
    return toPrecision((depositedVal / newDebtVal) * 100) + '%'
    // return (debtVal + positionTotalVal) / (depositedVal + debtVal + positionTotalVal)
  }, [debtVal, depositedVal, positionTotalVal])
  // return summary.amount0 + summary.amount0Borrow + ammPrice * (summary.amount1 + summary.amount1Borrow)
  // }, [ammPrice, summary.amount0, summary.amount0Borrow, summary.amount1, summary.amount1Borrow])

  const updatedAccountApy = useMemo(() => {
    return accountAPY
  }, [accountAPY])

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
            <p>Total APR</p>
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
              <span className="item-pre">{prevSafetyFactor} →</span>
              <span className="text-highlight">{nextSafetyFactor}</span>
            </b>
          </li>
          <li>
            <p>Portfolio APY</p>
            <b>
              <span className="item-pre">{accountAPY} →</span>
              <span className="text-highlight">{updatedAccountApy}</span>
            </b>
          </li>
        </ul>
      </section>
    </div>
  )
}

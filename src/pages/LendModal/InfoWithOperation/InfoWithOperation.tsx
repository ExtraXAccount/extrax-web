import './InfoWithOperation.scss'

import { animated, useTransition } from '@react-spring/web'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import LendingPoolHistory from '@/components/LendingPoolHistory'
import LPName from '@/components/LPName'
import usePrices from '@/hooks/usePrices'
import useLendingList from '@/pages/Lend/useLendingList'
import { formatSymbol } from '@/sdk/utils/token'
import { IFormattedLendPool } from '@/store/lend'
import { nameChecker } from '@/utils'
import { formatNumberByUnit, toPrecision } from '@/utils/math'

import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { CoinMain } from '../CoinMain/CoinMain'
import { InterestRateModel } from '../InterestRateModel'
import { MoreDetail } from '../MoreDetail'
import { SupplyInfo } from '../SupplyInfo/SupplyInfo'
import { SupplyWindows } from '../SupplyWindows/SupplyWindows'
import useLendPoolInfo from '../useLendPoolInfo'

export const InfoWithOperation = (): JSX.Element => {
  const matchSupply = useMatch('lend/supply/:marketId/:reserveId')
  const matchBorrow = useMatch('lend/borrow/:marketId/:reserveId')

  const poolInfo = useLendPoolInfo()
  const { getPrice } = usePrices()
  const { formattedLendPools } = useLendingList()
  const navigate = useNavigate()

  const [isSelectingAsset, setIsSelectingAsset] = useState(false)
  const [showPoolDetail, setShowPoolDetail] = useState(false)
  const [transitions, api] = useTransition(showPoolDetail, () => ({
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  }))

  const toggleMenuOpen = useCallback(() => {
    setIsSelectingAsset(!isSelectingAsset)
  }, [isSelectingAsset])

  const onSelectPool = useCallback(
    (pool: IFormattedLendPool) => {
      navigate(`/lend/${pool.marketId}/${pool.reserveId}`)
      toggleMenuOpen()
    },
    [navigate, toggleMenuOpen],
  )

  const toggleDetail = useCallback(() => {
    setShowPoolDetail(!showPoolDetail)
  }, [showPoolDetail])

  return (
    <div
      className={classNames('info-with-operation', {
        'info-with-operation-show-detail': showPoolDetail,
      })}
    >
      <div className="info-with-operation__frame-1279">
        <Tooltip
          title={`${!showPoolDetail ? 'Show' : 'Hide'} ${
            poolInfo?.tokenSymbol
          } pool info}`}
        >
          <span className="btn-toggle-detail" onClick={toggleDetail}>
            <i />
          </span>
        </Tooltip>
        <div className="info-with-operation__usdc-pool-details">
          {matchSupply
            ? `Supply ${poolInfo?.tokenSymbol}`
            : matchBorrow
            ? `Borrow ${poolInfo?.tokenSymbol}`
            : `${poolInfo?.tokenSymbol} Pool Operation`}
        </div>
        <img
          className="info-with-operation__frame"
          src="/modal/frame0.svg"
          onClick={() => {
            navigate('/lend')
          }}
        />
      </div>
      <div className="info-with-operation__frame-482114">
        {showPoolDetail && (
          <div
            className={
              'info-to-list-property-1-info info-with-operation__info-to-list-instance property-1-info'
            }
          >
            <CoinMain
              className="info-to-list-property-1-info__coin-main-instance"
              toggleMenuOpen={toggleMenuOpen}
            ></CoinMain>
            {isSelectingAsset ? (
              <div className="asset-selector-wrapper">
                <h4>Select Asset</h4>
                <ul className="asset-selector-list">
                  {formattedLendPools.map((pool) => (
                    <li
                      key={pool.reserveId}
                      className="asset-selector-item"
                      onClick={() => {
                        onSelectPool(pool)
                      }}
                    >
                      <div className="lending-list-title-wrap">
                        <LPName
                          token0={nameChecker(formatSymbol(pool.tokenSymbol))}
                          title={nameChecker(pool.tokenSymbol)}
                        />
                      </div>
                      <div className="asset-selector-item-supply">
                        <span>Supply APY</span>
                        <em>{toPrecision(pool.formatted.apy * 100)}%</em>
                      </div>
                      <div className="asset-selector-item-borrow">
                        <span>Borrow APR</span>
                        <em>{toPrecision(pool.formatted.borrowApr * 100)}%</em>
                      </div>
                      <div className="asset-selector-item-price">
                        <span>Oracle price</span>
                        <em>${toPrecision(getPrice(pool.tokenSymbol))}</em>
                      </div>
                      <div className="asset-selector-item-available">
                        <span>Available</span>
                        <em>{formatNumberByUnit(pool.formatted.availableLiquidity)}</em>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                {!matchBorrow && (
                  <SupplyInfo className="info-to-list-property-1-info__supply-info-instance"></SupplyInfo>
                )}
                {!matchSupply && (
                  <BorrowInfo className="info-to-list-property-1-info__borrow-info-instance"></BorrowInfo>
                )}
                <LendingPoolHistory />
                <InterestRateModel className="info-to-list-property-1-info__interest-rate-model-instance"></InterestRateModel>
                <MoreDetail className="info-to-list-property-1-info__frame-482075-instance"></MoreDetail>
              </>
            )}
          </div>
        )}
        <SupplyWindows className="info-with-operation__supply-windows-instance"></SupplyWindows>
      </div>
    </div>
  )
}

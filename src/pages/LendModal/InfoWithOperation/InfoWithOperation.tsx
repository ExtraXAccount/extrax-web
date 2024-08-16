import './InfoWithOperation.css'

import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LPName from '@/components/LPName'
import usePrices from '@/hooks/usePrices'
import useLendingList from '@/pages/Lend/useLendingList'
import { formatSymbol } from '@/sdk/utils/token'
import { IFormattedLendPool } from '@/store/lend'
import { nameChecker } from '@/utils'
import { formatNumberByUnit, toPrecision } from '@/utils/math'

import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { CoinMain } from '../CoinMain/CoinMain'
import { InterestRateModel } from '../InterestRateModel/InterestRateModel'
import { MoreDetail } from '../MoreDetail'
import { SupplyInfo } from '../SupplyInfo/SupplyInfo'
import { SupplyWindows } from '../SupplyWindows/SupplyWindows'
import { UsdcApyHistory } from '../UsdcApyHistory/UsdcApyHistory'
import useLendPoolInfo from '../useLendPoolInfo'

export interface IInfoWithOperationProps {
  className?: string
}

export const InfoWithOperation = ({
  className,
}: IInfoWithOperationProps): JSX.Element => {
  const poolInfo = useLendPoolInfo()
  const { getPrice } = usePrices()
  const { formattedLendPools } = useLendingList()
  const navigate = useNavigate()

  const [isSelectingAsset, setIsSelectingAsset] = useState(false)

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

  return (
    <div className={'info-with-operation ' + className}>
      <div className="info-with-operation__frame-1279">
        <div className="info-with-operation__usdc-pool-details">
          {poolInfo?.tokenSymbol?.toUpperCase()} Pool Details{' '}
        </div>
        <img
          className="info-with-operation__frame"
          src="/modal/frame0.svg"
          onClick={() => {
            navigate('/lend')
            // if (location.key !== 'default') {
            //   navigate(-1)
            // } else {
            //   navigate('/lend')
            // }
          }}
        />
      </div>
      <div className="info-with-operation__frame-482114">
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
              <SupplyInfo className="info-to-list-property-1-info__supply-info-instance"></SupplyInfo>
              <BorrowInfo className="info-to-list-property-1-info__borrow-info-instance"></BorrowInfo>
              <UsdcApyHistory className="info-to-list-property-1-info__usdc-apy-history-instance"></UsdcApyHistory>
              <InterestRateModel className="info-to-list-property-1-info__interest-rate-model-instance"></InterestRateModel>
              <MoreDetail className="info-to-list-property-1-info__frame-482075-instance"></MoreDetail>
            </>
          )}
        </div>
        <SupplyWindows className="info-with-operation__supply-windows-instance"></SupplyWindows>
      </div>
    </div>
  )
}

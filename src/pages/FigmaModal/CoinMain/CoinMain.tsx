import './CoinMain.css'

import { Skeleton } from 'antd'

import Loading from '@/components/Loading'
import usePrices from '@/hooks/usePrices'
import { formatFloatNumber, toPrecision } from '@/utils/math'

import { CoinProperty1UsdCoinUsdc } from '../CoinProperty1UsdCoinUsdc/CoinProperty1UsdCoinUsdc'
import { CoinSelectProperty1Def } from '../CoinSelectProperty1Def/CoinSelectProperty1Def'
import { Component289Property1OraclePrice } from '../Component289Property1OraclePrice/Component289Property1OraclePrice'
import useLendPoolInfo from '../useLendPoolInfo'

export interface ICoinMainProps {
  className?: string
}

export const CoinMain = ({ className, ...props }: ICoinMainProps) => {
  const lendPoolInfo = useLendPoolInfo()
  const { getPrice } = usePrices()

  return (
    <div className={'coin-main ' + className}>
      <div className="coin-main__frame-482117">
        <div className="coin-main__group-9">
          <CoinProperty1UsdCoinUsdc
            property1="usd-coin-usdc"
            className="coin-main__coin-instance"
          ></CoinProperty1UsdCoinUsdc>
        </div>
        <div className="coin-main__frame-171">
          <div className="coin-main__usd-coin">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>{lendPoolInfo.tokenSymbol.toUpperCase()}</>
            )}
          </div>
          <div className="coin-main__frame-482097">
            {/* <div className="coin-main__usdc">{token?.toUpperCase()} </div> */}
            <div className="coin-main__component-229">
              <div className="coin-main__isolated">Isolated </div>
            </div>
          </div>
        </div>
      </div>
      <div className="coin-main__frame-482082">
        <div className="coin-main__frame-482081">
          <div className="coin-main__reserve-size">Reserve Size </div>
          <div className="coin-main___37-94-m">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>
                $
                {formatFloatNumber(
                  lendPoolInfo.formatted.totalSupply * getPrice(lendPoolInfo.tokenSymbol),
                )}
              </>
            )}
          </div>
        </div>
        <div className="coin-main__frame-482083">
          <div className="coin-main__utilization-rate">Utilization Rate </div>
          <div className="coin-main___88-82">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>{toPrecision(lendPoolInfo.formatted.utilization * 100)}%</>
            )}
          </div>
        </div>
        <Component289Property1OraclePrice className="coin-main__component-289-instance"></Component289Property1OraclePrice>
      </div>
      <CoinSelectProperty1Def className="coin-main__coin-select-instance"></CoinSelectProperty1Def>
    </div>
  )
}

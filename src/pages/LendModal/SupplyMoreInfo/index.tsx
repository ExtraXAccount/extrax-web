import './index.css'

import { aprToApy, aprToApy100, toPrecision } from '@/utils/math'

import useLendPoolInfo from '../useLendPoolInfo'

export const SupplyMoreInfo = ({ property1 = 'ex-info', className }): JSX.Element => {
  const variantsClassName = 'property-1-' + property1
  const lendPoolInfo = useLendPoolInfo()

  return (
    <div
      className={
        'component-287-property-1-ex-info ' + className + ' ' + variantsClassName
      }
    >
      <div className="component-287-property-1-ex-info__frame-482137">
        <div className="component-287-property-1-ex-info__frame-482083">
          <div className="component-287-property-1-ex-info__supply-apy">Supply APY</div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___5-24">
              {toPrecision(aprToApy(lendPoolInfo?.formatted.apr || 0) * 100)}%
            </div>
          </div>
        </div>
        <div className="component-287-property-1-ex-info__frame-481709">
          <div className="component-287-property-1-ex-info__collateral-factor">
            Collateral Factor
            {/* Exchange Rate */}
          </div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___85">
              {(lendPoolInfo?.formatted.exchangeRate || 0) * 100}%
            </div>
          </div>
        </div>
        <div className="component-287-property-1-ex-info__frame-482081">
          <div className="component-287-property-1-ex-info__liquidation-threshold">
            Liquidation Threshold
          </div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___90-0">
              {(lendPoolInfo?.config.liquidationThreshold || 0) / 100}%
            </div>
          </div>
        </div>
      </div>
      <div className="component-287-property-1-ex-info__frame-482139"></div>
    </div>
  )
}

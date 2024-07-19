import './InputProperty1Default.css'

import { CoinProperty1UsdCoinUsdc } from '../CoinProperty1UsdCoinUsdc/CoinProperty1UsdCoinUsdc'
import { Component288Property1Max } from '../Component288Property1Max/Component288Property1Max'

export interface IInputProperty1DefaultProps {
  property1?: 'default' | 'value'
  className?: string
}

export const InputProperty1Default = ({
  property1 = 'default',
  className,
  ...props
}: IInputProperty1DefaultProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'input-property-1-default ' + className + ' ' + variantsClassName}>
      <div className="input-property-1-default__frame-482142">
        <div className="input-property-1-default___0-00">0.00 </div>
        <div className="input-property-1-default__frame-482141">
          <div className="input-property-1-default__group-9">
            <CoinProperty1UsdCoinUsdc
              property1="usd-coin-usdc"
              className="input-property-1-default__coin-instance"
            ></CoinProperty1UsdCoinUsdc>
          </div>
          <div className="input-property-1-default__us-dc">USDc </div>
        </div>
      </div>
      <div className="input-property-1-default__frame-481741">
        <div className="input-property-1-default___0-002">$0.00 </div>
        <div className="input-property-1-default__frame-482143">
          <div className="input-property-1-default__available-100-m">
            Available: 100M{' '}
          </div>
          <Component288Property1Max className="input-property-1-default__component-288-instance"></Component288Property1Max>
        </div>
      </div>
    </div>
  )
}

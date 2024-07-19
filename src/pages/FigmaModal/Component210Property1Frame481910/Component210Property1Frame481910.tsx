import './Component210Property1Frame481910.css'

import { CoinProperty1UsdCoinUsdc } from '../CoinProperty1UsdCoinUsdc/CoinProperty1UsdCoinUsdc'

export interface IComponent210Property1Frame481910Props {
  property1?: 'frame-481910' | 'frame-481943'
  className?: string
}

export const Component210Property1Frame481910 = ({
  property1 = 'frame-481910',
  className,
  ...props
}: IComponent210Property1Frame481910Props): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'component-210-property-1-frame-481910 ' + className + ' ' + variantsClassName
      }
    >
      <div className="component-210-property-1-frame-481910__frame-481905">
        <div className="component-210-property-1-frame-481910__frame-481914"></div>
        <div className="component-210-property-1-frame-481910__group-9">
          <CoinProperty1UsdCoinUsdc
            property1="usd-coin-usdc"
            className="component-210-property-1-frame-481910__coin-instance"
          ></CoinProperty1UsdCoinUsdc>
        </div>
        <div className="component-210-property-1-frame-481910__usdc">USDC </div>
        <div className="component-210-property-1-frame-481910__component-199">
          <div className="component-210-property-1-frame-481910__lent">lent </div>
        </div>
      </div>
      <div className="component-210-property-1-frame-481910__frame-481906">
        <div className="component-210-property-1-frame-481910___1-53-k">$1.53K </div>
      </div>
      <div className="component-210-property-1-frame-481910__frame-481907">
        <div className="component-210-property-1-frame-481910___1-53-k">$1.53K </div>
      </div>
      <div className="component-210-property-1-frame-481910__frame-481908">
        <div className="component-210-property-1-frame-481910___8-15">8.15% </div>
      </div>
    </div>
  )
}

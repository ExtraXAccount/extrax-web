import './SupplyWindows.css'

import { AccountBalancesSupplyProperty1BalancesDetail } from '../AccountBalancesSupplyProperty1BalancesDetail/AccountBalancesSupplyProperty1BalancesDetail'
import { AccountInfoProperty1CompositionD } from '../AccountInfoProperty1CompositionD/AccountInfoProperty1CompositionD'
import { CoinProperty1UsdCoinUsdc } from '../CoinProperty1UsdCoinUsdc/CoinProperty1UsdCoinUsdc'
import { InputProperty1Default } from '../InputProperty1Default/InputProperty1Default'
import { MainProperty1Default } from '../MainProperty1Default/MainProperty1Default'
import { Property1 } from '../Property1/Property1'
import { SelcetionProperty11 } from '../SelcetionProperty11/SelcetionProperty11'

export interface ISupplyWindowsProps {
  className?: string
}

export const SupplyWindows = ({
  className,
  ...props
}: ISupplyWindowsProps): JSX.Element => {
  return (
    <div className={'supply-windows ' + className}>
      <div className="supply-windows__frame-482102">
        <div className="supply-windows__frame-482101">
          <div className="supply-windows__group-9">
            <CoinProperty1UsdCoinUsdc
              property1="usd-coin-usdc"
              className="supply-windows__coin-instance"
            ></CoinProperty1UsdCoinUsdc>
          </div>
          <div className="supply-windows__supply-usdc">Supply USDC </div>
        </div>
        <div className="supply-windows__frame-482107">
          <div className="supply-windows__supply">Supply </div>
          <div className="supply-windows__div">/ </div>
          <div className="supply-windows__borrow">Borrow </div>
        </div>
      </div>
      <div className="supply-windows__frame-482088">
        <div className="supply-windows__frame-481806">
          <InputProperty1Default className="supply-windows__input-instance"></InputProperty1Default>
          <Property1 className="supply-windows__instance"></Property1>
          <div className="supply-windows__frame-482084">
            <div className="supply-windows__frame-4820842">
              <div className="supply-windows__supply-apy">Supply APY </div>
              <div className="supply-windows__frame-482223">
                <div className="supply-windows___6-73">6.73% </div>
                <div className="supply-windows__frame-482224">
                  <div className="supply-windows___3-2">🎉 +3.2% </div>
                </div>
                <div className="supply-windows__frame-482225">
                  <div className="supply-windows___3-2">❤️‍🔥 +3.2% </div>
                </div>
              </div>
            </div>
            <div className="supply-windows__frame-481709">
              <div className="supply-windows__health-factor">Health Factor </div>
              <div className="supply-windows___1-21">1.21 </div>
            </div>
          </div>
          <SelcetionProperty11
            property1="1"
            className="supply-windows__selcetion-instance"
          ></SelcetionProperty11>
        </div>
        <div className="supply-windows__deposit-info">
          <div className="supply-windows__frame-481805">
            <div className="supply-windows__component-101">
              <AccountInfoProperty1CompositionD className="supply-windows__account-info-instance"></AccountInfoProperty1CompositionD>
              <AccountBalancesSupplyProperty1BalancesDetail className="supply-windows__account-balances-supply-instance"></AccountBalancesSupplyProperty1BalancesDetail>
            </div>
          </div>
          <MainProperty1Default className="supply-windows__main-instance"></MainProperty1Default>
        </div>
      </div>
    </div>
  )
}

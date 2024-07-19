import './AccountBalancesSupplyProperty1BalancesDetail.css'

import { Component210Property1Frame481910 } from '../Component210Property1Frame481910/Component210Property1Frame481910'

export interface IAccountBalancesSupplyProperty1BalancesDetailProps {
  property1?: 'balances' | 'balances-detail'
  className?: string
}

export const AccountBalancesSupplyProperty1BalancesDetail = ({
  property1 = 'balances-detail',
  className,
  ...props
}: IAccountBalancesSupplyProperty1BalancesDetailProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'account-balances-supply-property-1-balances-detail ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className="account-balances-supply-property-1-balances-detail__frame-481706">
        <div className="account-balances-supply-property-1-balances-detail__account-balances">
          Account Balances{' '}
        </div>
        <img
          className="account-balances-supply-property-1-balances-detail__vector"
          src="/modal/vector0.svg"
        />
      </div>
      <div className="account-balances-supply-property-1-balances-detail__frame-481705">
        <div className="account-balances-supply-property-1-balances-detail__frame-481909">
          <div className="account-balances-supply-property-1-balances-detail__frame-481905">
            <div className="account-balances-supply-property-1-balances-detail__asset">
              Asset{' '}
            </div>
          </div>
          <div className="account-balances-supply-property-1-balances-detail__frame-481906">
            <div className="account-balances-supply-property-1-balances-detail__value">
              Value{' '}
            </div>
          </div>
          <div className="account-balances-supply-property-1-balances-detail__frame-481907">
            <div className="account-balances-supply-property-1-balances-detail__size">
              Size{' '}
            </div>
          </div>
          <div className="account-balances-supply-property-1-balances-detail__frame-481908">
            <div className="account-balances-supply-property-1-balances-detail__apy">
              APY{' '}
            </div>
          </div>
        </div>
      </div>
      <Component210Property1Frame481910 className="account-balances-supply-property-1-balances-detail__component-210-instance"></Component210Property1Frame481910>
    </div>
  )
}

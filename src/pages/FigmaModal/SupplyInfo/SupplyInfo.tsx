import './SupplyInfo.css'

import { Component287Property1ExInfo } from '../Component287Property1ExInfo/Component287Property1ExInfo'

export interface ISupplyInfoProps {
  className?: string
}

export const SupplyInfo = ({ className, ...props }: ISupplyInfoProps): JSX.Element => {
  return (
    <div className={'supply-info ' + className}>
      <div className="supply-info__supply-info2">Supply Info </div>
      <div className="supply-info__frame-482133">
        <div className="supply-info__frame-482073">
          <div className="supply-info__maximum-amount-to-supply">
            Maximum Amount to Supply:{' '}
          </div>
          <div className="supply-info___30-00-m">30.00M </div>
        </div>
        <div className="supply-info__frame-482075">
          <div className="supply-info__frame-481894"></div>
          <div className="supply-info__frame-481895"></div>
        </div>
        <div className="supply-info__frame-482132">
          <div className="supply-info__frame-482078">
            <div className="supply-info__frame-482073">
              <div className="supply-info__ellipse-307"></div>
              <div className="supply-info__total-supplied">total supplied: </div>
              <div className="supply-info__frame-482079">
                <div className="supply-info___6-14-m">6.14M </div>
              </div>
            </div>
            <div className="supply-info___18-7">18.7 % </div>
          </div>
          <div className="supply-info__frame-4820792">
            <div className="supply-info__frame-482073">
              <div className="supply-info__ellipse-3072"></div>
              <div className="supply-info__available">available: </div>
              <div className="supply-info__frame-482079">
                <div className="supply-info___30-28-m">30.28M </div>
              </div>
            </div>
            <div className="supply-info___81-3">81.3 % </div>
          </div>
        </div>
      </div>
      <div className="supply-info__frame-482092">
        <div className="supply-info__frame-482080">
          <div className="supply-info__more-info">more Info </div>
          <div className="supply-info__component-229">
            <div className="supply-info__can-be-collateral">Can be collateral </div>
          </div>
        </div>
        <Component287Property1ExInfo className="supply-info__component-287-instance"></Component287Property1ExInfo>
      </div>
    </div>
  )
}

import './Component287Property1ExInfo.css'

import { MoeInfoProperty1Def } from '../MoeInfoProperty1Def/MoeInfoProperty1Def'

export interface IComponent287Property1ExInfoProps {
  property1?: 'ex-info' | 'ex-info-more'
  className?: string
}

export const Component287Property1ExInfo = ({
  property1 = 'ex-info',
  className,
  ...props
}: IComponent287Property1ExInfoProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'component-287-property-1-ex-info ' + className + ' ' + variantsClassName
      }
    >
      <div className="component-287-property-1-ex-info__frame-482137">
        <div className="component-287-property-1-ex-info__frame-482083">
          <div className="component-287-property-1-ex-info__supply-apy">supply APY </div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___5-24">5.24% </div>
          </div>
        </div>
        <div className="component-287-property-1-ex-info__frame-481709">
          <div className="component-287-property-1-ex-info__collateral-factor">
            Collateral Factor{' '}
          </div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___85">85% </div>
          </div>
        </div>
        <div className="component-287-property-1-ex-info__frame-482081">
          <div className="component-287-property-1-ex-info__liquidation-threshold">
            Liquidation threshold{' '}
          </div>
          <div className="component-287-property-1-ex-info__frame-481698">
            <div className="component-287-property-1-ex-info___90-0">90.0% </div>
          </div>
        </div>
      </div>
      <div className="component-287-property-1-ex-info__frame-482139">
        <MoeInfoProperty1Def className="component-287-property-1-ex-info__moe-info-instance"></MoeInfoProperty1Def>
      </div>
    </div>
  )
}

import './Component289Property1OraclePrice.css'

import { OracleProperty1OracleD } from '../OracleProperty1OracleD/OracleProperty1OracleD'

export interface IComponent289Property1OraclePriceProps {
  property1?: 'oracle-price' | 'oracle-price-hover'
  className?: string
}

export const Component289Property1OraclePrice = ({
  property1 = 'oracle-price',
  className,
  ...props
}: IComponent289Property1OraclePriceProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'component-289-property-1-oracle-price ' + className + ' ' + variantsClassName
      }
    >
      <div className="component-289-property-1-oracle-price__frame-482135">
        <div className="component-289-property-1-oracle-price__oracle-price">
          Oracle price{' '}
        </div>
        {/* <OracleProperty1OracleD className="component-289-property-1-oracle-price__oracle-instance"></OracleProperty1OracleD> */}
      </div>
      <div className="component-289-property-1-oracle-price___1-00">$1.00 </div>
    </div>
  )
}

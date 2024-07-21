import './SelcetionProperty11.css'

import { Switch } from 'antd/es'
import { useState } from 'react'

export interface ISelcetionProperty11Props {
  property1?: 'default' | '1'
  className?: string
}

export const SelcetionProperty11 = ({
  property1 = 'default',
  className,
  ...props
}: ISelcetionProperty11Props): JSX.Element => {
  const variantsClassName = 'property-1-' + property1
  const [asCollateral, setAsCollateral] = useState(false)

  return (
    <div className={'selcetion-property-11 ' + className + ' ' + variantsClassName}>
      <div className="selcetion-property-11__auto-rebalance">As Collateral </div>
      <Switch
        checked={asCollateral}
        size="small"
        onChange={(checked) => {
          setAsCollateral(checked)
        }}
      ></Switch>
    </div>
  )
}

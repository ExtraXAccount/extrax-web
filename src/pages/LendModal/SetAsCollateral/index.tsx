import './index.css'

import { Switch } from 'antd/es'
import { useState } from 'react'

export const SetAsCollateral = ({ property1 = 'default', className }): JSX.Element => {
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

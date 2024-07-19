import './SelcetionProperty11.css'

import { MiniSwitchProperty1Off } from '../MiniSwitchProperty1Off/MiniSwitchProperty1Off'

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

  return (
    <div className={'selcetion-property-11 ' + className + ' ' + variantsClassName}>
      <div className="selcetion-property-11__auto-rebalance">Auto Rebalance </div>
      <MiniSwitchProperty1Off
        property1="off"
        className="selcetion-property-11__mini-switch-instance"
      ></MiniSwitchProperty1Off>
    </div>
  )
}

import './Property1.css'

import { ComponentSliderProperty1SliderDefault } from '../ComponentSliderProperty1SliderDefault/ComponentSliderProperty1SliderDefault'

export interface IProperty1Props {
  property1?: '' | 'detail'
  className?: string
}

export const Property1 = ({
  property1 = '',
  className,
  ...props
}: IProperty1Props): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'property-1 ' + className + ' ' + variantsClassName}>
      <ComponentSliderProperty1SliderDefault className="property-1__component-slider-instance"></ComponentSliderProperty1SliderDefault>
      <div className="property-1__frame-70">
        <div className="property-1___0">0% </div>
        <div className="property-1___50">50% </div>
        <div className="property-1___100">100% </div>
      </div>
    </div>
  )
}

import './ComponentSliderProperty1SliderDefault.css'

import { Slider } from '../Slider/Slider'

export interface IComponentSliderProperty1SliderDefaultProps {
  property1?: 'slider-long' | 'slider-short' | 'slider-system' | 'slider-default'
  className?: string
}

export const ComponentSliderProperty1SliderDefault = ({
  property1 = 'slider-default',
  className,
  ...props
}: IComponentSliderProperty1SliderDefaultProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'component-slider-property-1-slider-default ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <Slider className="component-slider-property-1-slider-default__slider-instance"></Slider>
    </div>
  )
}

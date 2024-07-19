import './Slider.css'

export interface ISliderProps {
  className?: string
}

export const Slider = ({ className, ...props }: ISliderProps): JSX.Element => {
  return (
    <div className={'slider ' + className}>
      <img className="slider__frame-602" src="/modal/frame-6020.svg" />
    </div>
  )
}

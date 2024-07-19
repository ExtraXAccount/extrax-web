import './MainProperty1Default.css'

export interface IMainProperty1DefaultProps {
  property1?: 'default' | 'hover'
  className?: string
}

export const MainProperty1Default = ({
  property1 = 'default',
  className,
  ...props
}: IMainProperty1DefaultProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'main-property-1-default ' + className + ' ' + variantsClassName}>
      <div className="main-property-1-default__frame-481715">
        <div className="main-property-1-default__confirm">Confirm </div>
      </div>
    </div>
  )
}

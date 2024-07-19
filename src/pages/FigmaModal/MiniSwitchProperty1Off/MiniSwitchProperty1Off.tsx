import './MiniSwitchProperty1Off.css'

export interface IMiniSwitchProperty1OffProps {
  property1?: 'off' | 'on'
  className?: string
}

export const MiniSwitchProperty1Off = ({
  property1 = 'on',
  className,
  ...props
}: IMiniSwitchProperty1OffProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <img
      className={'mini-switch-property-1-off ' + className + ' ' + variantsClassName}
      src="/modal/mini-switch-property-1-off.svg"
    />
  )
}

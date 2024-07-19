import './MoeInfoProperty1Def.css'

export interface IMoeInfoProperty1DefProps {
  property1?: 'hover' | 'def'
  className?: string
}

export const MoeInfoProperty1Def = ({
  property1 = 'def',
  className,
  ...props
}: IMoeInfoProperty1DefProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <img
      className={'moe-info-property-1-def ' + className + ' ' + variantsClassName}
      src="/modal/moe-info-property-1-def.svg"
    />
  )
}

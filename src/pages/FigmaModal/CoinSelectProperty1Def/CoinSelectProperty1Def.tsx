import './CoinSelectProperty1Def.css'

export interface ICoinSelectProperty1DefProps {
  property1?: 'hover' | 'def'
  className?: string
}

export const CoinSelectProperty1Def = ({
  property1 = 'def',
  className,
  ...props
}: ICoinSelectProperty1DefProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <img
      className={'coin-select-property-1-def ' + className + ' ' + variantsClassName}
      src="/modal/coin-select-property-1-def.svg"
    />
  )
}

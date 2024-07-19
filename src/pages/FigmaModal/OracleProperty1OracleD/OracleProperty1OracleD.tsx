import './OracleProperty1OracleD.css'

export interface IOracleProperty1OracleDProps {
  property1?: 'oracle-h' | 'oracle-d'
  className?: string
}

export const OracleProperty1OracleD = ({
  property1 = 'oracle-d',
  className,
  ...props
}: IOracleProperty1OracleDProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'oracle-property-1-oracle-d ' + className + ' ' + variantsClassName}>
      <img className="oracle-property-1-oracle-d__image-99" src="/modal/image-990.png" />
    </div>
  )
}

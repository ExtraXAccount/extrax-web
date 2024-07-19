import './Component288Property1Max.css'

export interface IComponent288Property1MaxProps {
  property1?: 'max' | 'max-hover'
  className?: string
}

export const Component288Property1Max = ({
  property1 = 'max',
  className,
  ...props
}: IComponent288Property1MaxProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={'component-288-property-1-max ' + className + ' ' + variantsClassName}
    >
      <div className="component-288-property-1-max__max">Max </div>
    </div>
  )
}

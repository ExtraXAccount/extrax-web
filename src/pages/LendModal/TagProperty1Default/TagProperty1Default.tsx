import './TagProperty1Default.css'

export interface ITagProperty1DefaultProps {
  property1?: 'default' | 'selected'
  className?: string
}

export const TagProperty1Default = ({
  property1 = 'selected',
  className,
  ...props
}: ITagProperty1DefaultProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'tag-property-1-default ' + className + ' ' + variantsClassName}>
      <div className="tag-property-1-default___3-x-apy">3x APY </div>
    </div>
  )
}

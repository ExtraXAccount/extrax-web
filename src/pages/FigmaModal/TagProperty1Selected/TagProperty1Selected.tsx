import './TagProperty1Selected.css'

export interface ITagProperty1SelectedProps {
  property1?: 'default' | 'selected'
  className?: string
}

export const TagProperty1Selected = ({
  property1 = 'selected',
  className,
  ...props
}: ITagProperty1SelectedProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div className={'tag-property-1-selected ' + className + ' ' + variantsClassName}>
      <div className="tag-property-1-selected___3-x-apy">3x APY </div>
    </div>
  )
}

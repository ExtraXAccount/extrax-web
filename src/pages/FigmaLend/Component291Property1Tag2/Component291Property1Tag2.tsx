import styles from './Component291Property1Tag2.module.css'

export interface IComponent291Property1Tag2Props {
  property1?: 'tag-0' | 'tag-1' | 'tag-2'
  className?: string
}

export const Component291Property1Tag2 = ({
  property1 = 'tag-0',
  className,
  ...props
}: IComponent291Property1Tag2Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component291Property1Tag2 + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.mainMarket}>Main Market </div>
    </div>
  )
}

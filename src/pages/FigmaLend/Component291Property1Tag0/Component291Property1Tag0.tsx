import styles from './Component291Property1Tag0.module.css'

export interface IComponent291Property1Tag0Props {
  property1?: 'tag-0' | 'tag-1' | 'tag-2'
  className?: string
}

export const Component291Property1Tag0 = ({
  property1 = 'tag-0',
  className,
  ...props
}: IComponent291Property1Tag0Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component291Property1Tag0 + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.frame482201}>
        <div className={styles.mainMarket}>Main Market </div>
      </div>
    </div>
  )
}

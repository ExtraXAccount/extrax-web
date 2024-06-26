import styles from './Component174Property1Component140.module.css'

export interface IComponent174Property1Component140Props {
  property1?: 'component-140' | 'component-173'
  className?: string
}

export const Component174Property1Component140 = ({
  property1 = 'component-140',
  className,
  ...props
}: IComponent174Property1Component140Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component174Property1Component140 +
        ' ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className={styles.leverageApps}>Leverage Apps </div>
    </div>
  )
}

import styles from './Component200Property1Default.module.css'

export interface IComponent200Property1DefaultProps {
  property1?: 'default' | 'component-193' | 'null'
  className?: string
}

export const Component200Property1Default = ({
  property1 = 'default',
  className,
  ...props
}: IComponent200Property1DefaultProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component200Property1Default + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.borrow}>Borrow </div>
    </div>
  )
}

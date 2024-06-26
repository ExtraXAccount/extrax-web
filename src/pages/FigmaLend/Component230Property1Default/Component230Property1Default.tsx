import styles from './Component230Property1Default.module.css'

export interface IComponent230Property1DefaultProps {
  property1?: 'default' | 'hover'
  className?: string
}

export const Component230Property1Default = ({
  property1 = 'default',
  className,
  ...props
}: IComponent230Property1DefaultProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component230Property1Default + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.supply}>Supply </div>
    </div>
  )
}

import styles from './Component194Property1Default.module.css'

export interface IComponent194Property1DefaultProps {
  property1?: 'default' | 'component-193' | 'null'
  className?: string
}

export const Component194Property1Default = ({
  property1 = 'default',
  className,
  ...props
}: IComponent194Property1DefaultProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component194Property1Default + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.supply}>Supply </div>
    </div>
  )
}

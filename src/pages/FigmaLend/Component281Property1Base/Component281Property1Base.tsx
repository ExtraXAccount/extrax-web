import styles from './Component281Property1Base.module.css'

export interface IComponent281Property1BaseProps {
  property1?: 'velo' | 'op' | 'coin' | 'usdc' | 'base'
  className?: string
}

export const Component281Property1Base = ({
  property1 = 'coin',
  className,
  ...props
}: IComponent281Property1BaseProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component281Property1Base + ' ' + className + ' ' + variantsClassName
      }
    >
      <img className={styles.image102} src="image-1020.png" />
    </div>
  )
}

import styles from './Component169Property1Component1.module.css'

export interface IComponent169Property1Component1Props {
  property1?: 'component-1' | 'component-168' | 'wrong-network'
  className?: string
}

export const Component169Property1Component1 = ({
  property1 = 'component-1',
  className,
  ...props
}: IComponent169Property1Component1Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component169Property1Component1 + ' ' + className + ' ' + variantsClassName
      }
    >
      <img className={styles.frame7} src="frame-70.png" />
      <div className={styles.zeroX0E693F19}>0x0e69...3f19 </div>
      <div className={styles.frame6}>
        <div className={styles.gearshape}>
          <img className={styles.group} src="group0.svg" />
        </div>
      </div>
    </div>
  )
}

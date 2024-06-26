import styles from './Component172Property1Component171.module.css'

export interface IComponent172Property1Component171Props {
  property1?: 'component-170' | 'component-171'
  className?: string
}

export const Component172Property1Component171 = ({
  property1 = 'component-170',
  className,
  ...props
}: IComponent172Property1Component171Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component172Property1Component171 +
        ' ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className={styles.frame6}>
        <img className={styles.group} src="group0.svg" />
      </div>
      <div className={styles.frame7}>
        <img className={styles.group2} src="group1.svg" />
      </div>
    </div>
  )
}

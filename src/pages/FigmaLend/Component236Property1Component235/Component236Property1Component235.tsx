import styles from './Component236Property1Component235.module.css'

export interface IComponent236Property1Component235Props {
  property1?: 'component-235' | 'frame-481964'
  className?: string
}

export const Component236Property1Component235 = ({
  property1 = 'component-235',
  className,
  ...props
}: IComponent236Property1Component235Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component236Property1Component235 +
        ' ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className={styles.extraFiFarmLend}>ExtraFi(Farm/Lend) </div>
    </div>
  )
}

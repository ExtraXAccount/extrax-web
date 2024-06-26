import styles from './Component189Property1Frame9.module.css'

export interface IComponent189Property1Frame9Props {
  property1?: 'frame-1277' | 'frame-9'
  className?: string
}

export const Component189Property1Frame9 = ({
  property1 = 'frame-9',
  className,
  ...props
}: IComponent189Property1Frame9Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component189Property1Frame9 + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.section}>Section </div>
    </div>
  )
}

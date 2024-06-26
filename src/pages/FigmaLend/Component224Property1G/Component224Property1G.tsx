import styles from './Component224Property1G.module.css'

export interface IComponent224Property1GProps {
  property1?: 'a' | 'g' | 'm' | 'p'
  className?: string
}

export const Component224Property1G = ({
  property1 = 'g',
  className,
  ...props
}: IComponent224Property1GProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.component224Property1G + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.frame481945}>
        <div className={styles.c}>C </div>
      </div>
      <div className={styles.conservative}>Conservative </div>
    </div>
  )
}

import styles from './Component173.module.css'

export interface IComponent173Props {
  className?: string
}

export const Component173 = ({
  className,
  ...props
}: IComponent173Props): JSX.Element => {
  return (
    <div className={styles.component173 + ' ' + className}>
      <div className={styles.mainAccount}>Main Account </div>
      <img className={styles.frame6} src="frame-60.svg" />
    </div>
  )
}

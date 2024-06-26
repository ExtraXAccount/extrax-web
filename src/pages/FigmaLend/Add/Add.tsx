import styles from './Add.module.css'

export interface IAddProps {
  className?: string
}

export const Add = ({ className, ...props }: IAddProps): JSX.Element => {
  return (
    <div className={styles.add + ' ' + className}>
      <div className={styles.div}>🎉 </div>
    </div>
  )
}

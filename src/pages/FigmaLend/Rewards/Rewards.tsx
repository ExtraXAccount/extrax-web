import styles from './Rewards.module.css'

export interface IRewardsProps {
  className?: string
}

export const Rewards = ({ className, ...props }: IRewardsProps): JSX.Element => {
  return (
    <div className={styles.rewards + ' ' + className}>
      <div className={styles.div}>🎁 </div>
    </div>
  )
}

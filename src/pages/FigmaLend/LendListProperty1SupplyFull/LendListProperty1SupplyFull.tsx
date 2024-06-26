import { Add } from '../Add/Add'
import { CoinProperty1UsdCoinUsdc } from '../CoinProperty1UsdCoinUsdc/CoinProperty1UsdCoinUsdc'
import { Component194Property1Default } from '../Component194Property1Default/Component194Property1Default'
import { Component200Property1Default } from '../Component200Property1Default/Component200Property1Default'
import { Rewards } from '../Rewards/Rewards'
import styles from './LendListProperty1SupplyFull.module.css'

export interface ILendListProperty1SupplyFullProps {
  className?: string
}

export const LendListProperty1SupplyFull = ({
  className,
  ...props
}: ILendListProperty1SupplyFullProps): JSX.Element => {
  return (
    <div className={styles.lendListProperty1SupplyFull + ' ' + className}>
      <div className={styles.frame164}>
        <div className={styles.group9}>
          <CoinProperty1UsdCoinUsdc
            property1="usd-coin-usdc"
            className={styles.coinInstance}
          ></CoinProperty1UsdCoinUsdc>
        </div>
        <div className={styles.frame482119}>
          <div className={styles.frame171}>
            <div className={styles.usdc}>USDC </div>
            <div className={styles.component229}>
              <div className={styles.isolated}>Isolated </div>
            </div>
          </div>
          <div className={styles.wallet1623}>Wallet: $16.23 </div>
        </div>
      </div>
      <div className={styles.frame333}>
        <div className={styles.frame482187}>
          <div className={styles.six441230}>6,441,230 </div>
          <div className={styles.six4412302}>$6,441,230 </div>
        </div>
        <img className={styles.subtract} src="subtract0.svg" />
      </div>
      <div className={styles.frame481889}>
        <div className={styles.frame482192}>
          <div className={styles.two441230}>2,441,230 </div>
          <div className={styles.two4412302}>$2,441,230 </div>
        </div>
        <div className={styles.group481641}>
          <div className={styles.ellipse6}></div>
          <div className={styles.ellipse5}></div>
        </div>
      </div>
      <div className={styles.frame481892}>
        <div className={styles.three841230}>3,841,230 </div>
        <div className={styles.three8412302}>$3,841,230 </div>
      </div>
      <div className={styles.four33}>43.3% </div>
      <div className={styles.zero8}>0.8 </div>
      <div className={styles.frame481891}>
        <div className={styles.frame482154}>
          <Add className={styles.addInstance}></Add>
          <div className={styles.five78}>5.78% </div>
        </div>
        <Component194Property1Default
          className={styles.component201Instance}
        ></Component194Property1Default>
      </div>
      <div className={styles.frame481890}>
        <div className={styles.frame482155}>
          <Rewards className={styles.rewardsInstance}></Rewards>
          <div className={styles.one298}>12.98% </div>
        </div>
        <Component200Property1Default
          className={styles.component200Instance}
        ></Component200Property1Default>
      </div>
    </div>
  )
}

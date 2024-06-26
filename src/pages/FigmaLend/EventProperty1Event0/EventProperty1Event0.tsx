import styles from './EventProperty1Event0.module.css'

export interface IEventProperty1Event0Props {
  property1?: 'event-0' | 'event-1'
  className?: string
}

export const EventProperty1Event0 = ({
  property1 = 'event-0',
  className,
  ...props
}: IEventProperty1Event0Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={styles.eventProperty1Event0 + ' ' + className + ' ' + variantsClassName}
    >
      <div
        className={styles.frame482206}
        style={{
          background: 'url(frame-4822060.png) center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.frame482216}>
          <div className={styles.event}>Event </div>
          <div
            className={
              styles.theTrunkUsdcPoolOffersIncreasedLtvToAllowALeveragedPositionUpTo4XHigherLeverageComesAtTheCostOfIncreasedLiquidationRiskSoProceedWithCaution
            }
          >
            The TRUNK/USDC pool offers increased LTV to allow a leveraged position up to
            4x. Higher leverage comes at the cost of increased liquidation risk so proceed
            with caution.{' '}
          </div>
        </div>
      </div>
      <div
        className={styles.frame4822162}
        style={{
          background: 'url(frame-4822161.png) center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.frame482216}>
          <div className={styles.event1}>Event 1 </div>
          <div
            className={
              styles.theTrunkUsdcPoolOffersIncreasedLtvToAllowALeveragedPositionUpTo4XHigherLeverageComesAtTheCostOfIncreasedLiquidationRiskSoProceedWithCaution
            }
          >
            The TRUNK/USDC pool offers increased LTV to allow a leveraged position up to
            4x. Higher leverage comes at the cost of increased liquidation risk so proceed
            with caution.{' '}
          </div>
        </div>
      </div>
      <div className={styles.frame482215}>
        <img className={styles.frame} src="frame0.svg" />
      </div>
      <div className={styles.frame482217}></div>
    </div>
  )
}

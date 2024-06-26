import styles from './CoinProperty1UsdCoinUsdc.module.css'

export interface ICoinProperty1UsdCoinUsdcProps {
  property1?: 'bitcoin-btc' | 'ethereum-eth' | 'usd-coin-usdc'
  className?: string
}

export const CoinProperty1UsdCoinUsdc = ({
  property1 = 'bitcoin-btc',
  className,
  ...props
}: ICoinProperty1UsdCoinUsdcProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.coinProperty1UsdCoinUsdc + ' ' + className + ' ' + variantsClassName
      }
    >
      <img className={styles.usdCoinUsdc} src="usd-coin-usdc0.svg" />
    </div>
  )
}

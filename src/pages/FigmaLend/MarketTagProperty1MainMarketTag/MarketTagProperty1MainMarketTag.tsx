import styles from './MarketTagProperty1MainMarketTag.module.css'

export interface IMarketTagProperty1MainMarketTagProps {
  property1?: 'degen-market-tag' | 'lrt-market-tag' | 'main-market-tag'
  className?: string
}

export const MarketTagProperty1MainMarketTag = ({
  property1 = 'main-market-tag',
  className,
  ...props
}: IMarketTagProperty1MainMarketTagProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.marketTagProperty1MainMarketTag + ' ' + className + ' ' + variantsClassName
      }
    >
      <div className={styles.mainMarket}>Main Market </div>
    </div>
  )
}

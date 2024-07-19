import './CoinProperty1UsdCoinUsdc.css'

export interface ICoinProperty1UsdCoinUsdcProps {
  property1?: 'bitcoin-btc' | 'ethereum-eth' | 'usd-coin-usdc'
  className?: string
}

export const CoinProperty1UsdCoinUsdc = ({
  property1 = 'bitcoin-btc',
  className,
  ...props
}: ICoinProperty1UsdCoinUsdcProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={'coin-property-1-usd-coin-usdc ' + className + ' ' + variantsClassName}
    >
      <img
        className="coin-property-1-usd-coin-usdc__usd-coin-usdc"
        src="/modal/usd-coin-usdc0.svg"
      />
    </div>
  )
}

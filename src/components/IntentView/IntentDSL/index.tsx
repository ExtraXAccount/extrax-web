import './index.scss'

export default function IntentDSL() {
  const value = `@Deposit 1000 $USDC
@Borrow 500 $USDC
@Borrow 0.9 $WETH
@Farm POOL UniswapV3 WETH/USDC
@Rebalance`
  return (
    <div className="intent-dsl">
      <textarea name="" id="" cols={30} rows={10} value={value}></textarea>
    </div>
  )
}

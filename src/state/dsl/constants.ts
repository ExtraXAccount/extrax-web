export const uniswapDSL = `@Borrow 500 $USDC
@Borrow 0.9 $WETH
@Farm POOL UniswapV3 WETH/USDC with RANGE -10% +10%
@AutoCompound
@AutoRebalance
@RangeStop with RANGE -10%`

export const daiDSL = `@Borrow 1000 $DAI
@Farm POOL Spark sDAI
`

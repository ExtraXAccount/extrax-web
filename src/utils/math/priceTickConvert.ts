import { Price, Token } from '@uniswap/sdk-core'
import { nearestUsableTick, priceToClosestTick, tickToPrice } from '@uniswap/v3-sdk'
import JSBI from 'jsbi'

const baseExp = 1.0001

export const tickSpacingMap = {
  100: 2,
  500: 10,
  3000: 60,
  10000: 200,
}

export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x)
}

export const tick2token1price = (tick: number, token0decimals: number, token1decimals: number) => {
  return Math.pow(baseExp, tick) * Math.pow(10, token0decimals - token1decimals)
}

export const tick2token0price = (tick: number, token0decimals: number, token1decimals: number) => {
  return 1 / tick2token1price(tick, token0decimals, token1decimals)
}

// export function tick2price(tick: number, token0decimals = 18, token1decimals = 18) {
//   const tk0 = new Token(1, '0x0000000000000000000000000000000000000000', token0decimals)
//   const tk1 = new Token(1, '0x0000000000000000000000000000000000000001', token1decimals)
//   const res = tickToPrice(tk0, tk1, tick)
//   return Number(res.toFixed(10))
// }

export function token1price2tick(price: number, token0decimals = 18, token1decimals = 18) {
  const tick = getBaseLog(baseExp, price * Math.pow(10, token1decimals - token0decimals))
  return Math.round(tick)
}

export function token0price2tick(price: number, token0decimals = 18, token1decimals = 18) {
  return token1price2tick(1 / price, token0decimals, token1decimals)
}

export function token0price2latestUsabletick(
  price: number,
  token0decimals = 18,
  token1decimals = 18,
  tickSpacing: number
) {
  const tick = token0price2tick(price, token0decimals, token1decimals)
  return nearestUsableTick(tick, tickSpacing)
}

export function price2latestTick(price: number, token0decimals = 18, token1decimals = 18) {
  const tk0 = new Token(1, '0x0000000000000000000000000000000000000000', token0decimals)
  const tk1 = new Token(1, '0x0000000000000000000000000000000000000001', token1decimals)
  const closest = priceToClosestTick(
    new Price(
      tk0,
      tk1,
      JSBI.multiply(JSBI.BigInt(price), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token0decimals))),
      JSBI.multiply(JSBI.BigInt(1), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(token1decimals)))
    )
  )
  return closest
}

export function price2latestUsableTick(price: number, token0decimals = 18, token1decimals = 18, tickSpacing: number) {
  const closest = price2latestTick(price, token0decimals, token1decimals)
  const cloestUsable = nearestUsableTick(closest, tickSpacing)
  return cloestUsable
}

// export function price2tick(price: number, tickSpacing: number) {
//   const tick = getBaseLog(baseExp, price)
//   return nearestUsableTick(Math.round(tick), tickSpacing)
// }

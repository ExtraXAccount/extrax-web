import { FeeAmount, nearestUsableTick } from '@uniswap/v3-sdk'
import JSBI from 'jsbi'

import { Tick } from '@/types/uniswap.interface'
// import { toFixed } from '@/utils/math'
// import { toBNString } from '@/utils/math/bn'
import { tick2token0price } from '@/utils/math/priceTickConvert'

// const PRICE_FIXED_DIGITS = 8

export interface TickProcessed {
  tick: number
  liquidityActive: JSBI
  liquidityNet: JSBI
  price0: number
}

// Computes the numSurroundingTicks above or below the active tick.
export default function computeSurroundingTicks(
  token0decimals: number,
  token1decimals: number,
  activeTickProcessed: TickProcessed,
  sortedTickData: Tick[],
  pivot: number,
  ascending: boolean,
): TickProcessed[] {
  let previousTickProcessed: TickProcessed = {
    ...activeTickProcessed,
  }
  // Iterate outwards (either up or down depending on direction) from the active tick,
  // building active liquidity for every tick.
  let processedTicks: TickProcessed[] = []
  for (
    let i = pivot + (ascending ? 1 : -1);
    ascending ? i < sortedTickData.length : i >= 0;
    ascending ? i++ : i--
  ) {
    const tick = Number(sortedTickData[i].tickIdx)
    const currentTickProcessed: TickProcessed = {
      liquidityActive: previousTickProcessed.liquidityActive,
      tick,
      liquidityNet: JSBI.BigInt(sortedTickData[i].liquidityNet),
      price0: tick2token0price(tick, token0decimals, token1decimals),
    }

    // Update the active liquidity.
    // If we are iterating ascending and we found an initialized tick we immediately apply
    // it to the current processed tick we are building.
    // If we are iterating descending, we don't want to apply the net liquidity until the following tick.
    if (ascending) {
      currentTickProcessed.liquidityActive = JSBI.add(
        previousTickProcessed.liquidityActive,
        JSBI.BigInt(sortedTickData[i].liquidityNet),
      )
    } else if (
      !ascending &&
      JSBI.notEqual(previousTickProcessed.liquidityNet, JSBI.BigInt(0))
    ) {
      // We are iterating descending, so look at the previous tick and apply any net liquidity.
      currentTickProcessed.liquidityActive = JSBI.subtract(
        previousTickProcessed.liquidityActive,
        previousTickProcessed.liquidityNet,
      )
    }

    processedTicks.push(currentTickProcessed)
    previousTickProcessed = currentTickProcessed
  }

  if (!ascending) {
    processedTicks = processedTicks.reverse()
  }

  return processedTicks
}

export function getPoolLiquidityDensity(
  token0decimals: number,
  token1decimals: number,
  ticks: Tick[],
  liquidity: string | number,
  tickCurrent: number,
  feeAmount: FeeAmount,
) {
  const activeTick = nearestUsableTick(tickCurrent, feeAmount)

  // find where the active tick would be to partition the array
  // if the active tick is initialized, the pivot will be an element
  // if not, take the previous tick as pivot
  const pivot = ticks.findIndex(({ tickIdx }) => Number(tickIdx) > activeTick) - 1

  if (pivot < 0) {
    // consider setting a local error
    console.error('TickData pivot not found')
    return {
      // isLoading,
      // error,
      activeTick,
      data: undefined,
    }
  }

  const activeTickProcessed: TickProcessed = {
    liquidityActive: JSBI.BigInt(liquidity),
    tick: activeTick,
    liquidityNet:
      Number(ticks[pivot].tickIdx) === activeTick
        ? JSBI.BigInt(ticks[pivot].liquidityNet)
        : JSBI.BigInt(0),
    price0: tick2token0price(activeTick, token0decimals, token1decimals),
  }

  const subsequentTicks = computeSurroundingTicks(
    token0decimals,
    token1decimals,
    activeTickProcessed,
    ticks,
    pivot,
    true,
  )

  const previousTicks = computeSurroundingTicks(
    token0decimals,
    token1decimals,
    activeTickProcessed,
    ticks,
    pivot,
    false,
  )

  const ticksProcessed = previousTicks.concat(activeTickProcessed).concat(subsequentTicks)

  return {
    activeTick,
    data: ticksProcessed,
  }
}

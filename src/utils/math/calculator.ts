// import { FARM_FEE } from '@/constants/fees';
import { getDaysApy } from '@/utils/math'

const FARM_FEE = 0
/**
  Eo – initial supplied assets (initial equity value)
  Ei – final equity value, as defined by Position minus Debt. Doesn’t include ALPACA rewards.
  d – number of days farming
  Po – initial position value
  Pi – final position value
  Do – initial debt value
  Di – final debt value
  L - leverage
  LP% - change in LP asset value (100% = unchanged). In calculator, this equals sqrt(%Bow * %Far), where %Far = change in non-borrowed token.
  Bor% - change in borrow token (100% = unchanged)
  Equity = [(Eo*L*LP% + (Eo*L*LP%+Eo*L)/2 * [exp(Far_APR * d/365)-1]) - (Eo*(L-1)*(x * a% + y * b%) + (Eo*(L-1)*(x * a% + y * b%)+ Eo*(L-1))/2 * [exp((x * aAPR + y * bAPR) * d/365)-1])]
  Bor_APR – Borrowing interest APR (calculated from pool utilization)
  Far_APR – Yield Farming APR + Trading Fees APR at 1x leverage
 * @param param0 
 * @returns 
 */
export function getEquityChange({
  E0 = 1,
  L = 1,
  FAR_APR = 0,
  days = 0,
  C0 = {
    change: 1,
    borRate: 1,
    apr: 0,
  },
  C1 = {
    change: 1,
    borRate: 0,
    apr: 0,
  },
  byPer = true,
  returnDebtRatio = false,
}) {
  C0.borRate = C0.borRate || 0
  C1.borRate = C1.borRate || 0
  const weightBorAPR = C0.borRate * C0.apr + C1.borRate * C1.apr
  const weightChange = C0.borRate * C0.change + C1.borRate * C1.change
  const LPChange = Math.sqrt(C0.change * C1.change)
  const P0 = E0 * L
  const Pi = E0 * L * LPChange
  const Position = Pi + ((P0 + Pi) / 2) * getDaysApy(FAR_APR * (1 - FARM_FEE), days)
  // const Position = Pi + (P0 * FAR_APR * days) / 365
  const D0 = E0 * (L - 1)
  const Di = E0 * (L - 1) * weightChange
  const Debt = Di + ((Di + D0) / 2) * getDaysApy(weightBorAPR, days)
  // const Debt = Di + (((Di + D0) / 2) * (1 + weightBorAPR) * days) / 365
  // const Debt2 = Di + ((D0 * days) / 365) * (C0.borRate * C0.apr * C0.change + C1.borRate * C1.apr * C1.change)
  if (returnDebtRatio) {
    return Debt / Position
  }
  const Equity = Position - Debt

  if (!byPer) {
    return Equity
  }
  return Equity / E0
}

function getQuadraticEquationRoots(a: number, b: number, c: number) {
  if (a === 0) {
    return [-c / b]
  }
  const delta = b ** 2 - 4 * a * c
  // console.log('getQuadraticEquationRoots', a, b, c, delta);
  if (delta < 0) {
    return []
  }
  const root0 = -b / (2 * a)
  if (delta === 0) {
    return [root0]
  }
  return [root0 + Math.sqrt(delta) / (2 * a), root0 - Math.sqrt(delta) / (2 * a)]
}

export function getLiquadationPos({
  lqdThreshold,
  E0 = 1,
  L = 1,
  FAR_APR = 0,
  days = 0,
  C0 = {
    change: 1,
    borRate: 1,
    apr: 0,
  },
  C1 = {
    change: 'x',
    borRate: 0,
    apr: 0,
  },
}) {
  /**
   * solve for C1.change
   *
   * Debt / Position = lqdThreshold
   * Position = Pi + (P0 + Pi) / 2 * getDaysApy(FAR_APR, days)
   * Debt = Di + (Di + D0) / 2 * getDaysApy(weightBorAPR, days)
   * P0 = E0 * L
   * D0 = E0 * (L - 1)
   * Pi = E0 * L * LPChange
   * Di = E0 * (L - 1) * weightChange
   * weightBorAPR = C0.borRate * C0.apr + C1.borRate * C1.apr
   * weightChange = C0.borRate * C0.change + C1.borRate * C1.change
   * LPChange = Math.sqrt(C0.change * C1.change)
   */
  // console.log('getLiquadationPos :>> ', {
  //   lqdThreshold,
  //   L,
  //   days,
  //   FAR_APR,
  //   C0,
  //   C1,
  // })

  const weightBorAPR = C0.borRate * C0.apr + C1.borRate * C1.apr
  // const weightChange = C0.borRate * C0.change + C1.borRate * C1.change;
  // const LPChange = Math.sqrt(C0.change * C1.change);
  const P0 = E0 * L
  // const Pi = E0 * L * LPChange;
  const D0 = E0 * (L - 1)
  // const Di = E0 * (L - 1) * weightChange;

  const APY1 = getDaysApy(FAR_APR * (1 - FARM_FEE), days)
  const APY2 = getDaysApy(weightBorAPR, days)
  const A = E0 * (L - 1) * C1.borRate * (1 + APY2 / 2)
  const a = A ** 2
  const C = (1 + APY2 / 2) * E0 * (L - 1) * C0.change * C0.borRate + (APY2 * D0 - lqdThreshold * APY1 * P0) / 2
  const b = 2 * A * C - ((1 + APY1 / 2) * lqdThreshold * E0 * L) ** 2 * C0.change
  const c = C ** 2

  const results = getQuadraticEquationRoots(a, b, c).filter((item) => {
    if (item <= 0) {
      return false
    }
    const weightChange = C0.borRate * C0.change + C1.borRate * item
    // const LPChange = Math.sqrt(C0.change * item);
    // const P0 = E0 * L;
    // const Pi = E0 * L * LPChange;
    // const Position = Pi + (P0 + Pi) / 2 * (Math.E ** (FAR_APR * days / 365) - 1);
    // const Position = Pi + (P0 + Pi) / 2 * APY1;
    // const D0 = E0 * (L - 1);
    const Di = E0 * (L - 1) * weightChange
    // const Debt = Di + (Di + D0) / 2 * ((Math.E ** (weightBorAPR * days / 365) - 1));
    const Debt = Di + ((Di + D0) / 2) * APY2
    // Position = Debt / lqdThreshold
    const LPChange = (Debt / lqdThreshold - (P0 * APY1) / 2) / (1 + APY1 / 2) / (E0 * L)
    return LPChange >= 0
  })

  // console.log('getLiquadationPos :>> ', {
  //   results,
  //   // eslint-disable-next-line prefer-rest-params
  //   arg: arguments[0],
  // });
  return results.sort()
}

export function getStopLossPos({
  stopLoss,
  E0 = 1,
  L = 1,
  FAR_APR = 0,
  days = 0,
  C0 = {
    change: 1,
    borRate: 1,
    apr: 0,
    baseValue: 0,
  },
  C1 = {
    change: 'x',
    borRate: 0,
    apr: 0,
    baseValue: 0,
  },
}) {
  /**
   * solve for C1.change
   * Position - Debt = (c0.change * c0.baseVal + c1.change * c0.baseVal) * (1 - stopLoss)
   * Position = Pi + (P0 + Pi) / 2 * getDaysApy(FAR_APR, days)
   * Debt = Di + (Di + D0) / 2 * getDaysApy(weightBorAPR, days)
   * P0 = E0 * L
   * D0 = E0 * (L - 1)
   * Pi = E0 * L * LPChange
   * Di = E0 * (L - 1) * weightChange
   * weightBorAPR = C0.borRate * C0.apr + C1.borRate * C1.apr
   * weightChange = C0.borRate * C0.change + C1.borRate * C1.change
   * LPChange = Math.sqrt(C0.change * C1.change)
   */

  const weightBorAPR = C0.borRate * C0.apr + C1.borRate * C1.apr
  // const weightChange = C0.borRate * C0.change + C1.borRate * C1.change;
  // const LPChange = Math.sqrt(C0.change * C1.change);
  const P0 = E0 * L
  // const Pi = E0 * L * LPChange;
  const D0 = E0 * (L - 1)
  // const Di = E0 * (L - 1) * weightChange;
  const restRatio = 1 - stopLoss / 100
  const APY1 = getDaysApy(FAR_APR * (1 - FARM_FEE), days)
  const APY2 = getDaysApy(weightBorAPR, days)
  const Af = APY1 / 2
  const Ad = APY2 / 2
  const temp = (1 + Ad) * E0 * (L - 1)
  const A = temp * C1.borRate + restRatio * C1.baseValue
  const a = A ** 2
  const C = temp * C0.borRate * C0.change + Ad * D0 - Af * P0 + C0.baseValue * restRatio
  const b = 2 * A * C - ((1 + Af) * P0) ** 2 * C0.change
  const c = C ** 2

  const results = getQuadraticEquationRoots(a, b, c).filter((item) => {
    if (item <= 0) {
      return false
    }
    const weightChange = C0.borRate * C0.change + C1.borRate * item
    const Di = E0 * (L - 1) * weightChange
    const Debt = Di + ((Di + D0) / 2) * APY2
    const rest = (C0.baseValue + C1.baseValue * item) * restRatio
    const LPChange = (Debt + rest - P0 * Af) / (1 + Af) / (E0 * L)
    return LPChange >= 0
  })

  // console.log('getStopLossPos :>> ', {
  //   results,
  //   // eslint-disable-next-line prefer-rest-params
  //   arg: arguments[0],
  // });
  return results.sort()
}

export function getFarmApy({
  L = 1,
  FAR_APR = 0,
  days = 365,
  C0 = {
    change: 1,
    borRate: 1,
    apr: 0,
  },
  C1 = {
    change: 1,
    borRate: 0,
    apr: 0,
  },
}) {
  return (
    getEquityChange({
      L,
      FAR_APR,
      days,
      C0,
      C1,
    }) - 1
  )
}

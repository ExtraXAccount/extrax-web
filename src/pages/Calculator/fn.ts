import { PoolDayData, Tick } from '@/types/uniswap.interface'
import { getEstimateFee24H } from '@/uniswap/math'

export function getHistoricalAprFromPool({
  backDays = 30,
  Pl,
  Pu,
  feeTier,
  token0Decimals,
  token1Decimals,
  token0Count0,
  token1Count0,
  poolTicks,
  v3PoolDaysData,
}: // reverseBaseToken = false,
{
  backDays: number
  Pl: number
  Pu: number
  feeTier: number
  token0Decimals: number
  token1Decimals: number
  token0Count0: number
  token1Count0: number
  poolTicks: Tick[]
  v3PoolDaysData: PoolDayData[]
  // reverseBaseToken?: boolean
}) {
  const backDaysData = v3PoolDaysData.slice(0, backDays)
  function getEquityChangeData() {
    function getFeesByDays({ token1price, token1price0, volume, days = 1 }) {
      // const estimateFee = calc24HrFee(poolDayData, token0.decimals, token1.decimals);
      const estimateFee =
        days *
        getEstimateFee24H({
          priceAssumptionValue: token1price,
          Pl,
          Pu,
          token1price0,
          token0price0: 1,
          token0Decimal: token0Decimals,
          token1Decimal: token1Decimals,
          depositAmountUSD: token1Count0 * token1price0 + token0Count0,
          volume24H: volume,
          feeTier,
          poolTicks: poolTicks || [],
        })

      return estimateFee
    }

    function getTokenPrice(poolDayData: PoolDayData) {
      return parseFloat(poolDayData.volumeToken0) / parseFloat(poolDayData.volumeToken1)
      // return !reverseBaseToken
      // ? parseFloat(poolDayData.volumeToken0) / parseFloat(poolDayData.volumeToken1)
      // : parseFloat(poolDayData.volumeToken1) / parseFloat(poolDayData.volumeToken0)
    }

    let accFee = 0
    if (!backDaysData.length || !poolTicks.length) {
      return accFee
    }
    // const poolData = [...backDaysData].reverse()
    // const data0 = poolData[0] || ({} as PoolDayData)
    // const poolData = backDaysData
    const data0 = backDaysData[backDaysData.length - 1] || ({} as PoolDayData)
    // const token1price0 = (Number(data0.open) + Number(data0.close)) / 2;
    // const token1price0 = parseFloat(data0.volumeUSD) / parseFloat(data0.volumeToken1);
    const token1price0 = getTokenPrice(data0)
    const principal = token1Count0 * token1price0 + token0Count0
    backDaysData.forEach((item, index) => {
      const token1price = getTokenPrice(item)
      accFee += getFeesByDays({
        token1price,
        token1price0,
        // volume: !reverseBaseToken ? parseFloat(item.volumeToken0) : parseFloat(item.volumeToken1),
        volume: parseFloat(item.volumeToken0),
      })
    })
    return (accFee / principal) * (365 / backDays)
  }

  const equityChangeData = getEquityChangeData()
  // console.log('equityChangeData :>> ', equityChangeData, backDays)
  return equityChangeData
}

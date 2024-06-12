import dayjs from 'dayjs'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  // CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import useDebouncedMemo from '@/hooks/useDebouncedMemo'
import usePoolBaseInfo from '@/hooks/usePoolBaseInfo'
import { usePoolHourData } from '@/hooks/usePoolDayData'
import usePoolTicks from '@/hooks/usePoolTicks'
// import { PoolDayData } from '@/types/uniswap.interface'
// import { averageArray, getEstimateFee24H, strategyV3 } from '@/uniswap/math'
// import isH5 from '@/utils/isH5'
import { parsePrice, toPrecisionNum } from '@/utils/math'

// import { price2tick } from '@/utils/math/priceTickConvert'
import { getPoolLiquidityDensity } from './computeSurroundingTicks'

export default function PriceChart(props: any) {
  // const v3PoolDaysData = usePoolDayData(props?.poolId)
  const { token0Price, token1Price, tick, liquidity } = usePoolBaseInfo(props?.poolId)
  const hourData = usePoolHourData(props?.poolId)
  const poolTicks = usePoolTicks(props?.poolId)

  const {
    feeTier,
    reverseBaseToken,
    minVal,
    maxVal,
    token0 = {
      name: 'USDC',
      currentPrice: 1,
      token0Info: {},
    },
    token1 = {
      name: 'SOL',
      currentPrice: 1,
      token1Info: {},
    },
    style,
  } = useDebouncedMemo(() => props, [props], props.deboucneDelay || 100)

  const liquidityDensity = useMemo(() => {
    if (!poolTicks.length || !token1.token1Info || !token0.token0Info) {
      return {
        activeTick: 0,
        data: [],
      }
    }

    const result = getPoolLiquidityDensity(
      Number(token0.token0Info.decimals),
      Number(token1.token1Info.decimals),
      poolTicks,
      liquidity,
      Number(tick),
      feeTier,
    )
    return result
  }, [poolTicks, token1.token1Info, token0.token0Info, liquidity, tick, feeTier])

  const vertLiquidityData = useMemo(() => {
    if (!minVal && !maxVal) {
      return []
    }

    const priceCharData = liquidityDensity.data
      .filter((item) => {
        const price = reverseBaseToken ? 1 / item.price0 : item.price0
        return (
          parseFloat(item.liquidityActive.toString()) > 0 &&
          price >= minVal &&
          price <= maxVal
        )
      })
      .map((item) => {
        return {
          liquidity: parseFloat(item.liquidityActive.toString()),
          price: reverseBaseToken ? 1 / item.price0 : item.price0,
        }
      })

    // console.log('priceCharData :>> ', priceCharData, minVal, maxVal)
    return priceCharData
  }, [liquidityDensity.data, reverseBaseToken, maxVal, minVal])

  const priceLineData = useMemo(() => {
    if (!hourData.length) {
      return []
    }
    function getValueByBaseToken(val) {
      if (!val) {
        return 0
      }
      return toPrecisionNum(reverseBaseToken ? 1 / Number(val) : Number(val), 6)
    }
    return hourData.map((item) => {
      return {
        time: dayjs(item.periodStartUnix * 1000).format('MM/DD'),
        price: getValueByBaseToken(item.open),
        price0: parsePrice(token0Price),
      }
    })
  }, [hourData, reverseBaseToken, token0Price])

  return (
    <div className="farm-page-charts-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          layout="vertical"
          width={500}
          height={300}
          data={vertLiquidityData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="areaFill" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#117EFF" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#1180FF" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            type="number"
            domain={([min, max]) => [min, max * 1.2]}
            tick={null}
            axisLine={false}
          />
          <YAxis
            reversed
            type="number"
            dataKey="price"
            domain={[minVal, maxVal]}
            tick={null}
            axisLine={false}
          />
          {/* <Tooltip /> */}
          <Legend
            iconType="plainline"
            verticalAlign="top"
            wrapperStyle={{
              top: 10,
            }}
          />
          <Area
            dataKey="liquidity"
            strokeWidth={2}
            stroke="#009BF2"
            fill="url(#areaFill)"
            dot={false}
          />
          {/* <Line dataKey="uv" stroke="#82ca9d" /> */}
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%" className="echart-price">
        <LineChart
          width={500}
          height={300}
          data={priceLineData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <Legend
            verticalAlign="top"
            iconType="plainline"
            wrapperStyle={{
              top: 10,
              paddingLeft: 150,
            }}
          />
          <Tooltip />
          <XAxis
            type="category"
            dataKey="time"
            tick={{ fontSize: 12 }}
            axisLine={true}
            // tick={null}
            // axisLine={false}
            minTickGap={40}
            stroke="rgba(0,30,88,0.45)"
          />
          <YAxis
            type="number"
            dataKey="price"
            tick={{ fontSize: 12 }}
            axisLine={true}
            // tick={null}
            // axisLine={false}
            minTickGap={20}
            domain={[minVal, maxVal]}
            stroke="rgba(0,30,88,0.45)"
          />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="price"
            stroke="#82ca9d"
            dot={false}
          />
          {/* <Line type="linear" strokeWidth={2} dataKey="price0" stroke="#82ca9d" strokeDasharray="5 5" dot={false} /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

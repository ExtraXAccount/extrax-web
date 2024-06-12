import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  // CartesianGrid,
  Legend,
  // Line,
  // LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import useDebouncedMemo from '@/hooks/useDebouncedMemo'
import usePoolDayData from '@/hooks/usePoolDayData'
import usePoolTicks from '@/hooks/usePoolTicks'
import { PoolDayData } from '@/types/uniswap.interface'
import { getEstimateFee24H, strategyV3 } from '@/uniswap/math'
// import isH5 from '@/utils/isH5'
import { toPrecisionNum } from '@/utils/math'

export default function BackTestChart(props: any) {
  useEffect(() => {
    console.log('BackTestChart props :>> ', props)
  }, [props])
  const v3PoolDaysData = usePoolDayData(props?.poolId)
  const poolTicks = usePoolTicks(props?.poolId)
  const [chartStyle, setChartStyle] = useState({
    'Assets Value': { opacity: 0.6 },
    Fee: { opacity: 0.6 },
  })

  const {
    backDays,
    Pl,
    Pu,
    feeTier,
    reverseBaseToken,
    token0 = {
      name: 'USDC',
      currentPrice: 1,
      count0: 0,
      decimals: '6',
    },
    token1 = {
      name: 'SOL',
      currentPrice: 0,
      count0: 0,
      decimals: '6',
    },
    style,
  } = useDebouncedMemo(() => props, [props], props.deboucneDelay || 100)

  const getEquityChangeData = useCallback(
    (_backDays) => {
      const backDaysData = v3PoolDaysData.slice(0, _backDays)
      function getEquityChangeData() {
        const result = {
          v3: [] as number[][],
          v3AssetValue: [] as number[][],
          v3Fee: [] as number[][],
          v2: [] as number[][],
          hodl: [] as number[][],
          rechartsData: [] as any[],
        }

        function getUpdateAsset(token1price, token1price0) {
          const assetsValue = strategyV3({
            investment: token1.count0 * token1price0 + token0.count0,
            currentPrice: token1price0,
            minPrice: Pl,
            maxPrice: Pu,
            futurePrice: token1price,
          })
          return assetsValue
        }

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
              token0Decimal: token0.decimals,
              token1Decimal: token1.decimals,
              depositAmountUSD: token1.count0 * token1price0 + token0.count0,
              volume24H: volume,
              feeTier,
              poolTicks: poolTicks || [],
            })

          return estimateFee
        }

        function getTokenPrice(poolDayData: PoolDayData) {
          return !reverseBaseToken
            ? parseFloat(poolDayData.volumeToken0) / parseFloat(poolDayData.volumeToken1)
            : parseFloat(poolDayData.volumeToken1) / parseFloat(poolDayData.volumeToken0)
        }

        let accFee = 0
        if (!backDaysData.length || !poolTicks.length) {
          return result
        }
        const poolData = [...backDaysData].reverse()
        const data0 = poolData[0] || ({} as PoolDayData)
        // const token1price0 = (Number(data0.open) + Number(data0.close)) / 2;
        // const token1price0 = parseFloat(data0.volumeUSD) / parseFloat(data0.volumeToken1);
        const token1price0 = getTokenPrice(data0)
        const userBaseTotalValue = token1.count0 * token1price0 + token0.count0
        poolData.forEach((item, index) => {
          // const token1price = (Number(item.open) + Number(item.close)) / 2;
          // const token0price = parseFloat(item.volumeUSD) / parseFloat(item.volumeToken0);
          const token1price = getTokenPrice(item)
          // const token1price = Number(item.volumeToken0) / (Number(item.volumeToken1));
          // console.log('priceChange :>> ', token1price, token1price0, item);
          accFee += getFeesByDays({
            token1price,
            token1price0,
            // poolDayData: item,
            volume: !reverseBaseToken
              ? parseFloat(item.volumeToken0)
              : parseFloat(item.volumeToken1),
          })
          const assetsValue = getUpdateAsset(token1price, token1price0)
          // if (index === 0) {
          //   console.log('v3 :>> ', {
          //     token1price,
          //     token1price0,
          //     data0,
          //     accFee,
          //     assetsValue,
          //   });
          // }
          result.v3.push([item.date * 1000, accFee + assetsValue])
          result.v3Fee.push([
            item.date * 1000,
            // assetsValue,
            accFee,
            // (accFee + assetsValue) / userBaseTotalValue,
          ])
          result.v3AssetValue.push([
            item.date * 1000,
            assetsValue,
            // accFee,
            // (accFee + assetsValue) / userBaseTotalValue,
          ])

          const hodlEquity = token0.count0 + token1.count0 * token1price
          result.hodl.push([item.date * 1000, hodlEquity])
          result.rechartsData.push({
            date: item.date * 1000,
            time: dayjs(item.date * 1000).format('MM/DD'),
            'Assets Value': toPrecisionNum(assetsValue / userBaseTotalValue),
            Fee: toPrecisionNum(accFee / userBaseTotalValue),
            // v3: accFee + assetsValue,
            hodl: toPrecisionNum(hodlEquity / userBaseTotalValue),
          })
        })
        return result
      }

      const equityChangeData = getEquityChangeData()
      // console.log('equityChangeData :>> ', equityChangeData, _backDays)
      return equityChangeData
    },
    [Pl, Pu, feeTier, token0, token1, poolTicks, v3PoolDaysData, reverseBaseToken],
  )

  const echartsData = useMemo(() => {
    const equityChangeData = getEquityChangeData(backDays)
    return equityChangeData.rechartsData
  }, [backDays, getEquityChangeData])

  const handleMouseEnter = useCallback(
    (params) => {
      const { dataKey } = params
      setChartStyle({
        ...chartStyle,
        [dataKey]: {
          opacity: 1,
        },
      })
    },
    [chartStyle],
  )

  const handleMouseLeave = useCallback(
    (params) => {
      const { dataKey } = params
      setChartStyle({
        ...chartStyle,
        [dataKey]: {
          opacity: 0.6,
        },
      })
    },
    [chartStyle],
  )

  return (
    <div className="calculator-charts-wrapper">
      <ResponsiveContainer height={400}>
        <AreaChart
          // width={500}
          // height={400}
          data={echartsData}
          margin={{
            top: 20,
            right: 60,
            left: 0,
            bottom: 40,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis
            minTickGap={10}
            tickFormatter={(val) => toPrecisionNum(val * 100) + '%'}
          />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            verticalAlign="top"
            height={36}
            iconType="rect"
            iconSize={20}
          />
          <Tooltip
            formatter={(val) => {
              return toPrecisionNum((val as any) * 100) + '%'
            }}
          />
          <Area
            type="monotone"
            dataKey="Assets Value"
            stackId="1"
            stroke="#009BF2"
            fill="#009BF2"
            fillOpacity={chartStyle['Assets Value'].opacity}
          />
          <Area
            type="monotone"
            dataKey="Fee"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={chartStyle.Fee.opacity}
          />
          {/* <Area type="monotone" dataKey="v3" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

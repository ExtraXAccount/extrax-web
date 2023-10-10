import './index.scss'

// import cx from 'classnames';
import dayjs from 'dayjs'
import ECharts, { EChartsOption } from 'echarts-for-react'
import { isNil, round } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

import useDebouncedMemo from '@/hooks/useDebouncedMemo'
import usePoolBaseInfo from '@/hooks/usePoolBaseInfo'
import usePoolDayData from '@/hooks/usePoolDayData'
import usePoolTicks from '@/hooks/usePoolTicks'
import { PoolDayData } from '@/types/uniswap.interface'
import { averageArray, getEstimateFee24H, strategyV3 } from '@/uniswap/math'
import isH5 from '@/utils/isH5'
import { formatFloatNumber, toPrecisionNum } from '@/utils/math'

import { getPoolLiquidityDensity } from './computeSurroundingTicks'
import { getHistoricalAprFromPool } from './fn'
import { LightweightChart } from './LightweightChart'

export default function V3EChart(props: any) {
  const { tick, liquidity } = usePoolBaseInfo(props?.poolId)
  const v3PoolDaysData = usePoolDayData(props?.poolId)
  const poolTicks = usePoolTicks(props?.poolId)

  const volume24H = useMemo(() => {
    const volumes = v3PoolDaysData.map((d: { volumeUSD: string }) => Number(d.volumeUSD))
    return averageArray(volumes)
  }, [v3PoolDaysData])

  const {
    days,
    backDays,
    Pl,
    Pu,
    feeTier,
    reverseBaseToken,
    token0 = {
      name: 'USDC',
      currentPrice: 1,
      baseValue: 0,
      decimals: '6',
    },
    token1 = {
      name: 'SOL',
      currentPrice: 0,
      baseValue: 0,
      decimals: '6',
    },
    pointCount = 200,
    xAxisMin = -1,
    xAxisMax = 1,
    echartInitLegendSelected = {
      // 'Initial Equity': false,
      // 'Principal': false,
      'V3 Strategy': true,
      'Unbounded(V2)': false,
      HODL: true,
      // 'StopLoss': true,
    },
    style,
  } = useDebouncedMemo(() => props, [props], props.deboucneDelay || 100)

  const [legendSelected, setLegendSelected] = useState(echartInitLegendSelected)
  const [xAxisRange, setXAxisRange] = useState([-1, 1])
  const [showZoomSlider, setShowZoomSlider] = useState(false)
  const [backtestApr, setBacktestApr] = useState(0)

  const echartOption = useMemo(() => {
    function getEquityChangeData(days: number) {
      const result = {
        v3: [] as number[][],
        v2: [] as number[][],
        hodl: [] as number[][],
      }

      if (!volume24H || !poolTicks.length) {
        return result
      }
      function getEquityChange(priceChange) {
        const assetsValue = strategyV3({
          investment: token1.baseValue + token0.baseValue,
          currentPrice: token1.currentPrice,
          minPrice: Pl,
          maxPrice: Pu,
          futurePrice: token1.currentPrice * priceChange,
        })

        const estimateFee =
          days *
          getEstimateFee24H({
            priceAssumptionValue: token1.currentPrice * priceChange,
            Pl,
            Pu,
            token1price0: token1.currentPrice,
            token0price0: token0.currentPrice,
            token0Decimal: token0.decimals,
            token1Decimal: token1.decimals,
            depositAmountUSD: token1.baseValue + token0.baseValue,
            volume24H: volume24H || 0,
            feeTier,
            poolTicks: poolTicks || [],
          })
        // let estimateFee = 0;
        // for( let index = 0; index < days * 1; index++) {
        //   estimateFee += 1 / 1 * getEstimateFee24H({
        //     priceAssumptionValue: token1.currentPrice * (1 + (priceChange - 1) * index / days / 1) ,
        //     Pl,
        //     Pu,
        //     token1price0: token1.currentPrice,
        //     token0price0: token0.currentPrice,
        //     token0Decimal: token0.decimals,
        //     token1Decimal: token1.decimals,
        //     depositAmountUSD: token1.baseValue + token0.baseValue,
        //     volume24H: volume24H || 0,
        //     feeTier,
        //     poolTicks: poolTicks || [],
        //   });
        // }

        return assetsValue + estimateFee
      }

      const userBaseTotalValue = token1.baseValue + token0.baseValue
      for (let index = 0; index < pointCount; index++) {
        const token1PriceChange: number = index * ((xAxisMax - xAxisMin) / pointCount) + xAxisMin
        const v3Value = getEquityChange(1 + token1PriceChange)

        const hodlEquity = (token0.baseValue + token1.baseValue * (1 + token1PriceChange)) / userBaseTotalValue

        result.v3.push([token1PriceChange, v3Value / userBaseTotalValue])
        result.hodl.push([token1PriceChange, hodlEquity])
        // result.principal.push([token1PriceChange, 1]);
      }
      return result
    }

    const equityChangeData = getEquityChangeData(days)

    const token1CurrentPriceBaseOnToken0 = token1.currentPrice / token0.currentPrice
    const series = [
      {
        type: 'line',
        name: 'V3 Strategy',
        symbol: 'none',
        data: equityChangeData.v3,
        smooth: true,
        lineStyle: {
          color: '#5dd170',
          width: 2,
        },
      },
      {
        type: 'line',
        name: 'Unbounded(V2)',
        symbol: 'none',
        data: equityChangeData.v2,
        smooth: true,
        // lineStyle: {
        //   type: 'dotted',
        //   color: '#5dd170',
        //   width: 2
        // },
      },
      {
        type: 'line',
        name: 'HODL',
        symbol: 'none',
        data: equityChangeData.hodl,
        smooth: true,
        lineStyle: {
          type: 'solid',
          color: '#fff',
          width: 1,
        },
      },
    ]

    const echartOption: EChartsOption = {
      title: {
        text: 'Strategy Performance Forecast',
        left: 'center',
        top: '4%',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        width: 500,
        height: 50,
        bottom: showZoomSlider ? 5 : 40,
        left: 'center',
        orient: 'vertical',
        type: 'plain',
        itemWidth: 50,
        itemHeight: 10,
        // padding: [5, 10],
        // align: 'left',
        itemGap: 8,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        itemStyle: {
          color: 'transparent',
        },
        selected: legendSelected,
      },
      grid: {
        left: isH5 ? '20%' : '15%',
        right: isH5 ? '5%' : '15%',
        top: 90,
        // bottom: 115,
        bottom: 145,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: any) {
          const { value } = params[0]
          return `
          <div>
            <p>${token1.name}/${token0.name} Price Change: ${round(value[0] * 100)}%</p>
            <p>${token1.name} Price: ${formatFloatNumber(token1CurrentPriceBaseOnToken0 * (1 + value[0]))}${
            token0.name
          }</p>
            <p>Equity(V3 Stratety): ${formatFloatNumber(value[1] * 100)}%</p>
          </div>
          `
        },
      },
      xAxis: {
        type: 'value',
        name: `${token1.name} price (${token0.name})`,
        nameLocation: 'center',
        nameGap: showZoomSlider ? 80 : 40,
        nameTextStyle: {
          fontWeight: 'bolder',
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
        },
        axisLabel: {
          interval: 1,
          rotate: 25,
          hideOverlap: true,
          formatter(value: number) {
            return `${formatFloatNumber(token1CurrentPriceBaseOnToken0 * (1 + value))}`
          },
        },
        splitNumber: isH5 ? 6 : 10,
      },
      yAxis: {
        type: 'value',
        name: `Equity (% of ${'principle'})`,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontWeight: 'bolder',
        },
        min: 0,
        axisLabel: {
          formatter(value: number) {
            if (value >= 100) {
              return `${(value * 100).toPrecision(2).replace(/\+/g, '')}%`
            }
            return `${round(value * 100)}%`
          },
        },
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        splitNumber: isH5 ? 6 : 10,
      },
      dataZoom: [
        {
          disabled: !showZoomSlider,
          type: 'inside',
          startValue: xAxisRange[0],
          endValue: xAxisRange[1],
          zoomLock: true,
          moveOnMouseWheel: false,
        },
        {
          show: showZoomSlider,
          startValue: xAxisRange[0],
          endValue: xAxisRange[1],
          minValueSpan: 0.2,
          type: 'slider',
          bottom: 80,
          dataBackground: {
            // lineStyle: {
            //   color: '#5dd170',
            // },
            // areaStyle: {
            //   color: '',
            //   opacity: 0,
            // },
          },
          showDataShadow: true,
          textStyle: {
            color: '#fff',
          },
          labelFormatter(value) {
            return `${formatFloatNumber(token1CurrentPriceBaseOnToken0 * (1 + value))}`
          },
        },
      ],
      series,
    }

    // console.log('echartOption', xAxisRange, echartOption.dataZoom);
    return echartOption
  }, [
    days,
    token1.currentPrice,
    token1.name,
    token1.baseValue,
    token1.decimals,
    token0.currentPrice,
    token0.name,
    token0.baseValue,
    token0.decimals,
    showZoomSlider,
    legendSelected,
    xAxisRange,
    volume24H,
    poolTicks,
    Pl,
    Pu,
    feeTier,
    pointCount,
    xAxisMax,
    xAxisMin,
  ])

  useEffect(() => {
    const apr = getHistoricalAprFromPool({
      backDays: 30,
      Pl,
      Pu,
      feeTier,
      token0Decimals: token0.decimals,
      token1Decimals: token1.decimals,
      token0Count0: token0.count0,
      token1Count0: token1.count0,
      poolTicks,
      v3PoolDaysData,
      // reverseBaseToken,
    })
    console.log('apr :>> ', apr)
    setBacktestApr(apr)
  }, [
    Pl,
    Pu,
    backDays,
    feeTier,
    poolTicks,
    reverseBaseToken,
    token0.count0,
    token0.decimals,
    token1.count0,
    token1.decimals,
    v3PoolDaysData,
  ])

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
        // const userBaseTotalValue = token1.count0 * token1price0 + token0.count0;
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
            volume: !reverseBaseToken ? parseFloat(item.volumeToken0) : parseFloat(item.volumeToken1),
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
        })
        return result
      }

      const equityChangeData = getEquityChangeData()
      console.log('equityChangeData :>> ', equityChangeData, _backDays)
      return equityChangeData
    },
    [Pl, Pu, feeTier, token0, token1, poolTicks, v3PoolDaysData, reverseBaseToken]
  )

  const echartOptionBacktest = useMemo(() => {
    const equityChangeData = getEquityChangeData(backDays)
    // const token1CurrentPriceBaseOnToken0  = token1.currentPrice / token0.currentPrice;
    const series = [
      // {
      //   type: 'line',
      //   name: 'V3 Strategy',
      //   symbol: 'none',
      //   data: equityChangeData.v3,
      //   smooth: true,
      //   lineStyle: {
      //     color: '#5dd170',
      //     width: 2
      //   },
      // },
      {
        type: 'line',
        name: 'V3 LP Value',
        symbol: 'none',
        data: equityChangeData.v3AssetValue,
        smooth: true,
        // lineStyle: {
        //   color: '#5dd170',
        //   type: 'dotted',
        //   width: 2
        // },
        stack: 'v3Strategy',
        areaStyle: {},
      },
      {
        type: 'line',
        name: 'V3 Fee',
        symbol: 'none',
        data: equityChangeData.v3Fee,
        smooth: true,
        // lineStyle: {
        //   color: '#5dd170',
        //   type: 'dotted',
        //   width: 2
        // },
        stack: 'v3Strategy',
        areaStyle: {},
      },
      // {
      //   type: 'line',
      //   name: 'Price',
      //   symbol: 'none',
      //   data: [...backDaysData].reverse().map(item => {
      //     return [
      //       item.date * 1000,
      //       !reverseBaseToken ? Number(item.volumeToken0) / Number(item.volumeToken1)
      //         : Number(item.volumeToken1) / Number(item.volumeToken0)
      //     ];
      //   }),
      //   smooth: true,
      // },
      {
        type: 'line',
        name: 'HODL',
        symbol: 'none',
        data: equityChangeData.hodl,
        smooth: true,
        lineStyle: {
          type: 'solid',
          color: '#fff',
          width: 1,
        },
      },
    ]

    const echartOption: EChartsOption = {
      title: {
        text: 'Strategy Performance Backtest',
        left: 'center',
        top: '4%',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        width: 500,
        height: 50,
        bottom: showZoomSlider ? 5 : 40,
        left: 'center',
        orient: 'vertical',
        type: 'plain',
        itemWidth: 50,
        itemHeight: 10,
        // padding: [5, 10],
        // align: 'left',
        itemGap: 8,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        itemStyle: {
          color: 'transparent',
        },
        selected: {
          // 'V3 Strategy': false,
          // 'Unbounded(V2)': false,
          // 'Price': true,
          'V3 LP Value': true,
          'V3 Fee': true,
          HODL: true,
        },
      },
      grid: {
        left: isH5 ? '20%' : '15%',
        right: isH5 ? '5%' : '15%',
        top: 90,
        // bottom: 115,
        bottom: 145,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: any) {
          // console.log('tooltip :>> ', {params, rest});
          const [{ value: assetsValue }, { value: v3Fee }, { value: price }] = params
          // const { value } = params[0];
          return `
          <div>
            <p>Time: ${dayjs(assetsValue[0]).format('YYYY/MM/DD')}</p>
            <p>${token1.name} Price: ${formatFloatNumber(price[1])}</p>
            <p>Fee: ${formatFloatNumber(v3Fee[1])}</p>
            <p>LP Value: ${formatFloatNumber(assetsValue[1])}</p>
            <p>Position Value: ${formatFloatNumber(assetsValue[1] + v3Fee[1])}</p>
          </div>
          `
        },
      },
      xAxis: {
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: `Value in ${token0.name}`,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontWeight: 'bolder',
        },
        min: 0,
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        splitNumber: isH5 ? 6 : 10,
      },
      series,
    }
    return echartOption
  }, [backDays, getEquityChangeData, token0, showZoomSlider, token1.name])

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
      feeTier
    )
    return result
  }, [poolTicks, token1.token1Info, token0.token0Info, liquidity, tick, feeTier])

  const lwcCandleData = useMemo(() => {
    const daysData = v3PoolDaysData.slice(0, 60).reverse()
    if (!daysData.length) {
      return []
    }
    function getValueByBaseToken(val) {
      if (!val) {
        return 0
      }
      return toPrecisionNum(reverseBaseToken ? 1 / Number(val) : Number(val), 4)
    }

    // let minVal = getValueByBaseToken(daysData[0].low)
    // let maxVal = getValueByBaseToken(daysData[0].high)
    // daysData.forEach((item) => {
    //   minVal = Math.min(minVal, getValueByBaseToken(item.low), getValueByBaseToken(item.close))
    //   maxVal = Math.max(maxVal, getValueByBaseToken(item.high), getValueByBaseToken(item.close))
    // })
    // console.log('minVal :>> ', minVal, maxVal)
    // const minValue = daysData.reduce((acc, item) => {
    //   return Math.min(acc, getValueByBaseToken(item.low), getValueByBaseToken(item.close));
    // }, getValueByBaseToken(daysData[0].low) || 0);

    const candleData = daysData.map((item, index) => {
      return {
        time: item.date,
        open: getValueByBaseToken(daysData[index - 1]?.close || item.open),
        close: getValueByBaseToken(item.close),
        low: Math.min(
          getValueByBaseToken(item.low),
          getValueByBaseToken(item.close),
          getValueByBaseToken(daysData[index - 1]?.close || item.open)
        ),
        high: Math.max(
          getValueByBaseToken(item.high),
          getValueByBaseToken(item.close),
          getValueByBaseToken(daysData[index - 1]?.close || item.open)
        ),
      }
    })
    console.log('lwcCandleData :>> ', candleData)
    return candleData
  }, [reverseBaseToken, v3PoolDaysData])

  const vertLiquidityData = useMemo(() => {
    const daysData = v3PoolDaysData.slice(0, 60).reverse()
    if (!daysData.length) {
      return []
    }
    function getValueByBaseToken(val) {
      if (!val) {
        return 0
      }
      return toPrecisionNum(reverseBaseToken ? 1 / Number(val) : Number(val), 4)
    }

    let minVal = getValueByBaseToken(daysData[0].low)
    let maxVal = getValueByBaseToken(daysData[0].high)
    daysData.forEach((item) => {
      minVal = Math.min(minVal, getValueByBaseToken(item.low), getValueByBaseToken(item.close))
      maxVal = Math.max(maxVal, getValueByBaseToken(item.high), getValueByBaseToken(item.close))
    })

    const formatData = (data) => {
      if (!data?.length) {
        return []
      }
      const newData = [] as number[][]

      for (let i = 1; i < data.length - 1; i++) {
        const t = data[i]
        const chartEntry = {
          activeLiquidity: parseFloat(t.liquidityActive.toString()),
          price0: parseFloat(t.price0),
        }
        const scale = 1.02
        if (
          chartEntry.activeLiquidity > 0 &&
          chartEntry.price0 > minVal / scale &&
          chartEntry.price0 < maxVal * scale
        ) {
          newData.push([chartEntry.activeLiquidity / 10 ** 15, chartEntry.price0])
          // newData.push([chartEntry.price0, chartEntry.activeLiquidity / 10 ** 15])
        }
      }

      return newData
    }
    const priceCharData = formatData(liquidityDensity.data)
    // console.log('priceCharData :>> ', priceCharData)
    return priceCharData
  }, [liquidityDensity.data, reverseBaseToken, v3PoolDaysData])

  const echartOptionCandle = useMemo(() => {
    const daysData = v3PoolDaysData.slice(0, 60).reverse()
    if (!daysData.length) {
      return {}
    }
    function getValueByBaseToken(val) {
      if (!val) {
        return 0
      }
      return toPrecisionNum(reverseBaseToken ? 1 / Number(val) : Number(val), 4)
    }

    const candleData = daysData.map((item, index) => {
      return [
        getValueByBaseToken(daysData[index - 1]?.close || item.open),
        getValueByBaseToken(item.close),
        Math.min(
          getValueByBaseToken(item.low),
          getValueByBaseToken(item.close),
          getValueByBaseToken(daysData[index - 1]?.close || item.open)
        ),
        Math.max(
          getValueByBaseToken(item.high),
          getValueByBaseToken(item.close),
          getValueByBaseToken(daysData[index - 1]?.close || item.open)
        ),
      ]
    })

    const series = [
      {
        type: 'candlestick',
        name: 'Day',
        symbol: 'none',
        data: candleData,
        itemStyle: {
          color: '#aed7c7',
          color0: '#e06666',
          borderColor: undefined,
          borderColor0: undefined,
        },
      },
      {
        type: 'line',
        // type: 'bar',
        name: 'Price',
        symbol: 'none',
        data: vertLiquidityData,
        itemStyle: {
          color: '#5470c6',
        },
        xAxisIndex: 1,
        // yAxisIndex: 1,
        step: true,
        // areaStyle: {
        //   color: 'rgb(56, 33, 110)',
        //   opacity: 0.2,
        // },
      },
    ]

    const echartOption: EChartsOption = {
      title: {
        text: `${token1.name} Daily Prices`,
        left: 'center',
        top: '4%',
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        left: isH5 ? '20%' : '15%',
        right: isH5 ? '5%' : '15%',
        top: 90,
        bottom: 145,
      },
      tooltip: {
        trigger: 'axis',
        formatter(params: any) {
          const [{ name, value }] = params
          return `
          <div>
            <p>Time: ${name}</p>
            <p>Open: ${toPrecisionNum(value[1], 4)}</p>
            <p>Close: ${toPrecisionNum(value[2], 4)}</p>
            <p>High: ${toPrecisionNum(value[4], 4)}</p>
            <p>Low: ${toPrecisionNum(value[3], 4)}</p>
          </div>
          `
        },
      },
      xAxis: [
        {
          type: 'category',
          data: daysData.map((item) => dayjs(item.date * 1000).format('YYYY/MM/DD')),
          axisLabel: {
            formatter(value) {
              return dayjs(value).format('MM/DD')
            },
          },
          axisLine: {
            lineStyle: {
              color: '#eee',
            },
          },
        },
        {
          type: 'value',
          smooth: true,
          scale: true,
          // min: 0,
          max(value) {
            return value.max * 1.5
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: {
        type: 'value',
        name: `${token1.name} Price in ${token0.name}`,
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: {
          fontWeight: 'bolder',
        },
        scale: true,
        axisLabel: {
          formatter(value: number) {
            return round(value, 2)
          },
        },
        axisLine: {
          lineStyle: {
            color: '#eee',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        splitNumber: isH5 ? 6 : 10,
      },
      series,
    }
    return echartOption
  }, [v3PoolDaysData, vertLiquidityData, token1.name, token0.name, reverseBaseToken])

  const echartsEventsDict = useMemo(
    () => ({
      legendselectchanged({ selected }) {
        setLegendSelected(selected)
      },
      datazoom(eventData) {
        // console.log('eventData', eventData);
        const { start, end, batch } = eventData
        const length = xAxisMax - xAxisMin
        if (!isNil(start) && !isNil(end)) {
          setXAxisRange([(start / 100) * length + xAxisMin, (end / 100) * length + xAxisMin])
        } else {
          const { start, end } = batch?.[0] || {}
          if (!isNil(start) && !isNil(end)) {
            setXAxisRange([(start / 100) * length + xAxisMin, (end / 100) * length + xAxisMin])
          }
        }
      },
    }),
    [xAxisMin, xAxisMax]
  )

  return (
    <div className="calculator-echarts-wrapper">
      <h4>APR based on the backtest Fee of last 30 days: {round(backtestApr * 100, 2)}%</h4>
      <section className="lightweight-chart">
        <LightweightChart data={lwcCandleData} vertData={vertLiquidityData}></LightweightChart>
      </section>
      <ECharts className="v3-backtest-echarts" option={echartOptionCandle} style={style} />

      <ECharts className="v3-backtest-echarts" option={echartOptionBacktest} style={style} />

      <ECharts className="calculator-echarts" option={echartOption} style={style} onEvents={echartsEventsDict} />
    </div>
  )
}

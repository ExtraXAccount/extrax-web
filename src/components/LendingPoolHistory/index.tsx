import './index.scss'

import { Skeleton } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { find, sortBy, sumBy } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import {
  // CartesianGrid,
  // Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useHistoryData } from '@/hooks/useHistoryData'
import useTheme from '@/hooks/useTheme'
import useLendPoolInfo from '@/pages/LendModal/useLendPoolInfo'
import {
  // aprToApy,
  aprToApy100,
  formatNumberByUnit,
  remain2Decimal,
  toPrecision,
} from '@/utils/math'

import FormattedNumber from '../FormattedNumber'

const chartTypeSet = [
  {
    key: 'apy',
    label: 'Supply APY',
  },
  {
    key: 'tvl',
    label: 'TVL',
  },
]

export default function LendingPoolHistory() {
  const lendPoolInfo = useLendPoolInfo()
  const historyData = useHistoryData()
  const [timeTab, setTimeTab] = useState(14)
  const [chartType, setChartType] = useState(chartTypeSet[0])
  const theme = useTheme()

  const poolList = useMemo(() => {
    const fromTs = Date.now() - timeTab * 24 * 3600 * 1000
    return historyData
      .map((i) => {
        const target =
          find(i.lend, (info) => {
            // return info.id === lendPoolInfo?.reserveId?.toString()
            return (
              info.underlyingTokenAddress?.toLowerCase() ===
              lendPoolInfo?.underlyingAsset?.toLowerCase()
            )
          }) || {}

        return {
          ts: i.ts,
          ...target,
        }
      })
      .filter((i) => i.ts >= fromTs)
  }, [lendPoolInfo, historyData, timeTab])

  const avg = useMemo(() => {
    if (chartType.key === 'apy') {
      return `${remain2Decimal(
        sumBy(poolList, (item) => {
          return aprToApy100(item.apr * 100)
        }) / poolList.length
      )}%`
    } else if (chartType.key === 'tvl') {
      return `${formatNumberByUnit(sumBy(poolList, 'totalLiquidity') / poolList.length)}`
    }
  }, [poolList, chartType.key])

  const lineChartData = useMemo(() => {
    if (!poolList) {
      return []
    }
    return sortBy(poolList, (i) => i.ts).map((i) => {
      return {
        time: dayjs(i.ts).format('MMM D HH:mm'),
        value:
          chartType.key === 'apy' ? remain2Decimal(aprToApy100(i.apr * 100)) : i.totalLiquidity,
      }
    })
  }, [chartType.key, poolList])

  const renderTooltip = useCallback(
    (params) => {
      const { label, payload } = params
      return (
        <div className='custom-tooltip-content'>
          <p key={1}>
            <span>Date: </span>
            <span>{label}</span>
          </p>
          {payload.map((item) => (
            <p key={item.dataKey}>
              <span>{chartType.label}: </span>
              <span>
                {chartType.key === 'apy'
                  ? remain2Decimal(item.value) + '%'
                  : formatNumberByUnit(item.value)}
              </span>
            </p>
          ))}
          <p key={3}>
            <span>{lendPoolInfo?.symbol} price: </span>
            <span>
              <FormattedNumber value={lendPoolInfo?.priceInUSD || 0} symbol='$' />
            </span>
          </p>
        </div>
      )
    },
    [chartType.key, chartType.label, lendPoolInfo?.priceInUSD, lendPoolInfo?.symbol]
  )

  return (
    <div className='pool-history-stats'>
      <div className='lending-history-title'>{lendPoolInfo?.symbol} Pool History Stats</div>

      <div className='flex lending-history-tabbox'>
        <div className='history-avg-stats-wrapper'>
          <p className=''>
            {chartType.label} ({timeTab}D AVG){' '}
          </p>
          <span className=''>
            {!lendPoolInfo ? <Skeleton.Button active size='small' block={false} /> : <>{avg}</>}
          </span>
        </div>
        <div className='page-minitabs page-minitabs-center'>
          {chartTypeSet.map((item) => (
            <a
              key={item.key}
              className={classNames('page-minitabs-item', {
                active: chartType.key === item.key,
              })}
              onClick={() => setChartType(item)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className='page-minitabs'>
          {[7, 14, 30].map((item) => (
            <a
              key={item}
              className={classNames('page-minitabs-item', {
                active: timeTab === item,
              })}
              onClick={() => setTimeTab(item)}
            >
              {item}D
            </a>
          ))}
        </div>
      </div>

      <ResponsiveContainer width={'100%'} height={150} className='lending-history-echarts'>
        <LineChart
          data={lineChartData}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: -10,
          }}
        >
          <XAxis
            type='category'
            dataKey='time'
            tick={{ fontSize: 12 }}
            axisLine={true}
            stroke={theme.labelColor}
          ></XAxis>
          <YAxis
            type='number'
            tick={{ fontSize: 12 }}
            tickFormatter={(value) =>
              chartType.key === 'apy' ? toPrecision(value) + '%' : formatNumberByUnit(value)
            }
            axisLine={true}
            domain={([dataMin, dataMax]) => [dataMin * 0.8, dataMax * 1.2]}
            // domain={[0, 'dataMax']}
            allowDataOverflow={false}
            stroke={theme.labelColor}
          ></YAxis>
          <Line type='basis' dataKey='value' strokeWidth={1} stroke='#7A87FF' dot={false} />

          <Tooltip content={renderTooltip} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

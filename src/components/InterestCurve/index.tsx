import './index.scss'

import { useCallback, useMemo } from 'react'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import useLendPoolInfo from '@/pages/FigmaModal/useLendPoolInfo'
import { toPrecision } from '@/utils/math'
import calculateBorrowingRate from '@/utils/math/borrowInterest'

export default function InterestCurve() {
  const lendPoolInfo = useLendPoolInfo()
  const { interestRateConfig, currentUtilization } = useMemo(() => {
    return {
      interestRateConfig: lendPoolInfo?.interestRateConfig,
      currentUtilization: (lendPoolInfo?.formatted.utilization || 0) * 100,
    }
  }, [lendPoolInfo?.formatted.utilization, lendPoolInfo?.interestRateConfig])

  const lineChartData = useMemo(() => {
    const currentBorrowRate = !interestRateConfig
      ? 0
      : calculateBorrowingRate(currentUtilization * 100, interestRateConfig) / 100
    const fullData = [
      {
        utilization: currentUtilization,
        borrowApr: currentBorrowRate,
        earnApr: (currentBorrowRate * currentUtilization * 0.85) / 100,
      },
    ]

    for (let utilization = 0; utilization < 101; utilization++) {
      const borrowRate = !interestRateConfig
        ? 0
        : calculateBorrowingRate(utilization * 100, interestRateConfig) / 100
      fullData.push({
        utilization,
        borrowApr: borrowRate,
        earnApr: (borrowRate * utilization * 0.85) / 100,
      })
    }
    return fullData.sort((aa, bb) => aa.utilization - bb.utilization)
  }, [currentUtilization, interestRateConfig])

  const renderTooltip = useCallback((params) => {
    const { label, payload: tooltipPayload } = params
    return (
      <div className="interest-curve-tooltip">
        <p key={1}>Utilization Rate: {toPrecision(label, 4)}%</p>
        {tooltipPayload.map((item) => (
          <p key={item.dataKey}>
            {'Borrow APR: '}
            <span className="">{toPrecision(Number(item.value), 4) + '%'}</span>
          </p>
        ))}
      </div>
    )
  }, [])

  return (
    <div className="interest-curve">
      <ResponsiveContainer width={'100%'} height={120}>
        <LineChart
          data={lineChartData}
          margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: -10,
          }}
        >
          <CartesianGrid strokeDasharray="7 3" strokeWidth={0.5} vertical={false} />
          <XAxis
            type="number"
            dataKey="utilization"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${toPrecision(value)}%`}
            axisLine={false}
            ticks={[0, 25, 50, 75, 100]}
            domain={[0, 100]}
          ></XAxis>
          <YAxis
            type="number"
            // orientation="right"
            tick={{ fontSize: 12 }}
            ticks={[0, 50, 100]}
            tickFormatter={(value) => `${toPrecision(value)}%`}
            axisLine={false}
            domain={['dataMin', 'dataMax']}
          ></YAxis>
          <Tooltip content={renderTooltip} cursor />
          <ReferenceLine x={currentUtilization} strokeDasharray="7 3">
            <Label
              strokeWidth={0.5}
              stroke={'#666'}
              letterSpacing={0.2}
              fontSize={10}
              offset={6}
              position={
                Math.abs(
                  currentUtilization - (interestRateConfig?.utilizationB || 0) / 100,
                ) > 20
                  ? 'top'
                  : 'center'
              }
            >
              {`Current ${toPrecision(currentUtilization)}%`}
            </Label>
          </ReferenceLine>
          <ReferenceLine
            x={(interestRateConfig?.utilizationB || 0) / 100}
            strokeDasharray="7 3"
          >
            <Label
              strokeWidth={0.5}
              stroke={'#666'}
              letterSpacing={0.2}
              fontSize={10}
              offset={6}
              position="top"
            >
              {`Optimal ${(interestRateConfig?.utilizationB || 0) / 100}%`}
            </Label>
          </ReferenceLine>
          <Line
            type="basis"
            strokeWidth={1}
            dataKey="borrowApr"
            stroke="#7A8FFF"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

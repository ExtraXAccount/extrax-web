import { useMemo } from 'react'

import {
  addComma,
  formatNumberByUnit,
  formatNumberByUnitWithoutK,
  num2precision,
  toPrecision,
  toPrecisionNum,
} from '@/utils/math'

const UNITS = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y']

export interface FormattedNumberProps {
  value: string | number
  comma?: boolean
  symbol?: string
  precision?: number
  // visibleDecimals?: number
  unit?: boolean
  compact?: boolean
  percent?: boolean
  roundType?: 'floor' | 'ceil' | 'round'
  // remainTrailingZero?: boolean
}

export default function FormattedNumber({
  value,
  percent,
  precision = 3,
  comma = true,
  // visibleDecimals,
  // remainTrailingZero = false,
  symbol,
  unit = false,
  roundType = 'floor',
}: FormattedNumberProps) {
  const num = percent ? Number(value) * 100 : Number(value)

  const formattedNumber = useMemo(() => {
    let result: string | number = num2precision(num, {
      precision,
      roundType,
      // remainTrailingZero,
    })
    // let result = toPrecision(num)
    if (comma && result > 1000) {
      result = result.toLocaleString('en-US')
      // result = addComma(result)
      // const decimals = String(result).split('.')[1]?.length || 0
      // result = Intl.NumberFormat('en-US', {
      //   maximumFractionDigits: decimals,
      //   minimumFractionDigits: decimals,
      // }).format(Number(result))
    }
    if (unit) {
      result = formatNumberByUnitWithoutK(Number(result))
    }
    // console.log('result :>> ', result)
    return result
  }, [comma, num, precision, roundType, unit])

  return (
    <>
      {symbol === '$' && symbol}
      {formattedNumber}
      {percent && '%'}
      {symbol !== '$' && symbol}
    </>
  )
}

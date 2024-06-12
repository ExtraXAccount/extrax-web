import { floor, round } from 'lodash'

export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x)
}

export function toFixed(num: number, precision = 0) {
  return floor(num, precision)
}

// export function exp2string(num: number, precision = 0) {
//   return num.toFixed(precision).replace(/\.?0+$/, '');
// }

export function toFixedNoExp(num: number, precision = 18) {
  return floor(num, precision)
    .toFixed(precision)
    .replace(/\.?0+$/, '')
}

export function toFixedByToken(num: number, token: string, precision = 18) {
  return floor(num, precision)
}

export function toFixedByTokenNoExp(num: number, token: string, precision = 18) {
  return floor(num, precision)
    .toFixed(precision)
    .replace(/\.?0+$/, '')
}

export function remain6Decimal(num: number) {
  if (!num) {
    return 0
  }
  if (num < 1e-6 && num > -1e-6) {
    return 0
  }
  // const numberStr = String(num).replace(/^(.*\..{6}).*$/, '$1');
  // return Number(numberStr);
  return round(num, 6)
}

export function remain4Decimal(num: number) {
  if (!num) {
    return 0
  }
  if (num < 1e-5 && num > -1e-5) {
    return 0
  }
  // const numberStr = String(num).replace(/^(.*\..{4}).*$/, '$1');
  // return Number(numberStr);
  return round(num, 4)
}

export function remain2Decimal(num: number) {
  if (!num) {
    return 0
  }
  if (num < 1e-5 && num > -1e-5) {
    return 0
  }
  // const numberStr = String(num).replace(/^(.*\..{2}).*$/, '$1');
  // return Number(numberStr);
  return round(num, 2)
}

// export function formatFloat(num = 0, n = 2) {
//   const ratio = 10 ** n;
//   return Math.round(num * ratio) / ratio;
// }
export function num2commaStr(num: number) {
  return num.toLocaleString('en-US')
}

export function addComma(numStr: string | number) {
  if (!numStr || isNaN(Number(numStr))) {
    return '0'
  }
  const withFloat = Number(numStr) < 1000
  const intStr = String(Math.floor(Number(numStr)))
  const floatStr = String(numStr).split('.')[1] || ''
  if (withFloat) {
    return (
      intStr.replace(/(?=(\B)(\d{3})+$)/g, ',') +
      (floatStr ? `.${floatStr.slice(0, 2)}` : '')
    )
  }
  return intStr.replace(/(?=(\B)(\d{3})+$)/g, ',')
}

export function range(num: number, min: number, max: number) {
  if (num > max) {
    return max
  } else if (num < min) {
    return min
  }
  return num
}

export function getDynamicFee(bullEquity: number, bearEquity: number) {
  const bullDynamicFee = range(
    -(bullEquity - bearEquity) / (bullEquity * 100),
    -0.01,
    0.01,
  )
  const bearDynamicFee = range(
    (bullEquity - bearEquity) / (bearEquity * 100),
    -0.01,
    0.01,
  )

  // console.log('eee', bullEquity - bearEquity, bullEquity, bearEquity);
  // console.log('bullDynamicFee', bullDynamicFee, bearDynamicFee);
  return {
    bullDynamicFee: Math.abs(bullDynamicFee) < 0.00005 ? 0 : bullDynamicFee,
    bearDynamicFee: Math.abs(bearDynamicFee) < 0.00005 ? 0 : bearDynamicFee,
  }
}

// base apr for 365days
export function aprToApy(apr: number, n = 365) {
  return (1 + apr / n) ** n - 1
}

export function getDaysApy(apr: number, days: number, timesPerDay = 1) {
  return (1 + apr / (timesPerDay * 365)) ** (timesPerDay * days) - 1
}

export function aprToApy100(apr: number, n = 365) {
  return aprToApy(apr / 100) * 100
}

// format to M & K
export function formatNumberByUnit(num: number) {
  if (num > 10 ** 9) {
    return `${num2commaStr(toPrecisionNum(num / 10 ** 9))}B`
  }
  if (num > 10 ** 6) {
    return `${num2commaStr(toPrecisionNum(num / 10 ** 6))}M`
  }
  if (num > 10 ** 3) {
    return `${toPrecision(num / 10 ** 3)}K`
  }
  return `${num2commaStr(toPrecisionNum(num))}`
}

export function formatNumberByUnitWithoutK(num: number) {
  if (num > 10 ** 15) {
    return `> 100,000B`
  }
  if (num > 10 ** 9) {
    return `${num2commaStr(toPrecisionNum(num / 10 ** 9))}B`
  }
  if (num > 10 ** 6) {
    return `${num2commaStr(toPrecisionNum(num / 10 ** 6))}M`
  }
  // if (num > 10 ** 3) {
  //   return `${toPrecision(num / 10 ** 3)}K`
  // }
  return `${num2commaStr(toPrecisionNum(num))}`
}

// format to float
export function formatFloatNumber(num: number) {
  const formatDecimal = (posNum: number) => {
    if (posNum > 1) {
      return remain2Decimal(posNum)
    }
    if (posNum > 0.0001) {
      return remain4Decimal(posNum)
    }
    return remain6Decimal(posNum)
  }

  if (num > 10 ** 20) {
    return Infinity
  }

  if (num < 0) {
    return -formatDecimal(Math.abs(num))
  }
  return formatDecimal(num)
}

function removeTrailingZero(str: string) {
  if (/\.0*$/.test(str)) {
    return str.replace(/\.0*$/g, '')
  }
  if (str.indexOf('.') > -1) {
    return str.replace(/0*$/g, '')
  }
  return str
}

export function toPrecision(num: number, precision = 3) {
  if (!num) {
    return 0
  }
  for (let ii = precision; ii > -1; ii--) {
    if (num >= 10 ** (ii - 1)) {
      return round(num, precision - ii)
    }
  }
  return removeTrailingZero(num.toPrecision?.(precision) || '')
}

export function toPrecisionNum(num: number, precision = 3) {
  return Number(toPrecision(num, precision)) || 0
}

export function parsePrice(price: number | string, isStable = false) {
  return isStable ? toPrecisionNum(Number(price), 6) : toPrecisionNum(Number(price), 3)
}

export function checkTheSmallest(num: number) {
  // if very small, format to 0
  if (num < 1e-6) {
    return 0
  }
  return num
}

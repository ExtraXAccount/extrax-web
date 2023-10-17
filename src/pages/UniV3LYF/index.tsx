import './index.scss'

import { TICK_SPACINGS } from '@uniswap/v3-sdk'
import { InputNumber, Select, Switch } from 'antd/es'
import classNames from 'classnames'
import { round } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Draggable from 'react-draggable'
import { useNavigate, useParams } from 'react-router-dom'

import Loading from '@/components/Loading'
import { useWagmiCtx } from '@/components/WagmiContext'
import stableCoins from '@/constants/stableCoins'
import { TOKEN_LIST } from '@/constants/token'
// import { useFranciumVaultManager } from '@/hooks/useFranciumSDK'
import usePoolInfo from '@/hooks/usePoolInfo'
import usePools from '@/hooks/usePools'
import PriceChart from '@/pages/Calculator/PriceChart'
import { VAULT_CONFIG } from '@/sdk/constants/vaultConfig'
import { Token } from '@/types/uniswap.interface'
import { getFeeTierPercentage } from '@/uniswap/math'
import { formatNumberByUnit, toPrecision, toPrecisionNum } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'
import { token0price2latestUsabletick } from '@/utils/math/priceTickConvert'

import { getHistoricalAprFromPool } from '../Calculator/fn'
import BackTestModal from './BackTestModal'
import Step2 from './Step2'
import Summary from './Summary'
import useBaseTokenSwitch from './useBaseTokenSwitch'

// config
// const initRange = 0.1
const initSupply = 1
const borrowInterest = 0.05
const lv = 3
const priceRangeHeight = 227

export default function UniV3LYF() {
  const { chainId } = useWagmiCtx()
  const navigate = useNavigate()
  const { poolId = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8' } = useParams()
  const v3TopTvlPools = usePools()
  // const poolId = useMemo(() => {
  //   return v3TopTvlPools?.[0]?.id
  // }, [v3TopTvlPools])

  const { baseInfo: poolInfo, daysData: poolDayDatas, ticks: poolTicks } = usePoolInfo(poolId)

  useEffect(() => {
    console.log('usePoolInfo :>> ', { poolInfo, poolDayDatas, poolTicks })
  }, [poolDayDatas, poolInfo, poolTicks])

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [showNextSteps, setShowNextSteps] = useState(false)
  const [priceChartLines, setPriceChartLines] = useState({} as any)
  const [upperPricePos, setUpperPricePos] = useState(0)
  const [lowerPricePos, setLowerPricePos] = useState(0)

  const [upperDragging, setUpperDragging] = useState(false as any)
  const [lowerDragging, setLowerDragging] = useState(false as any)

  const [approvingToken0, setApprovingToken0] = useState(false)
  const [approvingToken1, setApprovingToken1] = useState(false)
  const [depositing, setDepositing] = useState(false)

  const [depositParams, setDepositParams] = useState({
    amount0Borrow: '0',
    amount1Borrow: '0',
    amount0: '0',
    amount1: '0',
  })

  const [backtest, setBacktest] = useState({
    open: false,
    params: {} as any,
  })

  const poolKey = useMemo(() => {
    if (!VAULT_CONFIG[chainId]) {
      return ''
    }
    return Object.keys(VAULT_CONFIG[chainId]).find((item) => {
      return VAULT_CONFIG[chainId][item].uniV3PoolMainnet === poolId
    })
  }, [chainId, poolId])

  const {
    poolName,
    token1 = {} as Token,
    token0 = {} as Token,
    feeTier,
    tvl,
    vol24h,
    fee24h,
  } = useMemo(() => {
    if (!poolInfo.token0) {
      return {}
    }
    return {
      token1: poolInfo.token1,
      token0: poolInfo.token0,
      poolName: poolInfo.token1.symbol + '-' + poolInfo.token0.symbol,
      feeTier: Number(poolInfo.feeTier),
      tvl: formatNumberByUnit(Number(poolInfo.totalValueLockedUSD)),
      vol24h: formatNumberByUnit(Number(poolInfo.poolDayData[0].volumeUSD)),
      fee24h: toPrecision(Number(poolInfo.poolDayData[0].feesUSD), 2),
    }
  }, [poolInfo])

  const { invertBaseToken: reverseBaseToken, View: BaseTokenSwitch } = useBaseTokenSwitch(token0.symbol, token1.symbol)

  const relativePrice = useMemo(() => {
    return !reverseBaseToken ? parseFloat(poolInfo.token0Price) : parseFloat(poolInfo.token1Price)
  }, [poolInfo, reverseBaseToken])

  const [_token0, _token1] = useMemo(() => {
    return [TOKEN_LIST[chainId]?.[token0.symbol] || token0, TOKEN_LIST[chainId]?.[token1.symbol] || token1].map(
      (item) => {
        return item
          ? {
              ...item,
              symbol: item.symbol || item.name,
              id: item.id || item.address,
            }
          : {}
      }
    )
  }, [token0, token1, chainId])

  const decimals: [number, number] = useMemo(() => {
    return [_token0.decimals, _token1.decimals]
  }, [_token0, _token1])

  const isStable = useMemo(() => {
    return stableCoins.includes(token1.symbol) && stableCoins.includes(token0.symbol)
  }, [token0, token1])

  const priceOptions = useMemo(() => {
    const options = [
      [-0.1, 0.1],
      [-0.3, 0.3],
      [-0.5, 0.5],
    ]
    const stableOptions = [
      [-0.001, 0.001],
      [-0.0025, 0.0025],
      [-0.0055, 0.0055],
    ]
    return isStable ? stableOptions : options
  }, [isStable])

  // const setPriceRangeByRatio = useCallback(
  //   (min, max) => {
  //     // console.log('setPriceRangeByRatio :>> ', relativePrice, min, max)
  //     setPriceMin(toPrecisionNum(relativePrice * min, 4))
  //     setPriceMax(toPrecisionNum(relativePrice * max, 4))
  //   },
  //   [relativePrice]
  // )

  useEffect(() => {
    setPriceMin(toPrecisionNum(Number(poolInfo.token0Price) * (1 + priceOptions[0][0]), 4))
    setPriceMax(toPrecisionNum(Number(poolInfo.token0Price) * (1 + priceOptions[0][1]), 4))
  }, [priceOptions, poolInfo])

  const { token0PriceLower, token0PriceUpper } = useMemo(() => {
    // console.log('token0PriceLower :>> ', {
    //   reverseBaseToken,
    //   priceMin,
    //   priceMax,
    //   token0PriceLower: !reverseBaseToken ? priceMin : 1 / priceMax,
    //   token0PriceUpper: !reverseBaseToken ? priceMax : 1 / priceMin,
    // })
    return {
      token0PriceLower: !reverseBaseToken ? priceMin : 1 / priceMax,
      token0PriceUpper: !reverseBaseToken ? priceMax : 1 / priceMin,
    }
  }, [priceMin, priceMax, reverseBaseToken])

  const { apr, aprText, aprLeveraged, aprTextLeveraged } = useMemo(() => {
    if (!poolInfo.token0) {
      return {
        apr: 0,
        aprText: '',
      }
    }

    const apr = getHistoricalAprFromPool({
      backDays: 30,
      Pl: token0PriceLower,
      Pu: token0PriceUpper,
      feeTier: Number(poolInfo.feeTier),
      token0Decimals: Number(poolInfo.token0.decimals),
      token1Decimals: Number(poolInfo.token1.decimals),
      token0Count0: initSupply,
      token1Count0: 0,
      poolTicks,
      v3PoolDaysData: poolDayDatas,
      // reverseBaseToken,
    })
    const aprLeveraged =
      lv *
        getHistoricalAprFromPool({
          backDays: 30,
          Pl: token0PriceLower,
          Pu: token0PriceUpper,
          feeTier: Number(poolInfo.feeTier),
          token0Decimals: Number(poolInfo.token0.decimals),
          token1Decimals: Number(poolInfo.token1.decimals),
          token0Count0: initSupply * lv,
          token1Count0: 0,
          poolTicks,
          v3PoolDaysData: poolDayDatas,
          // reverseBaseToken,
        }) -
      borrowInterest * (lv - 1)

    const aprTextLeveraged = toPrecisionNum(aprLeveraged * 100) + '%'
    const aprText = toPrecisionNum(apr * 100) + '%'

    return {
      apr,
      aprText,
      aprLeveraged,
      aprTextLeveraged,
    }
  }, [poolInfo, poolTicks, poolDayDatas, token0PriceLower, token0PriceUpper])

  const { chartMinVal, chartMaxVal } = useMemo(() => {
    return isStable
      ? {
          chartMinVal: toPrecisionNum(relativePrice * 0.9, 4),
          chartMaxVal: toPrecisionNum(relativePrice * 1.1, 4),
        }
      : {
          chartMinVal: toPrecisionNum(relativePrice * 0.5, 2),
          chartMaxVal: toPrecisionNum(relativePrice * 1.5, 2),
        }
  }, [isStable, relativePrice])

  // const { chartMinVal, chartMaxVal } = useMemo(() => {
  //   const daysData = poolDayDatas.slice(0, 60).reverse()
  //   if (!daysData.length) {
  //     return {}
  //   }
  //   function getValueByBaseToken(val) {
  //     if (!val) {
  //       return 0
  //     }
  //     return toPrecisionNum(reverseBaseToken ? 1 / Number(val) : Number(val), 7)
  //   }

  //   let minVal = getValueByBaseToken(daysData[0].low)
  //   let maxVal = getValueByBaseToken(daysData[0].high)
  //   daysData.forEach((item) => {
  //     minVal = Math.min(minVal, getValueByBaseToken(item.low), getValueByBaseToken(item.close))
  //     maxVal = Math.max(maxVal, getValueByBaseToken(item.high), getValueByBaseToken(item.close))
  //   })

  //   // maxVal = Math.max(maxVal, priceMax)
  //   // minVal = Math.min(minVal, priceMin)
  //   const delta = maxVal - minVal
  //   return {
  //     chartMinVal: minVal - delta * 0.1,
  //     chartMaxVal: maxVal + delta * 0.1,
  //     // chartMinVal: minVal * 0.9,
  //     // chartMaxVal: maxVal * 1.1,
  //   }
  //   // }, [poolDayDatas, priceMax, priceMin, reverseBaseToken])
  // }, [poolDayDatas, reverseBaseToken])

  useEffect(() => {
    console.log('poolInfo :>> ', poolInfo)
  }, [poolInfo])

  const chartProps = useMemo(() => {
    return {
      poolId,
      reverseBaseToken,
      feeTier: Number(poolInfo.feeTier),
      minVal: chartMinVal,
      maxVal: chartMaxVal,
      token0: {
        name: poolInfo.token0?.name,
        currentPrice: 1,
        token0Info: poolInfo.token0,
      },
      token1: {
        name: poolInfo.token1?.name,
        currentPrice: parseFloat(poolInfo.token0Price),
        token1Info: poolInfo.token1,
      },
      style: { width: '100%', height: '300px' },
    }
  }, [poolId, poolInfo, reverseBaseToken, chartMinVal, chartMaxVal])

  useEffect(() => {
    // console.log('priceChartLine :>> ', {
    //   chartMinVal,
    //   chartMaxVal,
    // })

    const calcLinePos = (price: number) => {
      const delta = chartMaxVal - chartMinVal
      const ratio = (chartMaxVal - price) / delta
      // console.log('calcLinePos :>> ', price, round(ratio * 100, 2) + '%')
      return ratio
      // if (fromBottom) {
      //   return round((1 - ratio) * 100, 2) + '%'
      // }
      // return round(ratio * 100, 2) + '%'
    }

    setPriceChartLines({
      currentPos: calcLinePos(relativePrice),
      // upperPos: calcLinePos(priceMax),
      // lowerPos: calcLinePos(priceMin),
    })
    setUpperPricePos(calcLinePos(priceMax) * priceRangeHeight)
    setLowerPricePos(calcLinePos(priceMin) * priceRangeHeight)
  }, [chartMinVal, chartMaxVal, relativePrice, priceMin, priceMax])

  const priceChartLinesPos = useMemo(() => {
    return {
      currentPos: round(priceChartLines.currentPos * 100, 2) + '%',
      upperPos: round(upperPricePos * 100, 2) + '%',
      lowerPos: round(lowerPricePos * 100, 2) + '%',
      lowerPosBottom: round((1 - lowerPricePos) * 100, 2) + '%',
    }
  }, [priceChartLines, upperPricePos, lowerPricePos])

  useEffect(() => {
    setUpperDragging(priceMax)
    setLowerDragging(priceMin)
  }, [priceMin, priceMax])

  const onDragUpper = useCallback(
    (event, ui) => {
      // setUpperDragging(true)
      const delta = ((chartMaxVal - chartMinVal) * ui.y) / priceRangeHeight
      setUpperDragging(toPrecisionNum(chartMaxVal - delta, 4))
      // console.log('onDragUpper :>> ', ui);
      setUpperPricePos(ui.y)
    },
    // []
    [chartMaxVal, chartMinVal]
  )

  const onDragUpperStop = useCallback(
    (event, ui) => {
      // console.log('onDragUpperStop :>> ', ui)
      const delta = ((chartMaxVal - chartMinVal) * ui.y) / priceRangeHeight
      setPriceMax(toPrecisionNum(chartMaxVal - delta, 4))
      // setUpperDragging(false)
      // console.log('setPriceMax :>> ', toPrecisionNum(chartMaxVal - delta, 2));
    },
    [chartMaxVal, chartMinVal]
  )

  const onDragLower = useCallback(
    (event, ui) => {
      // console.log('onDragLower :>> ', ui);
      setLowerPricePos(ui.y)
      // setLowerDragging(true)
      const delta = ((chartMaxVal - chartMinVal) * ui.y) / priceRangeHeight
      setLowerDragging(toPrecisionNum(chartMaxVal - delta, 4))
    },
    // []
    [chartMaxVal, chartMinVal]
  )

  const onDragLowerStop = useCallback(
    (event, ui) => {
      // console.log('onDragLowerStop :>> ', ui)
      const delta = ((chartMaxVal - chartMinVal) * ui.y) / priceRangeHeight
      setPriceMin(toPrecisionNum(chartMaxVal - delta, 4))
      // setLowerDragging(false)
      // console.log('setPriceMin :>> ', toPrecisionNum(chartMaxVal - delta, 2));
    },
    [chartMaxVal, chartMinVal]
  )

  // const handleDrageUpperEnd = useCallback((event) => {
  //   console.log('handleDrageUpperEnd :>> ', event, event.nativeEvent.offsetY);
  //   const offset = event.nativeEvent.offsetY
  //   if (Math.abs(offset) > 300) {
  //     return
  //   }
  //   const newPos = upperPricePos + offset / 250
  //   // setUpperPricePos(newPos)

  //   const delta = chartMaxVal - chartMinVal
  //   setPriceMax(toPrecisionNum(chartMaxVal - delta * newPos, 2))
  // }, [chartMaxVal, chartMinVal, upperPricePos])

  // const draggingRangeRatio = useMemo(() => {
  //   return {
  //     lower: toPrecision(((upperDragging - relativePrice) / relativePrice),
  //     upper:
  //   }
  // })
  const handleChangePool = useCallback(
    (poolId) => {
      // setReverseBaseToken(false)
      navigate(`/univ3lyf/${poolId}`)
    },
    [navigate]
  )

  const inited = useMemo(() => {
    return !!relativePrice
  }, [relativePrice])

  const toggleNextSteps = useCallback(() => {
    setShowNextSteps(!showNextSteps)
  }, [showNextSteps])

  const clickBacktest = useCallback(() => {
    console.log('clickBacktest :>> ')
    setBacktest({
      open: true,
      params: {
        poolId,
        Pl: priceMin,
        Pu: priceMax,
        feeTier: poolInfo.feeTier,
        reverseBaseToken,
        backDays: 30,
        token0: {
          name: poolInfo.token0.symbol,
          currentPrice: 1,
          count0: depositParams.amount0,
          borrow: depositParams.amount0Borrow,
          decimals: poolInfo.token0.decimals,
        },
        token1: {
          name: poolInfo.token1.symbol,
          currentPrice: Number(poolInfo.token0Price),
          count0: depositParams.amount1,
          borrow: depositParams.amount1Borrow,
          decimals: poolInfo.token1.decimals,
        },
      },
    })
  }, [depositParams, poolId, poolInfo, priceMax, priceMin, reverseBaseToken])

  const clickConfirm = useCallback(async () => {
    const tickSpacing = TICK_SPACINGS[feeTier]

    const tickLower = token0price2latestUsabletick(token0PriceUpper, ...decimals, tickSpacing)
    const tickUpper = token0price2latestUsabletick(token0PriceLower, ...decimals, tickSpacing)

    const vaultParams = {
      // ...vaultManager.TEST_PARAMS,
      amount0Borrow: toBNString(depositParams.amount0Borrow, decimals[0]),
      amount1Borrow: toBNString(depositParams.amount1Borrow, decimals[1]),
      // amount0Borrow: '0',
      // amount1Borrow: '0',
      poolKey,
      tickLower,
      tickUpper,
      amount0: toBNString(depositParams.amount0, decimals[0]),
      amount1: toBNString(depositParams.amount1, decimals[1]),
      // amount0: toBNString(16.89, 18), // Number(poolInfo.token0.decimals)),
      // amount1: toBNString(0.01, 18), // '10000000000000000', , Number(poolInfo.token1.decimals)
    }
    console.log('vaultParams :>> ', vaultParams)
    const [needApproveToken0, needApproveToken1] = [true, true]
    // const [needApproveToken0, needApproveToken1] = await vaultManager.checkAllowance(
    //   { amount0: vaultParams.amount0, amount1: vaultParams.amount1 },
    //   poolKey
    // )
    console.log('checkAllowance :>> ', {
      amount0: depositParams.amount0,
      amount1: depositParams.amount1,
      needApproveToken0,
      needApproveToken1,
    })

    if (needApproveToken0) {
      setApprovingToken0(true)
      try {
        // const approveRes0 = await vaultManager.approveToken0(vaultParams.amount0, poolKey)
        // console.log('approveRes0 :>> ', approveRes0)
      } catch (err) {
        console.warn(err)
        throw err
      } finally {
        setApprovingToken0(false)
      }
    }

    if (needApproveToken1) {
      setApprovingToken1(true)
      try {
        // const approveRes1 = await vaultManager.approveToken1(vaultParams.amount1, poolKey)
        // console.log('approveRes1 :>> ', approveRes1)
      } catch (err) {
        console.warn(err)
        throw err
      } finally {
        setApprovingToken1(false)
      }
    }

    setDepositing(true)
    try {
      console.log('vaultManager vaultParams :>> ', vaultParams)
      // const depositRes = await vaultManager.deposit(vaultParams)
      // console.log('depositRes :>> ', depositRes)
    } catch (err) {
      console.warn(err)
      throw err
    } finally {
      setDepositing(false)
    }
  }, [feeTier, token0PriceUpper, decimals, token0PriceLower, depositParams, poolKey])

  const onChangeDepositParams = useCallback((params) => {
    setDepositParams(params)
    console.log('onChangeDepositParams :>> ', params)
  }, [])

  return (
    <div className={classNames('farm-page', { 'farm-page-extends': showNextSteps })}>
      <section className="farm-page-layout-lf">
        <div className="farm-page-title">
          <div className="farm-page-title-main">
            <h3>
              Farm
              {/* {poolName} / {feeTier} */}
            </h3>
            <Select
              className="farm-page-pool-select"
              showSearch
              optionFilterProp="children"
              value={poolId}
              onChange={handleChangePool}
            >
              {v3TopTvlPools.map((pool) => (
                <Select.Option key={pool.id} value={pool.id}>
                  {`${pool.token1.symbol}/${pool.token0.symbol} (${getFeeTierPercentage(pool.feeTier) * 100 + '%'})`}
                </Select.Option>
              ))}
            </Select>

            <div className="base-token-switch flex ai-ct">
              <BaseTokenSwitch
                // label={false}
                onChange={() => {
                  // setPricePercentLower(priceMin / relativePrice)
                  // setPricePercentUpper(priceMax / relativePrice)
                  setUpperDragging(1 / priceMin)
                  setLowerDragging(1 / priceMax)
                  setPriceMin(toPrecisionNum(1 / priceMax, 4))
                  setPriceMax(toPrecisionNum(1 / priceMin, 4))
                }}
              />
              {/* <span>base token: </span> */}
              {/* <Switch
                checkedChildren={token1.symbol}
                unCheckedChildren={token0.symbol}
                checked={reverseBaseToken}
                // size="small"
                onChange={(val) => {
                  // setPricePercentLower(priceMin / relativePrice)
                  // setPricePercentUpper(priceMax / relativePrice)
                  setUpperDragging(1 / priceMin)
                  setLowerDragging(1 / priceMax)
                  setPriceMin(toPrecisionNum(1 / priceMax, 4))
                  setPriceMax(toPrecisionNum(1 / priceMin, 4))
                  setReverseBaseToken(val)
                }}
              ></Switch> */}
            </div>
          </div>
          <div className="farm-page-pool-info flex jc-sb">
            <p>
              TVL: <span className="text-highlight">${tvl}</span>
            </p>
            <p>
              24h Volume: <span className="text-highlight">${vol24h}</span>
            </p>

            <p>
              24h Fee: <span className="text-highlight">${fee24h}</span>
            </p>

            <p>
              fee APR: <span className="text-highlight">{aprText}</span>
            </p>
            {/* <p>Borrow Interest: {borrowInterest * 100}%</p> */}
          </div>
        </div>
        <div className="farm-page-price-setting">
          <h3>Step 1: Set Price Range (Current Price: {toPrecision(relativePrice)})</h3>
          <div className="price-setting-chart">
            <PriceChart {...chartProps}></PriceChart>
            <div
              className="price-setting-chart-inner"
              style={{
                display: !inited ? 'none' : 'block',
              }}
            >
              <div className="current-price-line" style={{ top: priceChartLinesPos.currentPos || 0 }}></div>
              <div
                className="price-range-area"
                style={{
                  top: upperPricePos || 0,
                  height: lowerPricePos - upperPricePos || 0,
                }}
              ></div>
              <Draggable
                axis="y"
                bounds={{ top: 0, bottom: lowerPricePos }}
                position={{ x: 0, y: upperPricePos }}
                onDrag={onDragUpper}
                onStop={onDragUpperStop}
              >
                <div className="upper-line">
                  {/* {upperDragging && ( */}
                  <span>
                    {upperDragging > relativePrice ? '+' : ''}
                    {round((upperDragging / relativePrice - 1) * 100, 0)}%
                  </span>
                  {/* )} */}
                </div>
              </Draggable>

              <Draggable
                axis="y"
                bounds={{ top: upperPricePos, bottom: priceRangeHeight }}
                position={{ x: 0, y: lowerPricePos }}
                onDrag={onDragLower}
                onStop={onDragLowerStop}
              >
                <div className="lower-line">
                  {/* {lowerDragging && ( */}
                  <span>
                    {lowerDragging > relativePrice ? '+' : ''}
                    {round((lowerDragging / relativePrice - 1) * 100, 0)}%
                  </span>
                  {/* )} */}
                </div>
              </Draggable>
            </div>
          </div>

          <div className="price-selects flex jc-sb">
            {priceOptions.map((item, idx) => (
              <div
                className={classNames('price-select-option', {
                  'price-select-option-active': priceMin === item[0] && priceMax === item[1],
                })}
                key={idx}
                onClick={() => {
                  // setPriceRangeByRatio(1 + item[0], 1 + item[1])
                  setPriceMin(toPrecisionNum(relativePrice * (1 + item[0]), 4))
                  setPriceMax(toPrecisionNum(relativePrice * (1 + item[1]), 4))
                }}
              >
                {round(item[0] * 100, 2)}% ~ +{round(item[1] * 100, 2)}%
              </div>
            ))}
          </div>

          <div className="price-inputs">
            <div className="price-input-item">
              <span className="text-sm">Min Price</span>
              <div className="input-wrapper">
                <i
                  className="iconfont icon-minus-circle"
                  onClick={() => {
                    setPriceMin(Math.max(priceMin - 1, 0))
                  }}
                ></i>
                <InputNumber
                  className="text-highlight"
                  type="number"
                  value={priceMin}
                  controls={false}
                  onChange={(ev) => {
                    setPriceMin(ev)
                    // setPriceMin(Number(ev.target.value))
                    // setPriceMin(Math.min(priceMax, Number(ev.target.value)))
                  }}
                />
                <i
                  className="iconfont icon-plus-circle"
                  onClick={() => {
                    setPriceMin(priceMin + 1)
                  }}
                ></i>
              </div>
              <span className="text-sm">
                {!reverseBaseToken ? `${token0.symbol} per ${token1.symbol}` : `${token1.symbol} per ${token0.symbol}`}
              </span>
            </div>
            <div className="price-input-item">
              <span className="text-sm">Max Price</span>
              <div className="input-wrapper">
                <i
                  className="iconfont icon-minus-circle"
                  onClick={() => {
                    setPriceMax(Math.max(priceMax - 1, 0))
                  }}
                ></i>
                <InputNumber
                  className="text-highlight"
                  type="number"
                  value={priceMax}
                  controls={false}
                  onChange={(ev) => {
                    setPriceMax(ev)
                    // setPriceMax(Number(ev.target.value))
                    // setPriceMax(Math.max(priceMin, Number(ev.target.value)))
                  }}
                />
                <i
                  className="iconfont icon-plus-circle"
                  onClick={() => {
                    setPriceMax(priceMax + 1)
                  }}
                ></i>
              </div>
              <span className="text-sm">
                {!reverseBaseToken ? `${token0.symbol} per ${token1.symbol}` : `${token1.symbol} per ${token0.symbol}`}
              </span>
            </div>
          </div>

          <div className="price-apr-info flex jc-sb">
            <div>
              <p>Base APR</p>
              <p className="text-highlight">{aprText}</p>
            </div>
            <div>
              <p>Leveraged APR ({lv}x)</p>
              <p className="text-highlight">{aprTextLeveraged}</p>
            </div>
          </div>

          {/* <div className="price-setting-hint text-sm">
            <p>
              - If the Current Price moves, the Narrow range will experience more 'Impermanent Loss' thant the Wild
              range.
            </p>
            <p>- Price Range can not be changed after your position is opened.</p>
          </div> */}
        </div>

        <button className="layout-lf-btn-next btn-base btn-base-primary" onClick={toggleNextSteps}>
          Next Step
        </button>
      </section>

      {showNextSteps && (
        <>
          <section className="farm-page-layout-rt">
            <Step2
              ammPrice={Number(poolInfo.token0Price)}
              token0={_token0}
              token1={_token1}
              maxLeverage={lv}
              onChangeDepositParams={onChangeDepositParams}
            />

            <Summary
              ammPrice={Number(poolInfo.token0Price)}
              token0={_token0}
              token1={_token1}
              summary={{
                ...depositParams,
                baseApr: apr,
                aprLeveraged,
                bi: borrowInterest,
                swapToken: 'USDC',
                swapCount: 1,
              }}
            />

            <div className="btn-options flex jc-sb">
              <button
                disabled={!depositParams.amount0 && !depositParams.amount1}
                className="btn-backtest"
                onClick={clickBacktest}
              >
                <i className="iconfont icon-setting"></i>
                Simulate
              </button>
              <button
                className="btn-confirm btn-base btn-base-primary"
                onClick={clickConfirm}
                disabled={
                  approvingToken0 || approvingToken1 || depositing || (!depositParams.amount0 && !depositParams.amount1)
                }
              >
                {(approvingToken0 || approvingToken1 || depositing) && <Loading />}
                {approvingToken0
                  ? `Approving ${token0.symbol}`
                  : approvingToken1
                  ? `Approving ${token1.symbol}`
                  : depositing
                  ? `Depositing`
                  : 'Confirm'}
                {/* Confirm */}
              </button>
            </div>
          </section>
          <BackTestModal
            open={backtest.open}
            params={backtest.params}
            onClose={() => setBacktest({ open: false, params: {} })}
          />
        </>
      )}
    </div>
  )
}

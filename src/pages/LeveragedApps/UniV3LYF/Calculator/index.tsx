import './index.scss'

import { Button, Form, InputNumber, Select, Slider, Tooltip } from 'antd/es'
import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'

import stableCoins from '@/constants/stableCoins'
import usePools from '@/hooks/usePools'
import { getFeeTierPercentage } from '@/uniswap/math'
import isH5 from '@/utils/isH5'
import { toPrecisionNum } from '@/utils/math'

// import { LightweightChart } from './LightweightChart'
// import V3EChart from './V3EChart'
const { Option } = Select

// console.log('createChart :>> ', createChart)
const initCalcOption = {
  // pair: 'ETH-USDC',
  baseToken: 'USDC',
  poolId: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
  // token1: 'ETH',
  // token0: 'USDC',
  token0CurrentPrice: 1,
  token1CurrentPrice: 1250,
  userBaseToken0Count: 1000,
  userBaseToken1Count: 0,
  days: 15,
  Pl: 1000,
  Pu: 1500,
  backDays: 30,
  // depositAmountUSD: 1000,
  // priceAssumptionValue: 1200,
  // feeTier: 500, // 100, 500, 3000, 10000
}

export default function Calculator() {
  const v3TopTvlPools = usePools()
  const [form] = Form.useForm<typeof initCalcOption>()
  const [formValues, setFormValue] = useState(initCalcOption)

  const onValuesChange = (changedValues) => {
    setFormValue({
      ...formValues,
      ...changedValues,
    })
  }

  const setForm = useMemo(() => {
    return (changedValues) => {
      form.setFieldsValue(changedValues)
      setFormValue({
        ...formValues,
        ...changedValues,
      })
    }
  }, [form, formValues, setFormValue])

  const { targetPool } = useMemo(() => {
    const targetPool = v3TopTvlPools.find((pool) => pool.id === formValues.poolId)
    console.log('targetPool :>> ', targetPool)
    return {
      targetPool,
    }
  }, [v3TopTvlPools, formValues.poolId])

  const pairTokens = useMemo(() => {
    if (!targetPool) {
      return []
    }
    return [targetPool.token0, targetPool.token1]
  }, [targetPool])

  const reverseBaseToken = useMemo(() => {
    return formValues.baseToken === targetPool?.token1?.symbol
  }, [formValues.baseToken, targetPool])

  const { token1Info, token0Info, token1, token0 } = useMemo(() => {
    if (!targetPool) {
      return {}
    }
    if (!reverseBaseToken) {
      return {
        token1Info: targetPool.token1,
        token0Info: targetPool.token0,
        token0: targetPool.token0.symbol,
        token1: targetPool.token1.symbol,
      }
    }
    return {
      token0Info: targetPool.token1,
      token1Info: targetPool.token0,
      token0: targetPool.token1.symbol,
      token1: targetPool.token0.symbol,
    }
  }, [targetPool, reverseBaseToken])

  useEffect(() => {
    if (!targetPool) {
      return
    }
    // const token1Price = parseFloat(latest.volumeUSD) / parseFloat(latest.volumeToken1);
    // const token0Price = parseFloat(latest.volumeUSD) / parseFloat(latest.volumeToken0);
    // const relativePrice = token1Price / token0Price;
    const relativePrice = !reverseBaseToken ? parseFloat(targetPool.token0Price) : parseFloat(targetPool.token1Price)
    setForm({
      // token0CurrentPrice: toPrecisionNum(token0Price, 2),
      // token1CurrentPrice: toPrecisionNum(token1Price, 2),
      token1CurrentPrice: toPrecisionNum(relativePrice, 2),
      Pu: toPrecisionNum(relativePrice * 1.2, 2),
      Pl: toPrecisionNum(relativePrice / 1.2, 2),
    })
  }, [targetPool, reverseBaseToken])

  const calcChartOptions = useMemo(() => {
    const {
      token0CurrentPrice,
      token1CurrentPrice,
      userBaseToken0Count,
      userBaseToken1Count,
      // days,
    } = formValues
    // console.log('formValues change', formValues);
    // if (userBaseToken0Count) {
    // }
    const token0Supply = reverseBaseToken ? userBaseToken1Count : userBaseToken0Count
    const token1Supply = !reverseBaseToken ? userBaseToken1Count : userBaseToken0Count
    const userBaseToken0Value = token0Supply * token0CurrentPrice
    const userBaseToken1Value = token1Supply * token1CurrentPrice
    // const userBaseValue = userBaseToken0Value + userBaseToken1Value;

    const isStable = stableCoins.includes(token0!) && stableCoins.includes(token1!)
    return {
      // poolInfo,
      ...formValues,
      reverseBaseToken,
      feeTier: targetPool?.feeTier,
      token0: {
        name: token0,
        currentPrice: token0CurrentPrice,
        count0: token0Supply,
        baseValue: userBaseToken0Value,
        decimals: token0Info?.decimals,
        token0Info,
      },
      token1: {
        name: token1,
        currentPrice: token1CurrentPrice,
        count0: token1Supply,
        baseValue: userBaseToken1Value,
        decimals: token1Info?.decimals,
        token1Info,
      },
      xAxisMin: isStable ? -0.05 : -1,
      xAxisMax: isStable ? 0.05 : 1,
    }
  }, [token1, token0, formValues, targetPool, reverseBaseToken])

  return (
    <div
      className={cx('page-calculator', {
        'page-calculator-m': isH5,
      })}
    >
      <div className="content-box">
        <Tooltip
          className="page-calculator-title"
          title={
            <div>
              The graph below outputs the Equity Value when the price ratio of the paired tokens changes.
              <br />
              The values are simply ESTIMATIONS as relevant variables change over time and can't be predicted precisely.
            </div>
          }
          overlayStyle={{
            maxWidth: 400,
          }}
        >
          <h2>V3 Farming Calculator</h2>
          <i className="iconfont icon-hint " />
        </Tooltip>
        <div className="calculator-box">
          <section className="calculator-options">
            <Form
              form={form}
              initialValues={initCalcOption}
              className={cx('calculator-options-form', {
                // 'calculator-options-form-advance': advancedMode,
              })}
              // size='small'
              layout="inline"
              labelAlign="right"
              autoComplete="off"
              onValuesChange={onValuesChange}
            >
              <Form.Item label="Farming Pool" name="poolId" className="calculator-options-pair">
                <Select showSearch optionFilterProp="children">
                  {v3TopTvlPools.map((pool) => (
                    <Option key={pool.id} value={pool.id}>
                      {/* <i className={`coin coin-${pool.token1.toLowerCase()}`} /> */}
                      {/* <i className={`coin coin-${pool.token0.toLowerCase()}`} /> */}
                      {`${pool.token1.symbol}/${pool.token0.symbol} (${getFeeTierPercentage(pool.feeTier) * 100}%)`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Base Token" name="baseToken" className="calculator-options-token">
                <Select>
                  {pairTokens.map((token) => (
                    <Option key={token.id} value={token.symbol}>
                      {token.symbol}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* <Form.Item
                label="Token1"
                name='token1'
                className='calculator-options-token'
              >
                <Select
                  showSearch
                 
                >
                  {
                    tokens.map(token => (
                      <Option key={token.id} value={token.symbol}>
                        <i className={`coin coin-${token.symbol.toLowerCase()}`} />
                        { token.symbol }
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>

              <Form.Item
                label='Token0'
                name='token0'
                className='calculator-options-token'
              >
                <Select
                  showSearch
                 
                >
                  {
                    tokens.map(token => (
                      <Option key={token.id} value={token.symbol}>
                        <i className={`coin coin-${token.symbol.toLowerCase()}`} />
                        { token.symbol }
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item> */}

              {/* <Form.Item
                label='Fee Tier'
                name='poolId'
                className='calculator-options-pool'
              >
                <Select
                  showSearch
                 
                >
                  {
                    pools.map(pool => (
                      <Option key={pool.id} value={pool.id}>
                        { Number(pool.feeTier) / 10000 + '%'}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item> */}

              <Form.Item label={`Amount of ${targetPool?.token0?.symbol} Supplied`} name="userBaseToken0Count">
                <InputNumber min={0} max={1e10} />
              </Form.Item>

              <Form.Item label={`Amount of ${targetPool?.token1?.symbol} Supplied`} name="userBaseToken1Count">
                <InputNumber min={0} max={1e10} />
              </Form.Item>

              <Form.Item label={`Min Price (${token0} per ${token1})`} name="Pl">
                <InputNumber min={0} max={1e10} />
              </Form.Item>

              <Form.Item label={`Max Price (${token0} per ${token1})`} name="Pu">
                <InputNumber min={0} max={1e10} />
              </Form.Item>

              {
                // advancedMode &&
                <>
                  <Form.Item label={`Initial price (${token0} per ${token1})`} name="token1CurrentPrice">
                    <InputNumber min={0} max={1e10} />
                  </Form.Item>

                  {/* <Form.Item
                    label={token0 + ' initial price ($)'}
                    name='token0CurrentPrice'
                  >
                    <InputNumber
                      min={0}
                      max={1e10}
                    />
                  </Form.Item> */}
                </>
              }

              <Form.Item
                className="calculator-setting-slider calculator-setting-slider-days"
                label="Backtest Days"
                name="backDays"
              >
                <Slider
                  marks={{
                    1: '1',
                    7: '7',
                    14: '14',
                    30: '30',
                    60: '60',
                  }}
                  step={1}
                  min={1}
                  max={60}
                />
              </Form.Item>

              <Form.Item
                className="calculator-setting-slider calculator-setting-slider-days"
                label="Invest Days"
                name="days"
              >
                <Slider
                  marks={{
                    1: '1',
                    30: '30',
                    90: '90',
                    180: '180',
                    365: '365',
                  }}
                  step={1}
                  min={0}
                  max={365}
                />
              </Form.Item>
            </Form>
            <div className="calculator-options-form-setting">
              {/* <Form.Item className="calculator-options-advance-switch" label="Advanced Mode">
                <Switch
                  size="small"
                  checked={advancedMode}
                  onChange={(checked) => {
                    setAdvancedMode(!!checked);
                  }}
                ></Switch>
              </Form.Item> */}
              <Form.Item className="calculator-options-btn-reset">
                <Button size="small" type="primary" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          </section>
          <section className="calculator-chart">
            {/* <V3EChart {...calcChartOptions} style={{ width: '100%', height: '600px' }}></V3EChart> */}
          </section>
          {/* <section className="lightweight-chart">
            <LightweightChart></LightweightChart>
          </section> */}
        </div>
      </div>
    </div>
  )
}

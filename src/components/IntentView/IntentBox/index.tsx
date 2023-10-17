import './index.scss'

import { Select } from 'antd'
import { map, toArray } from 'lodash'

import { INTENT_MAP, INTENTS, INTENTS_INPUT } from '@/sdk/dsl/intentList'

const { Option } = Select

console.log(toArray(INTENTS))

export default function IntentBox(props: {
  intent: INTENTS
  param: {
    type: INTENTS_INPUT
    amount?: string
    symbol?: string
    from?: number
    to?: number
    platform?: string
    pool?: string
  }
}) {
  const { intent, param } = props
  return (
    <div className="intent-box-item">
      <div className="face front">
        <div className="intent-box-item-title">
          <Select value={intent} style={{ width: 140 }}>
            {toArray(INTENTS).map((value) => {
              return <Option key={value}>{INTENT_MAP[value].method}</Option>
            })}
          </Select>
        </div>
        <div className="intent-box-item-content">
          {param?.type === INTENTS_INPUT.INTENTS_INPUT_TOKENS && (
            <p>
              {param.amount} {param.symbol}
            </p>
          )}

          {param?.type === INTENTS_INPUT.INTENTS_INPUT_PRICE_RANGE && (
            <div>
              <p className="intent-box-item-content-platform">{param.platform}</p>
              <p className="intent-box-item-content-pool">{param.pool}</p>
              <p className="intent-box-item-content-pricerange-title">Price Range:</p>
              <p className="intent-box-item-content-pricerange-content">
                {param.from * 100}% - {param.to * 100}%
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="face top"></div>
      <div className="face right"></div>
      <div className="face left"></div>
      <div className="face bottom"></div>
      <div className="face back"></div>
    </div>
  )
}
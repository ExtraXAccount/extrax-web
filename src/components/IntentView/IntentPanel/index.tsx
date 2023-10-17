import './index.scss'

import { dslParser } from '@/sdk'
import { INTENTS, INTENTS_INPUT } from '@/sdk/dsl/intentList'
import { useAppSelector } from '@/state'

import IntentBox from '../IntentBox'

const list = [
  {
    intents: [INTENTS.INTENT_DEPOSIT],
    params: [
      {
        type: INTENTS_INPUT.INTENTS_INPUT_TOKENS,
        amount: '1000',
        symbol: 'USDC',
      },
    ],
  },
  {
    intents: [INTENTS.INTENT_BORROW, INTENTS.INTENT_BORROW],
    params: [
      {
        type: INTENTS_INPUT.INTENTS_INPUT_TOKENS,
        amount: '100',
        symbol: 'USDC',
      },
      {
        type: INTENTS_INPUT.INTENTS_INPUT_TOKENS,
        amount: '0.3',
        symbol: 'WETH',
      },
    ],
  },
  {
    intents: [INTENTS.INTENT_FARM],
    params: [
      {
        type: INTENTS_INPUT.INTENTS_INPUT_PRICE_RANGE,
        from: -0.1,
        to: 0.1,
        platform: 'Uniswap v3',
        pool: 'WETH/USDC',
      },
    ],
  },
  {
    intents: [INTENTS.INTENT_AUTOCOMPOUND],
    params: [],
  },
]

export default function IntentPanel() {
  const dslText = useAppSelector((state) => state.dsl.text)
  const config = dslParser.parse(dslText)
  return (
    <div className="intent-panel">
      {config.map((item, index) => {
        return (
          <div className="intent-panel-line" key={index}>
            <div className="intent-panel-row">
              {item.intents.map((i, idx) => {
                return <IntentBox intent={i} key={idx} param={(item.params || [])[idx]} />
              })}
            </div>
            {index < config.length - 1 && <div className="intent-panel-row-next"></div>}
          </div>
        )
      })}
    </div>
  )
}

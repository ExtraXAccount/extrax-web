import './Step2.scss'

import { Form, Slider, Switch, Tooltip } from 'antd/es'
import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
// import CoinAmount from '@/components/CoinAmount'
import useCredit from '@/hooks/useCredit'
import useDeposited from '@/hooks/useDeposited'
// import useFetchBalance from '@/hooks/useFetchBalance'
// import { SupportedChainId } from '@/sdk/constants/chains'
import { Token } from '@/types/uniswap.interface'
import { toPrecision } from '@/utils/math'
// import { nameChecker } from '@/utils'

interface IStep2Props {
  ammPrice: number
  token0: Token
  token1: Token
  maxLeverage?: number
  onChangeDepositParams: (any) => void
}

export default function Step2(props: IStep2Props) {
  // const [input, setinput] = useState();
  const {
    ammPrice = 1,
    token0,
    token1,
    // token0Id,
    // token1Id,
    // token0Decimals,
    // token1Decimals,
    // maxLeverage = 3,
    onChangeDepositParams,
  } = props || {}

  const { depositedVal, depositedAssets } = useDeposited()
  const { maxCredit, availableCredit } = useCredit()
  const [supply, changeSupply] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(2)
  const [autoRebalance, setAutoRebalance] = useState(false)
  const [rangeStop, setRangeStop] = useState(false)

  const lvMarks = useMemo(() => {
    const res = {
      0: '0',
      [toPrecision(depositedVal)]: toPrecision(depositedVal),
      [toPrecision(availableCredit)]: {
        style: {
          color: '#008CF2',
        },
        label: (
          <div style={{ position: 'relative', right: '25%' }}>
            <Tooltip title="">
              <b>{toPrecision(availableCredit)}</b>
            </Tooltip>
          </div>
        ),
      },
    }
    // const count = maxLeverage * 2 - 1
    // for (let index = 0; index < count; index++) {
    //   const key = index * 0.5 + 1
    //   res[key] = `${key}x`
    // }
    return res
  }, [availableCredit, depositedVal])

  const tk0BorrowRatio = useMemo(() => {
    if (selectedTemplate === 0) {
      return 1
    }
    if (selectedTemplate === 1) {
      return 0
    }
    return 0.5
  }, [selectedTemplate])

  useEffect(() => {
    onChangeDepositParams({
      positionVal: supply,
      tk0BorrowRatio,
      amount0Borrow: supply * tk0BorrowRatio,
      amount1Borrow: (supply * (1 - tk0BorrowRatio)) / ammPrice,
      amount0: supply / 2,
      amount1: supply / 2 / ammPrice,
    })
  }, [supply, onChangeDepositParams, ammPrice, tk0BorrowRatio])

  return (
    <div className="farm-page-section">
      <h3>Step 2: Supply Credit</h3>
      <div className="deposit-slider">
        <AmountInput
          maxText="Available Credit"
          max={availableCredit}
          token="USD"
          decimals={18}
          value={supply}
          onChange={(val) => changeSupply(Number(val))}
        />
        <div className="percent-box percent-box-leverage">
          <Slider
            marks={lvMarks}
            // step={0.1}
            value={supply}
            onChange={changeSupply}
            min={0}
            max={availableCredit}
          />
        </div>
      </div>
      <div className="strategy-settings">
        <h3>Strategy Settings</h3>
        <div className="market-template">
          <div className="market-template-selects">
            {[
              {
                name: 'Long',
              },
              {
                name: 'Short',
              },
              {
                name: ' Market Neutral',
              },
            ].map((item, idx) => (
              <div
                className={cx('market-template-selects-option', {
                  'market-template-selects-option-active': selectedTemplate === idx,
                })}
                key={idx}
                onClick={() => {
                  setSelectedTemplate(idx)
                }}
              >
                <p>{item.name}</p>
                {(idx === 0 || idx === 1) && (
                  <span>borrow {idx === 0 ? token0.symbol : token1.symbol}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Form.Item label="Auto Rebalance">
          <Switch
            size="small"
            checked={autoRebalance}
            onChange={(checked) => {
              setAutoRebalance(!!checked)
            }}
          ></Switch>
        </Form.Item>

        <Form.Item label="Range Stop">
          <Switch
            size="small"
            checked={rangeStop}
            onChange={(checked) => {
              setRangeStop(!!checked)
            }}
          ></Switch>
        </Form.Item>
      </div>
    </div>
  )
}

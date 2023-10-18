import './Step2.scss'

import { Dropdown, Form, Input, Select, Slider, Switch, Tooltip } from 'antd/es'
import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'

import CoinAmount from '@/components/CoinAmount'
import useDeposited from '@/hooks/useDeposited'
import useFetchBalance from '@/hooks/useFetchBalance'
// import { SupportedChainId } from '@/sdk/constants/chains'
import { Token } from '@/types/uniswap.interface'
// import { nameChecker } from '@/utils'
import { toPrecision } from '@/utils/math'

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
    maxLeverage = 3,
    onChangeDepositParams,
  } = props || {}
  const { balance } = useFetchBalance(token0.id)
  const { balance: balance1 } = useFetchBalance(token1.id)
  const [inputValue, setInputValue] = useState(['', ''])
  // const [inputValue1, setInputValue1] = useState('')
  const [useLeverage, setUseLeverage] = useState(true)
  // const [borrowRatio, setBorrowRatio] = useState(0)
  const [borrowAdvanced, setBorrowAdvanced] = useState(false)
  const [borrow0, setBorrow0] = useState(0)
  const [borrow1, setBorrow1] = useState(0)
  const [leverage, setLeverage] = useState(3)

  const [supplyIndex, setSupplyIndex] = useState(0)
  const [token0BorrowRatio, setToken0BorrowRatio] = useState(1)
  const [assetIndex, setAssetIndex] = useState(0)

  const borrowList = [token0.symbol, token1.symbol]
  const borrowInterest = [0.04, 0.05]
  const canDualBorrow = true
  const canLend = true
  const realUseLeverage = canLend ? useLeverage : false
  const realLeverage = realUseLeverage ? leverage : 1

  const { depositedVal, depositedAssets, maxCredit } = useDeposited()
  const [supply, changeSupply] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(-1)
  const [autoRebalance, setAutoRebalance] = useState(false)
  const [rangeStop, setRangeStop] = useState(false)

  const lvMarks = useMemo(() => {
    const res = {
      0: '0',
      [depositedVal]: depositedVal,
      [maxCredit]: maxCredit,
    }
    // const count = maxLeverage * 2 - 1
    // for (let index = 0; index < count; index++) {
    //   const key = index * 0.5 + 1
    //   res[key] = `${key}x`
    // }
    return res
  }, [depositedVal, maxCredit])

  useEffect(() => {
    onChangeDepositParams({
      amount0Borrow: supply / 2,
      amount1Borrow: supply / 2 / ammPrice,
      amount0: supply / 2,
      amount1: supply / 2 / ammPrice,
    })
  }, [supply, onChangeDepositParams, ammPrice])

  // function setAmount(percent: number) {
  //   setInputValue(toFixedByTokenNoExp(balance * percent, token0))
  // }

  // function setAmount1(percent: number) {
  //   setInputValue1(toFixedByTokenNoExp(balance1 * percent, token1))
  // }

  useEffect(() => {
    setInputValue(['', ''])
  }, [supplyIndex])

  const currentBalance = useMemo(() => {
    return Number([balance, balance1][supplyIndex])
  }, [balance, balance1, supplyIndex])

  function setSupply(count: string, percent?: number) {
    const newVal = ['', '']
    const balances = [balance, balance1] as any[]
    newVal[supplyIndex] = percent !== undefined ? '' + balances[supplyIndex] * percent : count
    setInputValue(newVal)
  }

  useEffect(() => {
    setToken0BorrowRatio(1 - assetIndex)
  }, [assetIndex])

  useEffect(() => {
    const deposit0 = Number(inputValue[0]) || 0
    const deposit1 = Number(inputValue[1]) || 0
    const depositValue0 = deposit0 * 1
    const depositValue1 = deposit1 * ammPrice
    const depositTotalValue = depositValue0 + depositValue1
    const borrowTotalValue = depositTotalValue * (leverage - 1)
    const borrow0Val = borrowTotalValue * token0BorrowRatio
    setBorrow0(borrow0Val / 1)
    const newBorrow1 = (borrowTotalValue - borrow0Val) / ammPrice
    setBorrow1(newBorrow1)
    // console.log('step2 change :>> ', {
    //   ammPrice,
    //   deposit0,
    //   deposit1,
    //   depositValue0,
    //   depositValue1,
    //   depositTotalValue,
    //   borrow0Val,
    //   delta: borrowTotalValue - borrow0Val,
    //   newBorrow1,
    // })
  }, [inputValue, ammPrice, leverage, token0BorrowRatio])

  useEffect(() => {
    onChangeDepositParams({
      amount0Borrow: borrow0,
      amount1Borrow: borrow1,
      amount0: Number(inputValue[0]) || 0,
      amount1: Number(inputValue[1]) || 0,
    })
  }, [borrow0, borrow1, inputValue, onChangeDepositParams])

  return (
    <div className="farm-page-section">
      <h3>Step 2: Supply Credit</h3>
      <div className="deposit-slider">
        <div className="percent-box percent-box-leverage">
          <Slider
            marks={lvMarks}
            // step={0.1}
            value={supply}
            onChange={changeSupply}
            min={0}
            max={maxCredit}
          />
        </div>
      </div>
      <div className="strategy-settings">
        <h3>Strategy Settings</h3>
        <div className="market-template">
          <div className="market-template-selects flex jc-sb">
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
                {(idx === 0 || idx === 1) && <span>borrow {idx === 0 ? token0.name : token1.name}</span>}
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

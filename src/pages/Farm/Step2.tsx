import './Step2.scss'

import { Dropdown, Input, Select, Slider, Switch, Tooltip } from 'antd/es'
import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'

import CoinAmount, { nameChecker } from '@/components/CoinAmount'
import useBalance from '@/hooks/useBalance'
import { Token } from '@/types/uniswap.interface'
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
  const balance = useBalance(token0)
  const balance1 = useBalance(token1)
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

  const lvMarks = useMemo(() => {
    const res = {}
    const count = maxLeverage * 2 - 1
    for (let index = 0; index < count; index++) {
      const key = index * 0.5 + 1
      res[key] = `${key}x`
    }
    return res
  }, [maxLeverage])

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
    return [balance, balance1][supplyIndex]
  }, [balance, balance1, supplyIndex])

  function setSupply(count: string, percent?: number) {
    const newVal = ['', '']
    const balances = [balance, balance1]
    newVal[supplyIndex] = percent !== undefined ? '' + balances[supplyIndex] * percent : count
    setInputValue(newVal)
  }
  // const summary = useMemo(() => {
  //   return {
  //     token1BorrowCount:
  //   }
  // }, [])

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
      <h3>Step 2: Provide Collateral & Leverage</h3>
      <div className="farm-page-supply-setting">
        <div className="farm-page-supply-wrapper flex jc-sb">
          <div className="farm-supply-input-wrapper">
            <Input
              className="farm-supply-input"
              prefix={
                <div className="lppool-input-max-button" onClick={() => setSupply('', 1)}>
                  MAX
                </div>
              }
              placeholder="0.00"
              size="large"
              // suffix={<div className="lppool-input-token-name">{nameChecker(token0)}</div>}
              value={inputValue[supplyIndex]}
              onChange={(e) => {
                const r = e.target.value.trim().replace(/[^\d^.]+/g, '')
                setSupply(r)
              }}
            />
            <p className="farm-supply-input-balance">
              Balance: <span onClick={() => setSupply('', 1)}>{toPrecision(currentBalance, 4)}</span>
            </p>
          </div>
          <Select showSearch={false} style={{ height: 40 }} value={supplyIndex} onChange={setSupplyIndex}>
            {[token0, token1].map((item, index) => {
              return (
                <Select.Option key={item.symbol} value={index}>
                  <i className={`coin coin-${item.symbol?.toLowerCase()}`} /> {nameChecker(item.symbol)}
                </Select.Option>
              )
            })}
          </Select>
        </div>
        {/* <div className="lppool-coin-block-wrap">
          <section className="lppool-coin-block lppool-coin-block-0">
            <p className="subtitle subtitle-right">
              Available:
              <span onClick={() => setAmount(1)} className="subtitle-amount">
                {balance > 10 ** 6 ? floor(balance, 2) : balance}
              </span>
            </p>
            <Input
              prefix={
                <div className="lppool-input-max-button" onClick={() => setAmount(1)}>
                  max
                </div>
              }
              placeholder="0.00"
              size="large"
              suffix={<div className="lppool-input-token-name">{nameChecker(token0)}</div>}
              value={inputValue}
              onChange={(e) => {
                const r = e.target.value.trim().replace(/[^\d^.]+/g, '')
                setInputValue(r)
              }}
            />
          </section>

          <section className="lppool-coin-block lppool-coin-block-1">
            <p className="subtitle subtitle-right">
              Available:
              <span onClick={() => setAmount1(1)} className="subtitle-amount">
                {balance1 > 10 ** 6 ? floor(balance1, 2) : balance1}
              </span>
            </p>
            <Input
              prefix={
                <div className="lppool-input-max-button" onClick={() => setAmount1(1)}>
                  max
                </div>
              }
              placeholder="0.00"
              size="large"
              suffix={<div className="lppool-input-token-name">{nameChecker(token1)}</div>}
              value={inputValue1}
              onChange={(e) => {
                const r = e.target.value.trim().replace(/[^\d^.]+/g, '')
                setInputValue1(r)
              }}
            />
          </section>
        </div> */}
      </div>

      <div className="farm-page-lv-setting">
        <h3>Leverage Setup</h3>
        {/* <div className="farm-page-lv-setting-option"></div> */}
      </div>
      <div className="subtitle subtitle-leverage flex jc-sb">
        <div className="flex ai-ct">
          <p>Leverage</p>
          <div className="subtitle-leverage-display">{realLeverage}x</div>
        </div>
        <Dropdown
          // trigger={['click']}
          placement="bottomRight"
          overlay={
            <ul className="farm-template-list">
              <li>3x Long Farming</li>
              <li>3x Short Farming</li>
              <li>Delta Neutral Strategy</li>
            </ul>
          }
        >
          <span className="text-sm-2 flex ai-ct">
            Templates <i className="iconfont icon-down"> </i>
          </span>
        </Dropdown>
      </div>

      {realUseLeverage && (
        <div className="percent-box percent-box-leverage">
          <Slider
            marks={lvMarks}
            step={0.1}
            // defaultValue={leverage}
            value={leverage}
            onChange={(val) => {
              setLeverage(val)
            }}
            min={1}
            max={maxLeverage}
          />
        </div>
      )}
      {/* {!canLend && (
        <p className="lppool-notice">
          No sufficient {borrowList[assetIndex]} can be borrowed to open leveraged position temporarily.
        </p>
      )} */}

      <div className="subtitle subtitle-borrow flex jc-sb ai-ct">
        <p>Asset to Borrow</p>
        {borrowList.length > 1 && canDualBorrow && (
          <div className="flex ai-ct jc-sb">
            <span>Borrow Two Assets:</span>
            <Switch
              // checkedChildren='Enable'
              // unCheckedChildren='Disable'
              checked={borrowAdvanced}
              size="small"
              onChange={(checked) => {
                // if (!checked) {
                //   setLeverage(1);
                // }
                setBorrowAdvanced(checked)
              }}
            ></Switch>
          </div>
        )}
      </div>
      {!(borrowAdvanced && borrowList.length > 1) ? (
        <ul className="lppool-borrow-list">
          {borrowList.map((coin: string, index: number) => {
            // const { canLend, availiable } = checkLendingPoolStatus(coin, lendingPoolInfo)
            // const availiableValue = availiable * priceInfo[coin]
            // const showRemain = availiableValue < 50000 && canLend
            return (
              <Tooltip
                // title={
                //   showRemain ? (
                //     <div>
                //       {remain2Decimal(availiable)} {nameChecker(coin)} availiable
                //     </div>
                //   ) : null
                // }
                key={coin}
              >
                <li
                  className={cx('flex ai-ct', {
                    normal: assetIndex !== index && canLend,
                    active: assetIndex === index,
                    disable: !canLend,
                  })}
                  onClick={() => {
                    if (canLend) {
                      setAssetIndex(index)
                    }
                  }}
                  key={coin}
                >
                  <i className={`coin coin-${coin.toLowerCase()}`} /> {nameChecker(coin)}
                  {!canLend && (
                    <p className="lppool-borrow-list-hint">
                      No sufficient {coin}can be borrowed to open leveraged position temporarily.
                    </p>
                  )}
                </li>
              </Tooltip>
            )
          })}
        </ul>
      ) : (
        <section className="lppool-borrow-advanced">
          <div className="lppool-borrow-advanced-items">
            <div className="lppool-borrow-advanced-item">
              <section className="flex ai-ct">
                <CoinAmount coin={token0.symbol} amount={borrow0} showZero />({Math.round(token0BorrowRatio * 100)}%)
              </section>

              <div className="lppool-borrow-advanced-interest">
                <span>Borrow Interest:</span>
                {toPrecision(borrowInterest[0] * 100)}%
              </div>
            </div>
            <div className="lppool-borrow-advanced-item">
              <section className="flex ai-ct">
                <CoinAmount coin={token1.symbol} amount={borrow1} showZero />(
                {Math.round((1 - token0BorrowRatio) * 100)}%)
              </section>
              <div className="lppool-borrow-advanced-interest">
                <span>Borrow Interest:</span>
                {toPrecision(borrowInterest[1] * 100)}%
              </div>
            </div>
          </div>
          <Slider
            step={0.01}
            min={0}
            max={1}
            value={token0BorrowRatio}
            onChange={setToken0BorrowRatio}
            marks={{
              0: '0%',
              0.25: '25%',
              0.5: '50%',
              0.75: '75%',
              1: '100%',
            }}
            tipFormatter={(val) => {
              return `${Math.round(val * 100)}%`
            }}
          />
        </section>
      )}

      {/* {realLeverage > 2 && (
        <section className="lppool-summary-hint lppool-summary-hint-warning">
          <p>
            Please keep in mind that when you leverage above 2x, you will have a
            <Tooltip title="short in a limited range">
              <span
                className="text-with-help"
                style={{
                  display: 'inline-block',
                  margin: '0 4px',
                }}
              >
                slight short
              </span>
            </Tooltip>
            on the borrowed asset. Check more details with simulator.
          </p>
        </section>
      )} */}
    </div>
  )
}

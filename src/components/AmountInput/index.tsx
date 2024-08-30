import './index.scss'

import { Dropdown, Input, Slider } from 'antd/es'
import cx from 'classnames'
import { useMemo, useState } from 'react'

import { nameChecker } from '@/utils'
import { remain2Decimal, toPrecision } from '@/utils/math'
import { div, isGt, mul } from '@/utils/math/bigNumber'

import { specialNameChecker } from '../LPName'

export interface IAmountInputProps {
  min?: number
  max: number | string
  ethBalance?: number | string
  token: string
  decimals?: number
  value: string | number
  onChange: (val: string) => void
  maxText?: string
  sliderMax?: number | string
  sliderMaxText?: string
  // maybe avaliable is not enough
  maxAvailable?: number
  noPadding?: boolean
  allowInputOverflow?: boolean
  useNativeETH?: boolean
  onUseNativeETH?: (useNativeEth: boolean) => any
  price?: number
}

const NativeETH = 'ETH'

export default function AmountInput(props: IAmountInputProps) {
  const {
    min = 0,
    max: _max,
    ethBalance,
    token,
    decimals = 18,
    value,
    onChange,
    maxText = 'Available',
    sliderMax,
    sliderMaxText = '',
    // maxAvailable,
    noPadding = false,
    allowInputOverflow = false,
    useNativeETH = true,
    onUseNativeETH,
    price,
  } = props
  // console.log('token :>> ', { useNativeETH, token })
  const [selectedToken, setSelectedToken] = useState(useNativeETH ? nameChecker(token) : token)

  const max = useMemo(() => {
    return selectedToken === NativeETH ? ethBalance || _max : _max
  }, [_max, ethBalance, selectedToken])

  const parsedSliderMax = useMemo(() => {
    return sliderMax ?? max
  }, [max, sliderMax])

  const suffix = useMemo(() => {
    if (token !== 'WETH') {
      return (
        <div className='amount-input-number-token'>
          <i className={`coin coin-${specialNameChecker(token)}`} />
          <p>{nameChecker(token)}</p>
        </div>
      )
    }
    return (
      <Dropdown
        overlayClassName='weth-select-overlay'
        trigger={['hover']}
        placement='bottomLeft'
        menu={{
          items: [
            {
              key: 'eth',
              label: (
                <div
                  className='amount-input-number-token'
                  onClick={() => {
                    onUseNativeETH?.(true)
                    setSelectedToken(NativeETH)
                  }}
                >
                  <i className='coin coin-eth' />
                  <p>ETH</p>
                </div>
              ),
            },
            {
              key: 'weth',
              label: (
                <div
                  className='amount-input-number-token'
                  onClick={() => {
                    onUseNativeETH?.(false)
                    setSelectedToken('WETH')
                  }}
                >
                  <i className='coin coin-weth' />
                  <p>WETH</p>
                </div>
              ),
            },
          ],
        }}
      >
        <div className='amount-input-number-token amount-input-number-token-select'>
          <i className={`coin coin-${specialNameChecker(selectedToken)}`} />
          <p>{selectedToken}</p>
          <i className='iconfont icon-down'></i>
        </div>
      </Dropdown>
    )
  }, [onUseNativeETH, selectedToken, token])

  return (
    <div
      className={cx('amount-input', {
        'amount-input-nopadding': noPadding,
      })}
    >
      <section className='amount-input-number'>
        <div className='amount-input-number-wrap'>
          <Input
            suffix={suffix}
            className='amount-input-input'
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
              const r = e.target.value.trim().replace(/[^\d^.]+/g, '')
              if (!allowInputOverflow && isGt(r, max)) {
                onChange(String(max))
              } else {
                onChange(r)
              }
            }}
            placeholder='0.00'
          />
        </div>
        <div className='amount-input-number-sub flex jc-sb ai-ct'>
          <div className='amount-input-number-totalvalue text-sm-2'>
            {!!price && <>${remain2Decimal(price * Number(value))}</>}
          </div>
          <div className='flex ai-ct'>
            {sliderMax !== undefined && (
              <div className='amount-input-number-max text-sm-2'>
                {sliderMaxText}:
                <span onClick={() => onChange(String(sliderMax))}> {sliderMax}</span>
              </div>
            )}
            {!sliderMax && (
              <div className='amount-input-number-max text-sm-2'>
                {maxText}:{' '}
                <span onClick={() => onChange(String(max))}>{toPrecision(Number(max), 5)}</span>
              </div>
            )}
            <div
              className='amount-input-number-max-button'
              onClick={() => onChange(String(parsedSliderMax))}
            >
              Max
            </div>
          </div>

          {/* <ul className="amount-input-percent-list flex ai-ct">
            {[0.25, 0.5, 0.75, 1].map((percent) => (
              <li
                key={percent}
                onClick={() => {
                  if (percent === 1) {
                    onChange(String(parsedSliderMax))
                  } else {
                    onChange(
                      mul(div(percent, 1).toString(), parsedSliderMax)
                        .toFixed(decimals)
                        .replace(/\.?0+$/, ''),
                    )
                  }
                }}
              >
                {percent * 100}%
              </li>
            ))}
          </ul> */}
        </div>
      </section>
      <section className='amount-input-slider'>
        <Slider
          marks={{
            0: '0%',
            // 25: '25%',
            50: '50%',
            // 75: '75%',
            100: '100%',
          }}
          step={1}
          value={Number(mul(div(value, parsedSliderMax).toString(), 100).toFixed())}
          // value={Math.trunc((Number(value) / max) * 100)}
          onChange={(val) => {
            if (val === 100) {
              onChange(String(parsedSliderMax))
            } else {
              // onChange(String(toFixedNoExp((val / 100) * max, decimals)))
              onChange(
                mul(div(val, 100).toString(), parsedSliderMax)
                  .toFixed(decimals)
                  .replace(/\.?0+$/, '')
              )
            }
          }}
          min={0}
          max={100}
        />
      </section>
    </div>
  )
}

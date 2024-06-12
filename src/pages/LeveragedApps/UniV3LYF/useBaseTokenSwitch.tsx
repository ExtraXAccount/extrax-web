import { Form, Radio, Tooltip } from 'antd/es'
import { useEffect, useMemo, useState } from 'react'

import stableCoins from '@/constants/stableCoins'

export default function useBaseTokenSwitch(token0 = '', token1 = '') {
  const [baseToken, setBaseToken] = useState(0)

  useEffect(() => {
    setBaseToken(stableCoins.includes(token1) ? 1 : 0)
  }, [token1])

  const View = useMemo(() => {
    return function BaseTokenSwitch({
      label = true,
      onChange,
    }: {
      label?: boolean
      onChange?: () => any
    }) {
      if (!token0 || !token1) {
        return null
      }
      const RadioGroup = ({ tooltip = false }: any) => {
        return (
          <Radio.Group
            size="small"
            value={baseToken}
            buttonStyle="solid"
            onChange={(event) => {
              setBaseToken(event.target.value)
              onChange?.()
            }}
          >
            <Radio.Button value={0}>
              {tooltip ? (
                <Tooltip title={`Set base token to ${token0}`}>{token0}</Tooltip>
              ) : (
                token0
              )}
            </Radio.Button>
            <Radio.Button value={1}>
              {tooltip ? (
                <Tooltip title={`Set base token to ${token1}`}>{token1}</Tooltip>
              ) : (
                token1
              )}
            </Radio.Button>
          </Radio.Group>
        )
      }

      return label ? (
        <Form.Item label="Base token" style={{ marginBottom: 0 }}>
          <RadioGroup />
        </Form.Item>
      ) : (
        <RadioGroup tooltip />
      )
    }
  }, [baseToken, token0, token1])

  const invertBaseToken = useMemo(() => {
    return baseToken === 1
  }, [baseToken])

  return {
    baseToken,
    invertBaseToken,
    View,
  }
}

import './index.scss'

import classNames from 'classnames'

import { SupportedChainId } from '@/sdk/constants/chains'

import TokenIcon from '../TokenIcon'

export function specialNameChecker(token: string) {
  if (token === 'USDC+') {
    return 'usdcplus'
  } else if (token === 'USD+') {
    return 'usdplus'
  } else if (token === 'DAI+') {
    return 'daiplus'
  } else if (token === 'USDC.e') {
    return 'usdce'
  } else {
    return (token || '').toLowerCase()
  }
}

export default function LPName(props: {
  token0?: string
  token1?: string
  title?: string
  nobold?: boolean
  isStable?: boolean
  isMonitoring?: boolean
  isNew?: React.ReactNode
  chainId?: SupportedChainId
  type?: 'farm' | 'lend'
  hasPoints?: boolean
}) {
  const {
    token0,
    token1,
    title = token0 && token1 ? `${token0}-${token1}` : '',
    nobold = false,
    isNew,
    chainId,
    type = 'farm',
    hasPoints = false,
  } = props
  // if (!token0 || !token1) {
  //   return null
  // }
  return (
    <div className={classNames('lpname', `lpname-${type}`)}>
      {token0 && (
        <TokenIcon
          symbol={token0}
          chainId={chainId}
          className={classNames({
            'points-style': hasPoints,
          })}
        />
      )}
      {token1 && <TokenIcon symbol={token1} chainId={chainId} />}
      <p className={nobold ? '' : 'bold'}>{title}</p>
      {isNew && <i className="lpname-new">✨</i>}
    </div>
  )
}

import cx from 'classnames'
import { useMemo } from 'react'

import { SupportedChainId } from '@/sdk/constants/chains'
import { getTokenConfigByAddress } from '@/sdk/constants/token'

import { specialNameChecker } from '../LPName'
import { useWagmiCtx } from '../WagmiContext'

interface TokenIconProps {
  symbol?: string
  chainId?: SupportedChainId
  address?: string
  className?: string
}

export default function TokenIcon(props: TokenIconProps) {
  const { symbol, chainId, address, className } = props
  const { chainId: currentChainId } = useWagmiCtx()
  const realChainId = chainId || currentChainId

  const checkedSymbol = useMemo(() => {
    let tokenSymbol = symbol
    if (address) {
      tokenSymbol = getTokenConfigByAddress(realChainId, address)?.name
    }
    return specialNameChecker(tokenSymbol || '')
  }, [symbol, realChainId, address])

  return (
    <i
      className={cx(
        'coin',
        `coin-${checkedSymbol}`,
        `coin-chain-${realChainId}`,
        className,
      )}
    ></i>
  )
}

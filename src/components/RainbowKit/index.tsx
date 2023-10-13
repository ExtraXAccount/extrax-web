import '@rainbow-me/rainbowkit/styles.css'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactNode } from 'react'
import { createConfig, WagmiConfig } from 'wagmi'

import WagmiContextProvider from '@/components/WagmiContext'

import { chains, publicClient } from './getChainsConfig'
import { getWalletsConfig } from './getWalletsConfig'

const appName = 'ExtraX'
const projectId = 'eced84325207bcd6637a44683e3755e4' // Project ID of WalletConnect Cloud

export const connectors = getWalletsConfig({
  appName,
  projectId,
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const RainbowContextApp = ({ children }: { children: ReactNode }) => {
  // const theme = useTheme()

  return (
    <WagmiConfig config={wagmiConfig}>
      <WagmiContextProvider>
        <RainbowKitProvider
          modalSize="compact"
          // appInfo={{
          //   appName,
          //   learnMoreUrl: 'https://docs.extrafi.io/extra_finance/getting-started',
          //   disclaimer: Disclaimer,
          // }}
          chains={chains}
          showRecentTransactions
          // showRecentTransactions={false}
          // theme={theme.rainbow}
        >
          {children}
        </RainbowKitProvider>
      </WagmiContextProvider>
    </WagmiConfig>
  )
}

export default RainbowContextApp

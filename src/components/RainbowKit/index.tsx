import '@rainbow-me/rainbowkit/styles.css'

import { darkTheme, lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
// import { createConfig, WagmiConfig } from 'wagmi'
import { WagmiProvider } from 'wagmi'

import WagmiContextProvider from '../WagmiContext'
import { wagmiConfig } from './getChainsConfig'

const queryClient = new QueryClient()

const RainbowContextApp = ({ children }: { children: ReactNode }) => {
  // const theme = useTheme()

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiContextProvider>
          <RainbowKitProvider
            modalSize="compact"
            // appInfo={{
            //   appName,
            //   learnMoreUrl: 'https://docs.extrafi.io/extra_finance/getting-started',
            //   disclaimer: Disclaimer,
            // }}
            showRecentTransactions
          >
            {children}
          </RainbowKitProvider>
        </WagmiContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowContextApp

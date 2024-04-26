import '@rainbow-me/rainbowkit/styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactNode } from 'react'
// import { createConfig, WagmiConfig } from 'wagmi'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './getChainsConfig'
import WagmiContextProvider from '../WagmiContext'

const queryClient = new QueryClient();

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
            // theme={theme.rainbow}
          >
            {children}
          </RainbowKitProvider>
        </WagmiContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowContextApp

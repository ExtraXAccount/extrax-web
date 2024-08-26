// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { injectedWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { createConfig, http } from 'wagmi'
import { optimism } from 'wagmi/chains'

const appName = 'ExtraX'
const projectId = 'ae9bc6c16bf3d9121367f023f740150a' // Project ID of WalletConnect Cloud

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, walletConnectWallet],
    },
  ],
  {
    appName,
    projectId,
  }
)

// export const defaultConfig = getDefaultConfig({
//   appName,
//   projectId,
//   chains: [optimism] as any,
//   transports: {
//     [optimism.id]: http('https://rpc.tenderly.co/fork/fcdf1b53-1c59-4502-9bff-2887be8073b0'),
//     // [base.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
//   },
// });

export const wagmiConfig = createConfig({
  connectors,
  // appName,
  // projectId,
  chains: [optimism] as any,
  transports: {
    [optimism.id]: http('https://virtual.optimism.rpc.tenderly.co/77b8e846-c004-4697-8dab-7ee0e30df151'),
    // [base.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
  },
})

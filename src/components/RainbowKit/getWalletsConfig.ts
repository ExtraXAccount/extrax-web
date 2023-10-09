import { Chain, connectorsForWallets, WalletList } from '@rainbow-me/rainbowkit'
import {
  // argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  // ledgerWallet,
  metaMaskWallet,
  okxWallet,
  // rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'

const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent
const isMobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))

export const getWalletsConfig = ({
  appName,
  projectId,
  chains,
}: {
  appName: string
  projectId: string
  chains: Chain[]
}) => {
  const wallets: WalletList = [
    {
      groupName: 'Recommended',
      wallets: [
        // injected / not always shown
        injectedWallet({ chains }),
        safeWallet({ chains }),
        braveWallet({ chains }),
        // always shown
        metaMaskWallet({ projectId, chains }),
        coinbaseWallet({ appName, chains }),
        okxWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
        // rainbowWallet({ projectId, chains }),
        // ledgerWallet({ projectId, chains }),
        // trustWallet({ projectId, chains }),
      ],
    },
  ]

  if (!isMobile) {
    wallets[0].wallets.push(trustWallet({ projectId, chains }))
  }

  return connectorsForWallets(wallets)
}

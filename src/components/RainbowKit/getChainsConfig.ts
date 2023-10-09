import { configureChains } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { infuraProvider } from 'wagmi/providers/infura'
// import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { SupportedChainId } from '@/sdk/constants/chains'
import { FALLBACK_URLS } from '@/sdk/constants/network'

export const ALCHEMY_API_KEY =
  process.env.NODE_ENV === 'development' ? '6Rjc8z4uE-izjcZf2w_BbbdXiuyZden9' : 'oEk9gsFsYITNlTL4guXm5BmhcRZ24NfA'
const ALCHEMY_API_KEY_BASE =
  process.env.NODE_ENV === 'development' ? '4uTkolRkEpkMx7Egth0pzjJAd9IbYsJc' : '4uTkolRkEpkMx7Egth0pzjJAd9IbYsJc'

export const BASE_ALCHEMY_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_BASE}`
export const OP_ALCHEMY_URL = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// export const CLIENT_RPC_URLS = {
//   [SupportedChainId.OPTIMISM]: OP_ALCHEMY_URL,
//   [SupportedChainId.OPTIMISM_LOCAL_TEST]: 'https://rpc.extrafi.io/',
//   [SupportedChainId.BASE]: BASE_ALCHEMY_URL,
// }

const opMainNet = {
  ...optimism,
  rpcUrls: {
    default: {
      http: FALLBACK_URLS[SupportedChainId.OPTIMISM],
    },
    public: {
      http: FALLBACK_URLS[SupportedChainId.OPTIMISM],
    },
  },
}

const baseMainNet = {
  id: SupportedChainId.BASE,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  iconUrl: 'https://bridge.base.org/icons/base.svg',
  iconBackground: '',
  rpcUrls: {
    default: {
      http: FALLBACK_URLS[SupportedChainId.BASE],
    },
    public: {
      http: FALLBACK_URLS[SupportedChainId.BASE],
    },
  },
  blockExplorers: {
    default: {
      name: 'Base Explorer',
      url: 'https://basescan.org',
    },
  },
  testnet: false,
}

export const { chains, publicClient } = configureChains(
  [opMainNet, baseMainNet],
  [
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: 'https://rpc.extrafi.io',
    //   }),
    //   static: false,
    // }),

    // publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === SupportedChainId.OPTIMISM_LOCAL_TEST) {
          return { http: 'https://rpc.extrafi.io' }
        } else if (chain.id === SupportedChainId.BASE) {
          return {
            http: BASE_ALCHEMY_URL,
          }
        }
        return {
          http: OP_ALCHEMY_URL,
        }
      },
    }),
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
  ]
  // infuraProvider({ apiKey: '5dfbeb60641144778eb6edc35f570806', priority: 0 }),
  // publicProvider({ priority: 1 }),
)

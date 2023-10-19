import { configureChains } from 'wagmi'
import { base, optimism, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// import { FALLBACK_URLS } from '@/constants/network'
import { SupportedChainId } from '@/sdk/constants/chains'
import { ALCHEMY_API_KEY, BASE_ALCHEMY_URL, OP_ALCHEMY_URL } from '@/sdk/constants/network'

// const devnet = {
//   id: SupportedChainId.OPTIMISM_LOCAL_TEST,
//   name: 'Devnet',
//   network: 'devnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   iconBackground: '#fff',
//   rpcUrls: {
//     default: {
//       http: FALLBACK_URLS[SupportedChainId.OPTIMISM_LOCAL_TEST],
//     },
//     public: {
//       http: FALLBACK_URLS[SupportedChainId.OPTIMISM_LOCAL_TEST],
//     },
//   },
//   blockExplorers: optimismGoerli.blockExplorers,
//   testnet: true,
// }

export const { chains, publicClient } = configureChains(
  [optimism, base],
  [
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
)

import { SupportedChainId } from './chains'

export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  // [SupportedChainId.ROPSTEN]: [
  //   // "Fallback" URLs
  //   'https://rpc.ankr.com/eth_ropsten',
  // ],
  // [SupportedChainId.RINKEBY]: [
  //   // "Fallback" URLs
  //   'https://rinkeby-light.eth.linkpool.io/',
  // ],
  [SupportedChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
  ],
  // [SupportedChainId.KOVAN]: [
  //   // "Safe" URLs
  //   'https://kovan.poa.network',
  //   // "Fallback" URLs
  //   'https://eth-kovan.public.blastapi.io',
  // ],
  // [SupportedChainId.POLYGON]: [
  //   // "Safe" URLs
  //   'https://polygon-rpc.com/',
  //   'https://rpc-mainnet.matic.network',
  //   'https://matic-mainnet.chainstacklabs.com',
  //   'https://rpc-mainnet.maticvigil.com',
  //   'https://rpc-mainnet.matic.quiknode.pro',
  //   'https://matic-mainnet-full-rpc.bwarelabs.com',
  // ],
  // [SupportedChainId.POLYGON_MUMBAI]: [
  //   // "Safe" URLs
  //   'https://matic-mumbai.chainstacklabs.com',
  //   'https://rpc-mumbai.maticvigil.com',
  //   'https://matic-testnet-archive-rpc.bwarelabs.com',
  // ],
  // [SupportedChainId.ARBITRUM_ONE]: [
  //   // "Safe" URLs
  //   'https://arb1.arbitrum.io/rpc',
  //   // "Fallback" URLs
  //   'https://arbitrum.public-rpc.com',
  // ],
  // [SupportedChainId.ARBITRUM_RINKEBY]: [
  //   // "Safe" URLs
  //   'https://rinkeby.arbitrum.io/rpc',
  // ],
  [SupportedChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: [
    // "Safe" URLs
    'https://rpc.extrafi.io/',
    // "Fallback" URLs
    // 'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.BASE]: ['https://mainnet.base.org'],
  // [SupportedChainId.OPTIMISM_GOERLI]: [
  //   // "Safe" URLs
  //   'https://goerli.optimism.io',
  // ],
  // [SupportedChainId.CELO]: [
  //   // "Safe" URLs
  //   `https://forno.celo.org`,
  // ],
  // [SupportedChainId.CELO_ALFAJORES]: [
  //   // "Safe" URLs
  //   `https://alfajores-forno.celo-testnet.org`,
  // ],
}

export const RPC_URLS = {
  [SupportedChainId.OPTIMISM]: 'https://mainnet.optimism.io/',
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: 'https://rpc.extrafi.io/',
  [SupportedChainId.BASE]: 'https://mainnet.base.org',
}

export const ALCHEMY_API_KEY =
  process.env.NODE_ENV === 'development' ? '6Rjc8z4uE-izjcZf2w_BbbdXiuyZden9' : 'oEk9gsFsYITNlTL4guXm5BmhcRZ24NfA'
const ALCHEMY_API_KEY_BASE =
  process.env.NODE_ENV === 'development' ? '4uTkolRkEpkMx7Egth0pzjJAd9IbYsJc' : '4uTkolRkEpkMx7Egth0pzjJAd9IbYsJc'

export const BASE_ALCHEMY_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_BASE}`
export const OP_ALCHEMY_URL = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

export const CLIENT_RPC_URLS = {
  [SupportedChainId.OPTIMISM]: OP_ALCHEMY_URL,
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: 'https://rpc.extrafi.io/',
  [SupportedChainId.BASE]: BASE_ALCHEMY_URL,
}

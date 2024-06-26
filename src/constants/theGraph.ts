import { SupportedChainId } from './chains'

export const THE_GRAPH_ENDPOINT = {
  [SupportedChainId.OPTIMISM]:
    'https://gateway-arbitrum.network.thegraph.com/api/a4998f968b8ad324eb3e47ed20c00220/subgraphs/id/3Htp5TKs6BHCcwAYRCoBD6R4X62ThLRv2JiBBikyYze',
  [SupportedChainId.BASE]:
    'https://api.studio.thegraph.com/query/46015/extrafionbase/version/latest',
}

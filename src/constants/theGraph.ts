import { SupportedChainId } from './chains'

export const THE_GRAPH_ENDPOINT = {
  // [SupportedChainId.GOERLI]: 'https://api.studio.thegraph.com/query/19651/goerli/3.0.0',
  [SupportedChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/extrafi/extrasubgraph',
  [SupportedChainId.BASE]: 'https://api.thegraph.com/subgraphs/name/extrafi/extrafionbase',
}

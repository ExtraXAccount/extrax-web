import axios from 'axios'

import { THE_GRAPH_ENDPOINT } from '@/constants/theGraph'

import { SupportedChainId } from '../constants/chains'

export function getGraph(chainId: SupportedChainId, query: string) {
  if (!THE_GRAPH_ENDPOINT[chainId]) {
    return null
  }
  return axios.post(THE_GRAPH_ENDPOINT[chainId], {
    query,
  })
}

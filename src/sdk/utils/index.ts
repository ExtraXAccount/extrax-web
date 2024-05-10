import axios from 'axios'
// import { Contract } from 'ethers'

import { THE_GRAPH_ENDPOINT } from '@/constants/theGraph'

import { SupportedChainId } from '../constants/chains'
// import { JsonRpcProvider, JsonRpcSigner } from 'ethers'
// import { clientToProvider } from './clientToSigner'

export function getGraph(chainId: SupportedChainId, query: string) {
  if (!THE_GRAPH_ENDPOINT[chainId]) {
    return null
  }
  return axios.post(THE_GRAPH_ENDPOINT[chainId], {
    query,
  })
}

// async function getSigner(provider: JsonRpcProvider, account: string) {
//   const signer = await provider.getSigner(account)
//   return signer
// }

// // account is optional
// function getProviderOrSigner(provider: JsonRpcProvider, account?: string) {
//   return account ? getSigner(provider, account) : provider
// }

// // account is optional
// export async function getContract(
//   address: string,
//   ABI: any,
//   provider?: any,
//   client?: any
// ) {
//   // if (!isAddress(address) || address === AddressZero) {
//   //   throw Error(`Invalid 'address' parameter '${address}'.`)
//   // }

//   // console.log('getContract :>> ', { provider, account, signer }, getProviderOrSigner(provider, account))
//   const _provider = clientToProvider(client)
//   return new Contract(address, ABI, signer || provider)
// }

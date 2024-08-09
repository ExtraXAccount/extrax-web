import { BrowserProvider, FallbackProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers'
import { PublicClient, Transport, WalletClient } from 'viem'

export function clientToProvider(client: PublicClient | WalletClient) {
  const { chain, transport } = client
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  }
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    )
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

export function clientToSigner(client: PublicClient | WalletClient) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  }
  // const provider = new providers.Web3Provider(transport, network)
  // const signer = provider.getSigner(account.address)
  const provider = new BrowserProvider(transport as any, network)
  const signer = new JsonRpcSigner(provider, account?.address as string)
  return signer
}

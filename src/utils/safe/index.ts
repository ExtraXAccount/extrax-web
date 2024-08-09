import Safe from '@safe-global/protocol-kit'
import { PublicClient, WalletClient } from 'viem'

export async function getSafeProtocolKit(
  client: PublicClient | WalletClient,
  // provider,
  signer: string,
  safeAddress: string,
) {
  const { account, chain, transport } = client
  // const network = {
  //   chainId: chain?.id,
  //   name: chain?.name,
  //   ensAddress: chain?.contracts?.ensRegistry?.address,
  // }
  // const provider = new providers.Web3Provider(transport, network)
  // const signer = provider.getSigner(account.address)
  // const provider = new BrowserProvider(transport as any, network)
  // const signer = new JsonRpcSigner(provider, account?.address as string)
  // return signer

  const protocolKit = await Safe.init({
    provider: transport,
    signer,
    safeAddress,
  })

  // protocolKit.createTransaction()
  return protocolKit
}

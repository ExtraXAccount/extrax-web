import { serialize, useContractRead, useContractReads } from 'wagmi'

import { useWagmiCtx } from '@/components/WagmiContext'
import { getV2ConfigByVaultId, V2_CONFIG, V2_SUGAR_ADDRESS } from '@/constants/v2'
import dataProviderABI from '@/sdk/abis/DataProvider.json'
import useV2Contract from '@/sdk/v2'

// const dataProvider = {
//   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
//   abi: dataProviderABI,
// }
// const mlootContract = {
//   address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
//   abi: mlootABI,
// }

export default function Contract() {
  const v2Contract = useV2Contract()
  // const { chainId } = useWagmiCtx()

  // console.log('chainId :>> ', chainId, V2_CONFIG)
  // const config = V2_CONFIG[chainId]

  // console.log('config :>> ', config)

  // const vaults = Object.keys(config).map((key) => ({
  //   key,
  //   value: config[key],
  // }))
  // const vaultIds = vaults.map((item) => item.value.vaultId)
  // console.log('vaultIds :>> ', vaultIds)

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
  //   abi: dataProviderABI,
  //   functionName: 'getVaults',
  //   args: [vaultIds],
  // })

  // const serialized = serialize({ value: data })
  // console.log('useContractRead :>> ', data)
  return <div className="contract">{13}</div>
}

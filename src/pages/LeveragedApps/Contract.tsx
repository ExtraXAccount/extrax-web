import { useEffect, useState } from 'react'
import { serialize } from 'wagmi'

import { useWagmiCtx } from '@/components/WagmiContext'
import { V2_CONFIG } from '@/constants/v2'
import useV2Contract from '@/sdk/v2'

export default function Contract() {
  const { chainId } = useWagmiCtx()
  const { readContract } = useV2Contract()

  const [contractData, setContractData] = useState('')
  // console.log('v2Contract :>> ', v2Contract)

  useEffect(() => {
    async function getContractData() {
      const config = V2_CONFIG[chainId]
      if (!config) {
        return
      }
      const vaults = Object.keys(config).map((key) => ({
        key,
        value: config[key],
      }))
      const vaultIds = vaults.map((item) => item.value.vaultId)

      const res = await readContract('getVaults', [vaultIds])

      // const res2 = await publicClient.readContract({
      //   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
      //   abi: [...dataProviderABI],
      //   functionName: 'getVaults',
      //   args: [vaultIds],
      // })

      const serialized = serialize({ value: res })
      console.log('useContractRead :>> ', res)
      setContractData(serialized)
    }

    getContractData()
  }, [chainId, readContract])

  return <div className="contract-test">{contractData}</div>
}

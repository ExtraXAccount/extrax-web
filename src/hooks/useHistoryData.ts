import axios from 'axios'
import { concat } from 'lodash'
import { useEffect } from 'react'

import { SupportedChainId } from '@/sdk/constants/chains'
import { useLendStore } from '@/store'

function addChainId(arr: [], chainId = SupportedChainId.OPTIMISM) {
  return arr.map((i: any) => {
    return {
      ...i,
      chainId,
    }
  })
}

export function useHistoryData() {
  const { historyData, updateHistoryData } = useLendStore()

  useEffect(() => {
    if (historyData.length) {
      return
    }
    Promise.all([
      axios.get(
        `https://extra-static.s3.ap-southeast-1.amazonaws.com/data/pools/info.json`,
      ),
      axios.get(
        `https://extra-static.s3.ap-southeast-1.amazonaws.com/data/pools/info-base.json`,
      ),
    ]).then((r) => {
      const opRes = r[0].data
      const baseRes = r[1].data
      const merged = opRes.map((i, index) => {
        const baseItem = baseRes[index]
        return {
          ts: i.ts,
          lend: concat(
            addChainId(i.lend, SupportedChainId.OPTIMISM),
            addChainId(baseItem?.lend || [], SupportedChainId.BASE),
          ),
          // farm: concat(
          //   addChainId(i.farm, SupportedChainId.OPTIMISM),
          //   addChainId(baseItem?.farm || [], SupportedChainId.BASE),
          // ),
        }
      })
      updateHistoryData(merged)
    })
  }, [historyData.length, updateHistoryData])

  return historyData
}

import BigNumber from "bignumber.js";
import { map } from "lodash";
import { useMemo } from "react";

import { minus, plus } from "@/utils/math/bigNumber";

import useSmartAccount from "./useSmartAccount";

export default function useNetworthInfo() {
  const { currentAccount, accounts, netWorth, isSmartAccount, formattedUserPositionMap } = useSmartAccount()

  const data = useMemo(() => {
    let totalNetworth = '0'
    let eoaAccount
    map(formattedUserPositionMap, (value: any, key: string) => {
      totalNetworth = plus(totalNetworth, value.netWorthUSD).toString()
      //check eoa account
      if (!accounts.includes(key as any)) {
        eoaAccount = key
      }
    })
    const eoaNetworth = formattedUserPositionMap ? formattedUserPositionMap[eoaAccount]?.netWorthUSD : '0'
    return {
      totalNetworth,
      eoaNetworth,
      smartNetworth: minus(totalNetworth, eoaNetworth).toString()
    }
  }, [formattedUserPositionMap, accounts])

  return data
}
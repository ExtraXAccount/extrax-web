import { formatReserveUSD } from '@aave/math-utils'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'

import { useWagmiCtx } from '@/components/WagmiContext'
import { chainIdToName, SupportedChainId } from '@/constants/chains'
// import usePrices from '@/hooks/usePrices'
// import { useLendingManager2 } from '@/hooks/useSDK'
// import useSmartAccount from '@/hooks/useSmartAccount'
// import { LendingConfig } from '@/sdk/lending/lending-pool'
import { getLendingGlobalState } from '@/sdk-ethers/extra-x-lending/state'
import { useAccountStore, useLendStore } from '@/store'
import { IFormattedLendPool } from '@/store/lend'
import { aprToApy } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'
import { stringToDecimals } from '@/utils/math/bn'

export default function useLendingList() {
  const { reservesData, updateReservesData, isFetching, updateIsFetching } =
    useLendStore()
  // const { balances } = useAccountStore()
  // const { getPrice } = usePrices()

  const { chainId } = useWagmiCtx()

  // const chainLendingConfig = useMemo(() => {
  //   return Object.values<(typeof LendingConfig)[chainId][LendPoolConfig]>(LendingConfig[chainId] || {})
  // }, [chainId])

  // const fetchLendPools = useCallback(async () => {
  //   updateIsFetching(true)
  //   try {
  //     const res = await lendingMng.getPoolStatus()
  //     console.log('multicallPoolsStatus :>> ', res)
  //     updateLendPools([])
  //   } finally {
  //     updateIsFetching(false)
  //   }
  // }, [lendingMng, updateIsFetching, updateLendPools])

  const fetchPoolState = useCallback(async () => {
    const { reservesData, baseCurrencyData } = await getLendingGlobalState(chainId)
    const formattedReserves = reservesData.map((reserve) => {
      const formattedReserve = formatReserveUSD({
        reserve,
        currentTimestamp: dayjs().unix(),
        marketReferencePriceInUsd: baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
      })
      // return formattedReserve
      return { ...reserve, ...formattedReserve }
    })
    updateReservesData({
      formattedReserves,
      baseCurrencyData,
    })
    console.log('formattedReserves :>> ', formattedReserves)
    return formattedReserves
  }, [chainId, updateReservesData])

  // const formattedLendPools: IFormattedLendPool[] = useMemo(() => {
  //   return lendPools.map((pool, index) => {
  //     const config = chainLendingConfig[index]
  //     const position = positions.find(
  //       (item) => item.reserveId === config.reserveId && item.marketId === config.marketId
  //     )

  //     const apr =
  //       stringToDecimals(pool.currentBorrowingRate.toString(), 18) *
  //         div(pool.totalDebts.toString(), pool.totalLiquidity.toString()).toNumber() || 0
  //     const borrowApr = stringToDecimals(pool.currentBorrowingRate.toString(), 18) || 0
  //     return {
  //       ...config,
  //       ...pool,
  //       tokenSymbol: config.name,
  //       poolKey: config.name,
  //       formatted: {
  //         apr,
  //         apy: aprToApy(apr) || 0,
  //         borrowApr,
  //         borrowApy: aprToApy(borrowApr) || 0,
  //         totalSupply: stringToDecimals(pool.totalLiquidity.toString(), config.decimals) || 0,
  //         supplyCap: stringToDecimals(pool.config.supplyCap.toString(), 68) || 0,
  //         totalBorrowed: stringToDecimals(pool.totalDebts.toString(), config.decimals) || 0,
  //         borrowCap: stringToDecimals(pool.config.borrowCap.toString(), 68) || 0,
  //         availableLiquidity: stringToDecimals(pool.availableLiquidity.toString(), config.decimals) || 0,
  //         utilization: div(pool.totalDebts.toString(), pool.totalLiquidity.toString()).toNumber() || 0,
  //         exchangeRate: stringToDecimals(pool.exchangeRate.toString()) || 0,
  //         balance: stringToDecimals(balances[index * 3]?.toString(), config.decimals) || 0,
  //         deposited: position ? stringToDecimals(position.liquidity?.toString(), config.decimals) || 0 : 0,
  //         borrowed: position ? stringToDecimals(position.debt?.toString(), config.decimals) || 0 : 0,
  //         depositedBal: stringToDecimals(balances[index * 3 + 1]?.toString(), config.decimals) || 0,
  //         borrowedBal: stringToDecimals(balances[index * 3 + 2]?.toString(), config.decimals) || 0,
  //       },
  //     }
  //   })
  // }, [balances, positions, chainLendingConfig, lendPools])

  const totalInfos = useMemo(() => {
    let totalSize = 0
    let totalBorrowed = 0
    reservesData.formattedReserves.forEach((pool) => {
      totalSize += Number(pool.totalLiquidityUSD)
      totalBorrowed += Number(pool.totalDebtUSD) || 0
    })
    const totalAvailable = totalSize - totalBorrowed
    const globalUtilization = totalBorrowed / totalSize

    return {
      totalSize,
      totalBorrowed,
      totalAvailable,
      globalUtilization,
      maxOutflow: 5_000_000,
    }
  }, [reservesData.formattedReserves])

  return {
    formattedLendPools: reservesData.formattedReserves,
    fetchPoolState,
    totalInfos,
    // fetchLendPools,
    isFetching,
  }
}

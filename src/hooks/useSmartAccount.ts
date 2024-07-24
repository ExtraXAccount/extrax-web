import { sumBy } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
// import useCredit from '@/hooks/useCredit'
// import useDebt from '@/hooks/useDebt'
// import useDeposited from '@/hooks/useDeposited'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { useAppSelector } from '@/state'
import { useAccountStore, useLendStore } from '@/store'
import { bi2decimalStr } from '@/utils/bigInt'
import { aprToApy, toPrecision } from '@/utils/math'
import { minus } from '@/utils/math/bigNumber'

type ChainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[ChainId]

export const INFINITY = '∞'

export interface AccountInfo {
  account: `0x${string}`
  balances: any
  collateral: bigint
  collateralDeciamls: number
  debt: bigint
  debtDecimals: number
  depositedVal: number
  debtVal: number
}

export default function useSmartAccount() {
  const { prices } = usePrices()
  // const { maxCredit, availableCredit, usedCredit } = useCredit()
  const lendingList = useAppSelector((state) => state.lending.poolStatus)
  // const { account = '', smartAccount } = useWagmiCtx()
  const positions = useAppSelector((state) => state.position.userPositions)

  const { chainId } = useWagmiCtx()
  const {
    accounts,
    // accountInfo,
    updateAccounts,
    updateAccountInfo,
    updateBalances,
    // updatePositions,
    updateSupportedAssets,
    updateSupportedDebts,
  } = useAccountStore()

  const { healthStatus, updatePositions, updateHealthStatus } = useLendStore()
  // console.log('accountInfo :>> ', accountInfo);

  const accountMng = useAccountManager()
  const lendingMng = useLendingManager()

  const chainLendingConfig = useMemo(() => {
    return Object.values<(typeof LendingConfig)[ChainId][LendPoolConfig]>(
      LendingConfig[chainId] || {},
    )
  }, [chainId])

  const getAccountInfo = useCallback(
    async (acc) => {
      console.log('getAccountInfo :>> ', acc)
      if (!acc) {
        return
      }
      const { account, collateral, collateralDeciamls, debt, debtDecimals } =
        await accountMng.getCollateralAndDebtValue(acc)

      updateAccountInfo({
        balances: [],
        account,
        collateral,
        collateralDeciamls,
        debt,
        debtDecimals,
        depositedVal: Number(
          (collateral > 0n
            ? collateral / BigInt(10 ** collateralDeciamls)
            : 0n
          ).toString(),
        ),
        debtVal: Number((debt > 0n ? debt / BigInt(10 ** debtDecimals) : 0n).toString()),
      })
    },
    [accountMng, updateAccountInfo],
  )

  const fetchBalances = useCallback(
    async (acc) => {
      if (!acc) {
        return []
      }
      const tokens = chainLendingConfig.reduce(
        (arr: any, item) =>
          arr.concat([item.underlyingTokenAddress, item.eToken, item.debtToken]),
        [],
      )
      // console.log('fetchBalances :>> ', { acc, tokens })
      const [...res] = await accountMng.getBalances([acc], tokens)
      updateBalances(res)
    },
    [chainLendingConfig, accountMng, updateBalances],
  )
  // const fetchUserHealthStatus = useCallback(
  //   async (acc) => {
  //     const healthStatus = await lendingMng.getUserHealthStatus(acc)
  //     updateHealthStatus(healthStatus)
  //   },
  //   [lendingMng, updateHealthStatus],
  // )

  const fetchUserLending = useCallback(
    async (acc) => {
      const [healthStatus, positions] = await Promise.all([
        lendingMng.getUserHealthStatus(acc),
        lendingMng.getUserPositions(acc),
      ])
      updateHealthStatus({
        ...healthStatus,
        formatted: {
          collateralValueUsd: bi2decimalStr(
            healthStatus.collateralValue.value,
            healthStatus.collateralValue.decimals,
          ),
          debtValueUsd: bi2decimalStr(
            healthStatus.debtValue.value,
            healthStatus.debtValue.decimals,
          ),
          healthFactor: bi2decimalStr(healthStatus.healthFactor),
          liquidationThresholdPercent: bi2decimalStr(
            healthStatus.liquidationThreshold.value,
            healthStatus.liquidationThreshold.decimals + 1,
          ),
          ltvPercent: bi2decimalStr(
            healthStatus.ltv.value,
            healthStatus.ltv.decimals + 2,
          ),
        },
      })
      updatePositions(positions)
    },
    [lendingMng, updateHealthStatus, updatePositions],
  )

  const getInitData = useCallback(async () => {
    accountMng.getAccounts().then((accounts) => {
      updateAccounts(accounts)
      // getAccountInfo(accounts?.[0])
      fetchBalances(accounts?.[0])
      fetchUserLending(accounts?.[0])
    })

    accountMng.getSupportedAssets().then((res) => {
      updateSupportedAssets(res)
    })

    accountMng.getSupportedDebts().then((res) => {
      updateSupportedDebts(res)
    })
  }, [
    accountMng,
    fetchBalances,
    fetchUserLending,
    // getAccountInfo,
    updateAccounts,
    updateSupportedAssets,
    updateSupportedDebts,
  ])

  const updateAfterAction = useCallback(
    async (account: Address) => {
      // getAccountInfo(account)
      fetchBalances(account)
      fetchUserLending(account)
    },
    [fetchBalances, fetchUserLending],
  )

  const depositedVal = Number(healthStatus?.formatted?.collateralValueUsd) || 0
  const debtVal = Number(healthStatus?.formatted?.debtValueUsd) || 0

  const accountAPY = useMemo(() => {
    const totalApy =
      (sumBy(
        lendingList,
        (item: any) =>
          (item.SavingsDAI || 0) * 0.05 +
          aprToApy(item.apr) * item.deposited * prices[item.tokenSymbol] -
          item.borrowingRate * item.borrowed * prices[item.tokenSymbol],
      ) +
        sumBy(positions, (item: any) => item.apr * item.totalPositionValue)) /
      depositedVal

    return totalApy
  }, [depositedVal, lendingList, positions, prices])

  return {
    healthStatus,
    accountEquity: minus(
      healthStatus.formatted?.collateralValueUsd,
      healthStatus.formatted?.debtValueUsd,
    ).toString(),
    healthFactorPercent: Number(healthStatus.formatted?.healthFactor),
    accounts,
    // smartAccount: depositedVal ? smartAccount : '',
    smartAccount: accounts[0],
    depositedVal,
    getInitData,
    updateAfterAction,
    getAccountInfo,
    // depositedAssets,
    debtVal,
    // debtAssets,
    // maxCredit,
    maxCredit: healthStatus.formatted?.collateralValueUsd,
    availableCredit: minus(
      healthStatus.formatted?.collateralValueUsd,
      healthStatus.formatted?.debtValueUsd,
    ).toString(),
    usedCredit: healthStatus.formatted?.debtValueUsd,
    accountAPY,
    // supportedAssets,
    // supportedDebts,
    lendingList,
  }
}

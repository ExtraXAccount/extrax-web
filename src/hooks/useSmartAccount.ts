import { sumBy } from 'lodash'
import { useCallback, useMemo } from 'react'
import { Address } from 'viem'

import { useWagmiCtx } from '@/components/WagmiContext'
import usePrices from '@/hooks/usePrices'
import { useAccountManager, useLendingManager } from '@/hooks/useSDK'
import useLendingList from '@/pages/Lend/useLendingList'
import { LendingConfig } from '@/sdk/lending/lending-pool'
import { useAccountStore, useLendStore } from '@/store'
import { bi2decimalStr } from '@/utils/bigInt'
import { div, minus, plus } from '@/utils/math/bigNumber'

type ChainId = keyof typeof LendingConfig
type LendPoolConfig = keyof (typeof LendingConfig)[ChainId]

export default function useSmartAccount() {
  const { prices, getPrice } = usePrices()

  const { chainId } = useWagmiCtx()
  const {
    accounts,
    currentAccount,
    // accountInfo,
    updateAccounts,
    updateAccountInfo,
    updateBalances,
    // updatePositions,
    updateSupportedAssets,
    updateSupportedDebts,
    healthStatus,
    updateHealthStatus,
  } = useAccountStore()

  const { updatePositions } = useLendStore()
  const { formattedLendPools } = useLendingList()
  // console.log('accountInfo :>> ', accountInfo);

  const { depositedVal, debtVal, leverage, netWorth } = useMemo(() => {
    const depositedVal = Number(healthStatus?.formatted?.collateralValueUsd) || 0
    const debtVal = Number(healthStatus?.formatted?.debtValueUsd) || 0
    const netWorth = minus(
      healthStatus.formatted?.collateralValueUsd,
      healthStatus.formatted?.debtValueUsd,
    ).toNumber()
    const leverage = !netWorth ? 0 : div(depositedVal, netWorth).toString()
    return {
      depositedVal,
      debtVal,
      leverage: Number(leverage) || 0,
      netWorth,
    }
  }, [healthStatus?.formatted?.collateralValueUsd, healthStatus?.formatted?.debtValueUsd])

  const { accountApr, accountApy } = useMemo(() => {
    // console.log('accountApr formattedLendPools :>> ', depositedVal, formattedLendPools)
    if (!depositedVal) {
      return {
        accountApr: 0,
        accountApy: 0,
      }
    }

    const totalApr =
      sumBy(
        formattedLendPools,
        (item) =>
          item.formatted.apr * item.formatted.deposited * getPrice(item.tokenSymbol) -
            item.formatted.borrowApr *
              item.formatted.borrowed *
              getPrice(item.tokenSymbol) || 0,
      ) / depositedVal

    const totalApy =
      sumBy(
        formattedLendPools,
        (item) =>
          item.formatted.apy * item.formatted.deposited * getPrice(item.tokenSymbol) -
            item.formatted.borrowApy *
              item.formatted.borrowed *
              getPrice(item.tokenSymbol) || 0,
      ) / depositedVal

    return {
      accountApr: totalApr,
      accountApy: totalApy,
    }
  }, [depositedVal, formattedLendPools, getPrice])

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
          liquidationThreshold: bi2decimalStr(
            healthStatus.liquidationThreshold.value,
            healthStatus.liquidationThreshold.decimals,
          ),
          ltv: bi2decimalStr(healthStatus.ltv.value, healthStatus.ltv.decimals),
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

  const LTV = useMemo(() => {
    if (!depositedVal) {
      return {
        current: 0,
        max: 0,
        liquidation: 0,
      }
    }
    return {
      current: debtVal / depositedVal,
      max: Number(healthStatus.formatted?.ltv) / depositedVal,
      liquidation: Number(healthStatus.formatted?.liquidationThreshold) / depositedVal,
    }
  }, [
    debtVal,
    depositedVal,
    healthStatus.formatted?.liquidationThreshold,
    healthStatus.formatted?.ltv,
  ])

  return {
    accounts,
    currentAccount: currentAccount || accounts?.[0],
    healthStatus,
    leverage,
    depositedVal,
    debtVal,
    netWorth,
    healthFactor: Number(healthStatus.formatted?.healthFactor) || 0,
    liquidationThreshold: Number(healthStatus.formatted?.liquidationThreshold) || 0,
    LTV,
    maxCredit: healthStatus.formatted?.ltv,
    availableCredit: minus(
      healthStatus.formatted?.ltv,
      healthStatus.formatted?.debtValueUsd,
    ).toString(),
    usedCredit: Number(healthStatus.formatted?.debtValueUsd) || 0,
    accountApr,
    accountApy,

    getInitData,
    updateAfterAction,
    getAccountInfo,
  }
}

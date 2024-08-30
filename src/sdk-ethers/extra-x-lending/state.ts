import { chainIdToName } from '@/constants/chains'
import { IUiPoolDataProviderV3 } from '@/typechain-types'
import { PoolBaseCurrencyHumanized, ReserveDataHumanized } from '@/types/aave'
import { bi2num } from '@/utils/bigInt'

import { LendingPoolConfig } from '../config/constants'
import { POOL_ADDRESSES_PROVIDER_ID } from '../config/contract-id'
import { getUiDataProvider } from './contract-helpers/ui-data-provider'

export async function getLendingGlobalState(chainId: number) {
  const chain = chainIdToName[chainId]
  const dataProvider = getUiDataProvider(chain)

  // const reserveList = await dataProvider.getReservesList(
  //   LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID]
  // )
  // console.log(reserveList)

  const lendingPoolAddressProvider = LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID]
  const { 0: reservesRaw, 1: poolBaseCurrencyRaw } = await dataProvider.getReservesData(
    lendingPoolAddressProvider
  )

  // console.log('reservesRaw :>> ', reservesRaw)
  const reservesData = reservesRaw.map((reserveRaw) => ({
    reserveRaw: (reserveRaw as any).toObject(),
    id: `${chainId}-${reserveRaw.underlyingAsset}`.toLowerCase(),
    // id: reserveRaw.underlyingAsset.toLowerCase(),
    underlyingAsset: reserveRaw.underlyingAsset.toLowerCase(),
    name: reserveRaw.name,
    symbol: reserveRaw.symbol,
    // symbol: ammSymbolMap[reserveRaw.underlyingAsset.toLowerCase()]
    //   ? ammSymbolMap[reserveRaw.underlyingAsset.toLowerCase()]
    //   : reserveRaw.symbol,
    decimals: bi2num(reserveRaw.decimals),
    baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
    reserveLiquidationThreshold: reserveRaw.reserveLiquidationThreshold.toString(),
    reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
    reserveFactor: reserveRaw.reserveFactor.toString(),
    usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
    borrowingEnabled: reserveRaw.borrowingEnabled,
    stableBorrowRateEnabled: reserveRaw.stableBorrowRateEnabled,
    isActive: reserveRaw.isActive,
    isFrozen: reserveRaw.isFrozen,
    liquidityIndex: reserveRaw.liquidityIndex.toString(),
    variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
    liquidityRate: reserveRaw.liquidityRate.toString(),
    variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
    stableBorrowRate: reserveRaw.stableBorrowRate.toString(),
    lastUpdateTimestamp: bi2num(reserveRaw.lastUpdateTimestamp),
    aTokenAddress: reserveRaw.aTokenAddress,
    stableDebtTokenAddress: reserveRaw.stableDebtTokenAddress,
    variableDebtTokenAddress: reserveRaw.variableDebtTokenAddress,
    interestRateStrategyAddress: reserveRaw.interestRateStrategyAddress,
    availableLiquidity: reserveRaw.availableLiquidity.toString(),
    totalPrincipalStableDebt: reserveRaw.totalPrincipalStableDebt.toString(),
    averageStableRate: reserveRaw.averageStableRate.toString(),
    stableDebtLastUpdateTimestamp: bi2num(reserveRaw.stableDebtLastUpdateTimestamp),
    totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
    priceInMarketReferenceCurrency: reserveRaw.priceInMarketReferenceCurrency.toString(),
    priceOracle: reserveRaw.priceOracle,
    variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
    variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
    stableRateSlope1: reserveRaw.stableRateSlope1.toString(),
    stableRateSlope2: reserveRaw.stableRateSlope2.toString(),
    baseStableBorrowRate: reserveRaw.baseStableBorrowRate.toString(),
    baseVariableBorrowRate: reserveRaw.baseVariableBorrowRate.toString(),
    optimalUsageRatio: reserveRaw.optimalUsageRatio.toString(),
    // new fields
    isPaused: reserveRaw.isPaused,
    debtCeiling: reserveRaw.debtCeiling.toString(),
    eModeCategoryId: bi2num(reserveRaw.eModeCategoryId),
    borrowCap:
      reserveRaw.borrowCap.toString() === '0' ? '1000000' : reserveRaw.borrowCap.toString(),
    supplyCap:
      reserveRaw.supplyCap.toString() === '0' ? '1000000' : reserveRaw.supplyCap.toString(),
    eModeLtv: bi2num(reserveRaw.eModeLtv),
    eModeLiquidationThreshold: bi2num(reserveRaw.eModeLiquidationThreshold),
    eModeLiquidationBonus: bi2num(reserveRaw.eModeLiquidationBonus),
    eModePriceSource: reserveRaw.eModePriceSource,
    eModeLabel: reserveRaw.eModeLabel,
    borrowableInIsolation: reserveRaw.borrowableInIsolation,
    accruedToTreasury: reserveRaw.accruedToTreasury.toString(),
    unbacked: reserveRaw.unbacked.toString(),
    isolationModeTotalDebt: reserveRaw.isolationModeTotalDebt.toString(),
    debtCeilingDecimals: bi2num(reserveRaw.debtCeilingDecimals),
    isSiloedBorrowing: reserveRaw.isSiloedBorrowing,
    flashLoanEnabled: reserveRaw.flashLoanEnabled,
    virtualAccActive: false,
    virtualUnderlyingBalance: '0',
  }))

  const baseCurrencyData: PoolBaseCurrencyHumanized = {
    // this is to get the decimals from the unit so 1e18 = string length of 19 - 1 to get the number of 0
    marketReferenceCurrencyDecimals:
      poolBaseCurrencyRaw.marketReferenceCurrencyUnit.toString().length - 1,
    marketReferenceCurrencyPriceInUsd:
      poolBaseCurrencyRaw.marketReferenceCurrencyPriceInUsd.toString(),
    networkBaseTokenPriceInUsd: poolBaseCurrencyRaw.networkBaseTokenPriceInUsd.toString(),
    networkBaseTokenPriceDecimals: bi2num(poolBaseCurrencyRaw.networkBaseTokenPriceDecimals),
  }

  console.log('getLendingGlobalState :>> ', reservesData, baseCurrencyData)
  return {
    reservesData,
    baseCurrencyData,
  }
}

export async function getLendingUserState(chainId: number, user: string) {
  const chain = chainIdToName[chainId]
  const dataProvider = getUiDataProvider(chain)

  const userDataResult: [IUiPoolDataProviderV3.UserReserveDataStructOutput[], bigint] =
    await dataProvider.getUserReservesData(
      LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID],
      user
    )

  const positions = userDataResult[0].map((data) => {
    const [
      underlyingAsset,
      scaledATokenBalance,
      usageAsCollateralEnabledOnUser,
      stableBorrowRate,
      scaledVariableDebt,
      principalStableDebt,
      stableBorrowLastUpdateTimestamp,
    ] = data
    return {
      underlyingAsset,
      scaledATokenBalance: scaledATokenBalance.toString(),
      usageAsCollateralEnabledOnUser,
      stableBorrowRate: stableBorrowRate.toString(),
      scaledVariableDebt: scaledVariableDebt.toString(),
      principalStableDebt: principalStableDebt.toString(),
      stableBorrowLastUpdateTimestamp: bi2num(stableBorrowLastUpdateTimestamp),
    }
  })
  console.log('getLendingUserState :>> ', positions, userDataResult[1])
  return positions
}

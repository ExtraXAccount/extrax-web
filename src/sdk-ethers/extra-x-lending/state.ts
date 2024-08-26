import { IUiPoolDataProviderV3 } from '@/typechain-types'

import { LendingPoolConfig } from '../config/constants'
import { POOL_ADDRESSES_PROVIDER_ID } from '../config/contract-id'
import { getUiDataProvider } from './contract-helpers/ui-data-provider'

export async function getLendingState(chain: string, user?: string) {
  await getLendingGlobalState(chain)

  if (user) {
    await getLendingUserState(chain, user)
  }
}

export async function getLendingGlobalState(chain: string) {
  const dataProvider = getUiDataProvider(chain)

  const reserveList = await dataProvider.getReservesList(LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID])
  console.log(reserveList)

  const aggrReserveDataResult: [
    IUiPoolDataProviderV3.AggregatedReserveDataStructOutput[],
    IUiPoolDataProviderV3.BaseCurrencyInfoStructOutput
  ] = await dataProvider.getReservesData(LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID])

  const lendPoolStates = aggrReserveDataResult[0].map((data) => {
    const [
      underlyingAsset,
      name,
      symbol,
      decimals,
      baseLTVasCollateral,
      reserveLiquidationThreshold,
      reserveLiquidationBonus,
      reserveFactor,
      usageAsCollateralEnabled,
      borrowingEnabled,
      stableBorrowRateEnabled,
      isActive,
      isFrozen,
      liquidityIndex,
      variableBorrowIndex,
      liquidityRate,
      variableBorrowRate,
      stableBorrowRate,
      lastUpdateTimestamp,
      aTokenAddress,
      stableDebtTokenAddress,
      variableDebtTokenAddress,
      interestRateStrategyAddress,
      availableLiquidity,
      totalPrincipalStableDebt,
      averageStableRate,
      stableDebtLastUpdateTimestamp,
      totalScaledVariableDebt,
      priceInMarketReferenceCurrency,
      priceOracle,
      variableRateSlope1,
      variableRateSlope2,
      stableRateSlope1,
      stableRateSlope2,
      baseStableBorrowRate,
      baseVariableBorrowRate,
      optimalUsageRatio,
      isPaused,
      isSiloedBorrowing,
      accruedToTreasury,
      unbacked,
      isolationModeTotalDebt,
      flashLoanEnabled,
      debtCeiling,
      debtCeilingDecimals,
      eModeCategoryId,
      borrowCap,
      supplyCap,
      eModeLtv,
      eModeLiquidationThreshold,
      eModeLiquidationBonus,
      eModePriceSource,
      eModeLabel,
      borrowableInIsolation,
    ] = data
    return {
      underlyingAsset,
      name,
      symbol,
      decimals,
      baseLTVasCollateral,
      reserveLiquidationThreshold,
      reserveLiquidationBonus,
      reserveFactor,
      usageAsCollateralEnabled,
      borrowingEnabled,
      stableBorrowRateEnabled,
      isActive,
      isFrozen,
      liquidityIndex,
      variableBorrowIndex,
      liquidityRate,
      variableBorrowRate,
      stableBorrowRate,
      lastUpdateTimestamp,
      aTokenAddress,
      stableDebtTokenAddress,
      variableDebtTokenAddress,
      interestRateStrategyAddress,
      availableLiquidity,
      totalPrincipalStableDebt,
      averageStableRate,
      stableDebtLastUpdateTimestamp,
      totalScaledVariableDebt,
      priceInMarketReferenceCurrency,
      priceOracle,
      variableRateSlope1,
      variableRateSlope2,
      stableRateSlope1,
      stableRateSlope2,
      baseStableBorrowRate,
      baseVariableBorrowRate,
      optimalUsageRatio,
      isPaused,
      isSiloedBorrowing,
      accruedToTreasury,
      unbacked,
      isolationModeTotalDebt,
      flashLoanEnabled,
      debtCeiling,
      debtCeilingDecimals,
      eModeCategoryId,
      borrowCap,
      supplyCap,
      eModeLtv,
      eModeLiquidationThreshold,
      eModeLiquidationBonus,
      eModePriceSource,
      eModeLabel,
      borrowableInIsolation,
    }
  })
  console.log('getLendingGlobalState :>> ', aggrReserveDataResult, lendPoolStates)
  return lendPoolStates
}

export async function getLendingUserState(chain, user: string) {
  const dataProvider = getUiDataProvider(chain)

  const userDataResult: [IUiPoolDataProviderV3.UserReserveDataStructOutput[], bigint] =
    await dataProvider.getUserReservesData(LendingPoolConfig[chain][POOL_ADDRESSES_PROVIDER_ID], user)

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
      scaledATokenBalance,
      usageAsCollateralEnabledOnUser,
      stableBorrowRate,
      scaledVariableDebt,
      principalStableDebt,
      stableBorrowLastUpdateTimestamp,
    }
  })
  console.log('getLendingUserState :>> ', positions, userDataResult[1])
  return positions
}

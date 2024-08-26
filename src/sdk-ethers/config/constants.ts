import BaseDeployments from './deployments/base.json'
import OptimismDeployments from './deployments/optimism.json'

export const LendingPoolConfig = {
  ['optimism']: OptimismDeployments,
  ['base']: BaseDeployments,
}

export const ReserveAssets = {
  ['optimism']: {
    DAI: {
      Reserve: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      ATokenAddress: OptimismDeployments['DAI-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['DAI-VariableDebtToken-ExtraXLending'],
    },
    USDC: {
      Reserve: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      ATokenAddress: OptimismDeployments['USDC-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['USDC-VariableDebtToken-ExtraXLending'],
    },
    WBTC: {
      Reserve: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
      ATokenAddress: OptimismDeployments['WBTC-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['WBTC-VariableDebtToken-ExtraXLending'],
    },
    WETH: {
      Reserve: '0x4200000000000000000000000000000000000006',
      ATokenAddress: OptimismDeployments['WETH-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['WETH-VariableDebtToken-ExtraXLending'],
    },
    USDT: {
      Reserve: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      ATokenAddress: OptimismDeployments['USDT-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['USDT-VariableDebtToken-ExtraXLending'],
    },
    SUSD: {
      Reserve: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
      ATokenAddress: OptimismDeployments['SUSD-AToken-ExtraXLending'],
      DebtTokenAddress: OptimismDeployments['SUSD-VariableDebtToken-ExtraXLending'],
    },
  },
  ['base']: {
    WETH: {
      Reserve: '0x4200000000000000000000000000000000000006',
      ATokenAddress: '',
      DebtTokenAddress: '',
    },
    USDC: {
      Reserve: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      ATokenAddress: '',
      DebtTokenAddress: '',
    },
  },
}

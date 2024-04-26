// import { ethers } from "hardhat";
import {
  ADDRESS_ID_EXTRA_ADMIN_CONTROL,
  ADDRESS_ID_EXTRA_PROXY_UPDATE_CONTROLLER,
  ADDRESS_ID_EXTRA_TREASURY,
  ADDRESS_ID_EXTRA_X_ACCOUNT_FACTORY,
  ADDRESS_ID_EXTRA_X_ACCOUNT_SINGLETON,
  ADDRESS_ID_EXTRA_X_FUNC_FILTER_ERC20,
  ADDRESS_ID_EXTRA_X_FUNC_FILTER_LENDING,
  ADDRESS_ID_EXTRA_X_FUNC_FILTER_UNI_V3_PM,
  ADDRESS_ID_EXTRA_X_FUNC_FILTER_UNI_V3_ROUTER,
  ADDRESS_ID_EXTRA_X_HEALTH_MANAGER,
  ADDRESS_ID_EXTRA_X_LENDINGPOOL,
  ADDRESS_ID_EXTRA_X_Lending_DEBT_TOKEN_IMPL,
  ADDRESS_ID_EXTRA_X_Lending_E_TOKEN_IMPL,
  ADDRESS_ID_EXTRA_X_ORACLE_MANAGER,
  ADDRESS_ID_EXTRA_X_TRANSACTION_FILTER,
  ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_DEBT_TOKEN,
  ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_E_TOKEN,
  ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_UNI_V3_POS,
  ADDRESS_ID_WETH,
  ADDRESS_ID_PRICE_FEED_CHAINLINK,
  ADDRESS_ID_PRICE_FEED_UNISWAP_V3,
  ADDRESS_ID_UNISWAP_V3_FACTORY,
  ADDRESS_ID_UNISWAP_V3_ROUTER,
  ADDRESS_ID_UNISWAP_V3_POS_MANAGER,
} from "./address-id";
import { defaultChainId } from "@/constants";
import { CONTRACT_ADDRESSES } from "@/constants/addresses";
import { useWagmiCtx } from '@/components/WagmiContext'
import { useCallback } from "react";
import AddressRegistry from './AddressRegistry.json'

export type BigNumberish = string | number | bigint;

const DEFAULT_CHAIN = defaultChainId
const DeployedContracts = CONTRACT_ADDRESSES

// getMultiAddress([ADDRESS_ID_EXTRA_X_ACCOUNT_FACTORY, ADDRESS_ID_EXTRA_X_ACCOUNT_SINGLETON, ADDRESS_ID_EXTRA_X_HEALTH_MANAGER, ADDRESS_ID_EXTRA_X_LENDINGPOOL]);


export async function getMultiAddress(
  publicClient,
  chainId,
  idArr: BigNumberish[]
) {
  // const { account, blockNumber, chainId, publicClient, walletClient } = useWagmiCtx()
  console.log(`getAddress(${idArr})`);

  const readContract = useCallback(
    async (functionName: string, args?: any, options = {}) => {
      try {
        const res = await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.AddressRegistry as `0x${string}`,
          abi: AddressRegistry,
          functionName,
          args,
          ...options,
        })
        console.log('readContract :>> ', res)
        return res
      } catch (err) {
        console.warn('readContract err: ', err)
      }
    },
    [chainId, publicClient]
  )
  
  const addrArr: any = await readContract("getAddress(uint256[])", idArr);

  console.log('addrArr :>> ', addrArr);

  return addrArr;
}

export async function getAddress(publicClient, chainId, id: BigNumberish): Promise<string> {
  console.log(`getAddress(${id})`);

  const readContract = async (functionName: string, args?: any, options = {}) => {
      try {
        const res = await publicClient.readContract({
          address: CONTRACT_ADDRESSES[chainId]?.AddressRegistry as `0x${string}`,
          abi: AddressRegistry,
          functionName,
          args,
          ...options,
        })
        console.log('readContract :>> ', res)
        return res
      } catch (err) {
        console.warn('readContract err: ', err)
      }
    }
  
  const addr: any = await readContract("getAddress(uint256)", id);

  console.log(`${id}: ${addr}`);

  return addr;
}

// export async function getExtraUpdateController(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_PROXY_UPDATE_CONTROLLER);
// }

// export async function getExtraAdmin(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_ADMIN_CONTROL);
// }

// export async function getExtraTreasury(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_TREASURY);
// }

// export async function getUniswapV3Factory(): Promise<string> {
//   return await getAddress(ADDRESS_ID_UNISWAP_V3_FACTORY);
// }

// export async function getUniswapV3Router(): Promise<string> {
//   return await getAddress(ADDRESS_ID_UNISWAP_V3_ROUTER);
// }

// export async function getUniswapV3PosManager(): Promise<string> {
//   return await getAddress(ADDRESS_ID_UNISWAP_V3_POS_MANAGER);
// }

// export async function getExtraOracleManager(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_ORACLE_MANAGER);
// }

// export async function getPriceFeedChainlink(): Promise<string> {
//   return await getAddress(ADDRESS_ID_PRICE_FEED_CHAINLINK);
// }

// export async function getPriceFeedUniswapV3(): Promise<string> {
//   return await getAddress(ADDRESS_ID_PRICE_FEED_UNISWAP_V3);
// }

// export async function getExtraAccountSingleton(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_ACCOUNT_SINGLETON);
// }

// export async function getExtraAccountFactory(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_ACCOUNT_FACTORY);
// }

// export async function getExtraLendingPool(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_LENDINGPOOL);
// }

// export async function getExtraLendingETokenImpl(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_Lending_E_TOKEN_IMPL);
// }

// export async function getExtraLendingDebtTokenImpl(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_Lending_DEBT_TOKEN_IMPL);
// }

// export async function getExtraHealthManager(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_HEALTH_MANAGER);
// }

// export async function getExtraUnderlyingTokensEToken(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_E_TOKEN);
// }

// export async function getExtraUnderlyingTokensDebtToken(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_DEBT_TOKEN);
// }

// export async function getExtraUnderlyingTokensUniV3Pos(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_UNDERLYING_TOKENS_UNI_V3_POS);
// }

// export async function getExtraTransactionFilter(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_TRANSACTION_FILTER);
// }
// export async function getExtraFunctionFilterLending(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_FUNC_FILTER_LENDING);
// }
// export async function getExtraFunctionFilterERC20(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_FUNC_FILTER_ERC20);
// }
// export async function getExtraFunctionFilterUniV3Pm(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_FUNC_FILTER_UNI_V3_PM);
// }

// export async function getExtraFunctionFilterUniV3Router(): Promise<string> {
//   return await getAddress(ADDRESS_ID_EXTRA_X_FUNC_FILTER_UNI_V3_ROUTER);
// }

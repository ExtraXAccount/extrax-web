/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IRewardsDistributor,
  IRewardsDistributorInterface,
} from "../../../../periphery-v3/rewards/interfaces/IRewardsDistributor";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "reward",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assetIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "userIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardsAccrued",
        type: "uint256",
      },
    ],
    name: "Accrued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "reward",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldEmission",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newEmission",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldDistributionEnd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDistributionEnd",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assetIndex",
        type: "uint256",
      },
    ],
    name: "AssetConfigUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "EMISSION_MANAGER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getAllUserRewards",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getAssetDecimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getAssetIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getDistributionEnd",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEmissionManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getRewardsByAsset",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getRewardsData",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardsList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getUserAccruedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getUserAssetIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
    ],
    name: "getUserRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "newDistributionEnd",
        type: "uint32",
      },
    ],
    name: "setDistributionEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "rewards",
        type: "address[]",
      },
      {
        internalType: "uint88[]",
        name: "newEmissionsPerSecond",
        type: "uint88[]",
      },
    ],
    name: "setEmissionPerSecond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IRewardsDistributor__factory {
  static readonly abi = _abi;
  static createInterface(): IRewardsDistributorInterface {
    return new Interface(_abi) as IRewardsDistributorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IRewardsDistributor {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IRewardsDistributor;
  }
}

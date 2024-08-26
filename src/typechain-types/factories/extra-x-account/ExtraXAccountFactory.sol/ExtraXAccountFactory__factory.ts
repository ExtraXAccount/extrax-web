/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ExtraXAccountFactory,
  ExtraXAccountFactoryInterface,
} from "../../../extra-x-account/ExtraXAccountFactory.sol/ExtraXAccountFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "AccountCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ACCOUNT_NONCE",
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
    name: "ACCOUNT_SETUP_METHOD_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EXTRA_X_ACCOUNT_SEED",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_ACCOUNTS_PER_USER",
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
    name: "SAFE_PROXY_FACTORY_L2",
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
    inputs: [],
    name: "SAFE_SINGLETON_L2",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accountsOfOwner",
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
    inputs: [],
    name: "createAccount",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "createAccountFor",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getAccountsOfOwner",
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
        name: "",
        type: "address",
      },
    ],
    name: "nextAccountId",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610985806100206000396000f3fe608060405234801561001057600080fd5b50600436106100c85760003560e01c80638ef8745311610081578063aaae8a751161005b578063aaae8a751461022e578063d28ffe2c1461024e578063d6503e171461026957600080fd5b80638ef87453146101c55780639dca362f14610206578063a61c9ae61461020e57600080fd5b80633dacf855116100b25780633dacf8551461012b57806345c814dc14610146578063896bb7dc1461016d57600080fd5b80627f7215146100cd57806306b206eb146100f3575b600080fd5b6100e06100db3660046106c6565b610271565b6040519081526020015b60405180910390f35b6101066101013660046106f2565b6102e6565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ea565b61010673fb1bffc9d739b8d520daf37df666da4c687191ea81565b6100e07f6efab0c0760c5fc7c871ea70acc1e04eac1c4c0e516b114fcd3302fc485b62bc81565b6101947fb63e800d0000000000000000000000000000000000000000000000000000000081565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100ea565b6101066101d33660046106c6565b600160209081526000928352604080842090915290825290205473ffffffffffffffffffffffffffffffffffffffff1681565b61010661059a565b6100e061021c3660046106f2565b60006020819052908152604090205481565b61024161023c3660046106f2565b6105aa565b6040516100ea9190610768565b61010673c22834581ebc8527d974f8a1c97e1bea4ef910bc81565b6100e0604081565b60408051306020808301919091527f6efab0c0760c5fc7c871ea70acc1e04eac1c4c0e516b114fcd3302fc485b62bc8284015273ffffffffffffffffffffffffffffffffffffffff8516606083015260808083018590528351808403909101815260a090920190925280519101205b92915050565b73ffffffffffffffffffffffffffffffffffffffff81166000908152602081815260408083205481516001808252818401909352909284929082810190803683370190505090508381600081518110610341576103416107aa565b73ffffffffffffffffffffffffffffffffffffffff9092166020928302919091018201526040805191820181526000808352905190917fb63e800d00000000000000000000000000000000000000000000000000000000916103b49185916001918691829081908190819060240161083d565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152905073c22834581ebc8527d974f8a1c97e1bea4ef910bc631688f0b973fb1bffc9d739b8d520daf37df666da4c687191ea8361046d8988610271565b6040518463ffffffff1660e01b815260040161048b939291906108b9565b6020604051808303816000875af11580156104aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ce91906108f8565b73ffffffffffffffffffffffffffffffffffffffff868116600090815260016020818152604080842089855290915290912080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169284169290921790915590945061053c908490610915565b73ffffffffffffffffffffffffffffffffffffffff8087166000818152602081905260408082209490945592518693928816927f33310a89c32d8cc00057ad6ef6274d2f8fe22389a992cf89983e09fc84f6cfff91a4505050919050565b60006105a5336102e6565b905090565b73ffffffffffffffffffffffffffffffffffffffff81166000908152602081905260408120546060918167ffffffffffffffff8111156105ec576105ec61077b565b604051908082528060200260200182016040528015610615578160200160208202803683370190505b50905060005b828110156106995773ffffffffffffffffffffffffffffffffffffffff8086166000908152600160209081526040808320858452909152902054835191169083908390811061066c5761066c6107aa565b73ffffffffffffffffffffffffffffffffffffffff9092166020928302919091019091015260010161061b565b509392505050565b73ffffffffffffffffffffffffffffffffffffffff811681146106c357600080fd5b50565b600080604083850312156106d957600080fd5b82356106e4816106a1565b946020939093013593505050565b60006020828403121561070457600080fd5b813561070f816106a1565b9392505050565b60008151808452602080850194506020840160005b8381101561075d57815173ffffffffffffffffffffffffffffffffffffffff168752958201959082019060010161072b565b509495945050505050565b60208152600061070f6020830184610716565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815180845260005b818110156107ff576020818501810151868301820152016107e3565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b60006101008083526108518184018c610716565b905060ff8a16602084015273ffffffffffffffffffffffffffffffffffffffff808a166040850152838203606085015261088b828a6107d9565b978116608085015295861660a0840152505060ff9290921660c083015290911660e090910152949350505050565b73ffffffffffffffffffffffffffffffffffffffff841681526060602082015260006108e860608301856107d9565b9050826040830152949350505050565b60006020828403121561090a57600080fd5b815161070f816106a1565b808201808211156102e0577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220ee30d08d728bc1d4af65541f1f1dd2a3faea5d47ac926bd2f083d4a98421b18764736f6c63430008180033";

type ExtraXAccountFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExtraXAccountFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExtraXAccountFactory__factory extends ContractFactory {
  constructor(...args: ExtraXAccountFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ExtraXAccountFactory & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ExtraXAccountFactory__factory {
    return super.connect(runner) as ExtraXAccountFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExtraXAccountFactoryInterface {
    return new Interface(_abi) as ExtraXAccountFactoryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ExtraXAccountFactory {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ExtraXAccountFactory;
  }
}

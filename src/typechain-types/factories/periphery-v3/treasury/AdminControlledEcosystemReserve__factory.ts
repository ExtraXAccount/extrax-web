/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  AdminControlledEcosystemReserve,
  AdminControlledEcosystemReserveInterface,
} from "../../../periphery-v3/treasury/AdminControlledEcosystemReserve";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fundsAdmin",
        type: "address",
      },
    ],
    name: "NewFundsAdmin",
    type: "event",
  },
  {
    inputs: [],
    name: "ETH_MOCK_ADDRESS",
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
    name: "REVISION",
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
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFundsAdmin",
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
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

export class AdminControlledEcosystemReserve__factory {
  static readonly abi = _abi;
  static createInterface(): AdminControlledEcosystemReserveInterface {
    return new Interface(_abi) as AdminControlledEcosystemReserveInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AdminControlledEcosystemReserve {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AdminControlledEcosystemReserve;
  }
}

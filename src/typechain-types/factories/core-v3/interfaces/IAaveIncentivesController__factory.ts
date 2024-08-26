/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAaveIncentivesController,
  IAaveIncentivesControllerInterface,
} from "../../../core-v3/interfaces/IAaveIncentivesController";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "userBalance",
        type: "uint256",
      },
    ],
    name: "handleAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IAaveIncentivesController__factory {
  static readonly abi = _abi;
  static createInterface(): IAaveIncentivesControllerInterface {
    return new Interface(_abi) as IAaveIncentivesControllerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAaveIncentivesController {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IAaveIncentivesController;
  }
}

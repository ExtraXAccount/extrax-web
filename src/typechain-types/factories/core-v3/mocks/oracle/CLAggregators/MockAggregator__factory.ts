/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  MockAggregator,
  MockAggregatorInterface,
} from "../../../../../core-v3/mocks/oracle/CLAggregators/MockAggregator";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "initialAnswer",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "current",
        type: "int256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    name: "AnswerUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenType",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161013838038061013883398101604081905261002f9161006f565b600081815560405142815282907f0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f9060200160405180910390a350610088565b60006020828403121561008157600080fd5b5051919050565b60a2806100966000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c8063313ce56714604157806350d25bcd146055578063fcab1819146066575b600080fd5b604051600881526020015b60405180910390f35b6000545b604051908152602001604c565b6001605956fea2646970667358221220a600b2ff1ce16cafa39f8fe12a7d2f1332cc33592421f5f228758fdd224e998064736f6c63430008180033";

type MockAggregatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockAggregatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockAggregator__factory extends ContractFactory {
  constructor(...args: MockAggregatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    initialAnswer: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(initialAnswer, overrides || {});
  }
  override deploy(
    initialAnswer: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(initialAnswer, overrides || {}) as Promise<
      MockAggregator & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockAggregator__factory {
    return super.connect(runner) as MockAggregator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockAggregatorInterface {
    return new Interface(_abi) as MockAggregatorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockAggregator {
    return new Contract(address, _abi, runner) as unknown as MockAggregator;
  }
}

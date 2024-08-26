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
import type { NonPayableOverrides } from "../../../../../common";
import type {
  MockPool,
  MockPoolInterface,
} from "../../../../../core-v3/mocks/helpers/MockPool.sol/MockPool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "reserve",
        type: "address",
      },
    ],
    name: "addReserveToReservesList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getReservesList",
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
        name: "provider",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610348806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063c4d66de814610046578063d1946dbc1461009d578063e636a4f4146100bb575b600080fd5b61009b61005436600461021d565b606480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b005b6100a5610140565b6040516100b2919061025a565b60405180910390f35b61009b6100c936600461021d565b606580546001810182556000919091527f8ff97419363ffd7000167f130ef7168fbea05faf9251824ca5043f113cc6a7c70180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60655460609060009067ffffffffffffffff811115610161576101616102b4565b60405190808252806020026020018201604052801561018a578160200160208202803683370190505b50905060005b60655481101561021757606581815481106101ad576101ad6102e3565b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168282815181106101ea576101ea6102e3565b73ffffffffffffffffffffffffffffffffffffffff90921660209283029190910190910152600101610190565b50919050565b60006020828403121561022f57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461025357600080fd5b9392505050565b6020808252825182820181905260009190848201906040850190845b818110156102a857835173ffffffffffffffffffffffffffffffffffffffff1683529284019291840191600101610276565b50909695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220bc236ef3bfc803e88019caea05e8492ce3f996addaa01d5f54b4805507c1def264736f6c63430008180033";

type MockPoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPool__factory extends ContractFactory {
  constructor(...args: MockPoolConstructorParams) {
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
      MockPool & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockPool__factory {
    return super.connect(runner) as MockPool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPoolInterface {
    return new Interface(_abi) as MockPoolInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): MockPool {
    return new Contract(address, _abi, runner) as unknown as MockPool;
  }
}

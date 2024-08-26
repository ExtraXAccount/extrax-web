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
  ReserveConfiguration,
  ReserveConfigurationInterface,
} from "../../../../../core-v3/protocol/libraries/configuration/ReserveConfiguration";

const _abi = [
  {
    inputs: [],
    name: "DEBT_CEILING_DECIMALS",
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
    name: "MAX_RESERVES_COUNT",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60ab610038600b82828239805160001a607314602b57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c8063280d5de914604257806331b561ba14605c575b600080fd5b6049600281565b6040519081526020015b60405180910390f35b6063608081565b60405161ffff9091168152602001605356fea2646970667358221220df5408dde2ff6ee2577b488122e9cdd9f9158bf53d4a8da959a72a7755e0cea164736f6c63430008180033";

type ReserveConfigurationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReserveConfigurationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReserveConfiguration__factory extends ContractFactory {
  constructor(...args: ReserveConfigurationConstructorParams) {
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
      ReserveConfiguration & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ReserveConfiguration__factory {
    return super.connect(runner) as ReserveConfiguration__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReserveConfigurationInterface {
    return new Interface(_abi) as ReserveConfigurationInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ReserveConfiguration {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ReserveConfiguration;
  }
}

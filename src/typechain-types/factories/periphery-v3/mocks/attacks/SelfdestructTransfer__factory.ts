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
import type { NonPayableOverrides } from "../../../../common";
import type {
  SelfdestructTransfer,
  SelfdestructTransferInterface,
} from "../../../../periphery-v3/mocks/attacks/SelfdestructTransfer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
    ],
    name: "destroyAndTransfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060bc8061001f6000396000f3fe608060405260043610601c5760003560e01c8063785e07b3146021575b600080fd5b6030602c366004604b565b6032565b005b8073ffffffffffffffffffffffffffffffffffffffff16ff5b600060208284031215605c57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114607f57600080fd5b939250505056fea264697066735822122000229dcffd1d95f0651915c2b22c67cfcd5dda4bec6d2e90b6046b7964c605ec64736f6c63430008180033";

type SelfdestructTransferConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SelfdestructTransferConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SelfdestructTransfer__factory extends ContractFactory {
  constructor(...args: SelfdestructTransferConstructorParams) {
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
      SelfdestructTransfer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): SelfdestructTransfer__factory {
    return super.connect(runner) as SelfdestructTransfer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SelfdestructTransferInterface {
    return new Interface(_abi) as SelfdestructTransferInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SelfdestructTransfer {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as SelfdestructTransfer;
  }
}

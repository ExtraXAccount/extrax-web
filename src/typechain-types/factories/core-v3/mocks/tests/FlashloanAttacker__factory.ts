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
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  FlashloanAttacker,
  FlashloanAttackerInterface,
} from "../../../../core-v3/mocks/tests/FlashloanAttacker";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "provider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "POOL",
    outputs: [
      {
        internalType: "contract IPool",
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "executeOperation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "supplyAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610c2e380380610c2e83398101604081905261002f91610166565b80806001600160a01b03166080816001600160a01b031681525050806001600160a01b031663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610088573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ac9190610166565b6001600160a01b031660a0816001600160a01b03168152505050806001600160a01b031663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610104573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101289190610166565b600180546001600160a01b0319166001600160a01b03929092169190911790555061018a565b6001600160a01b038116811461016357600080fd5b50565b60006020828403121561017857600080fd5b81516101838161014e565b9392505050565b60805160a051610a7a6101b46000396000818160df01526103e40152600060560152610a7a6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630542975c146100515780631416d762146100a25780631b11d0ff146100b75780637535d246146100da575b600080fd5b6100787f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100b56100b0366004610686565b610101565b005b6100ca6100c536600461075a565b6102f6565b6040519015158152602001610099565b6100787f000000000000000000000000000000000000000000000000000000000000000081565b6040517f40c10f1900000000000000000000000000000000000000000000000000000000815230600482015260248101829052829073ffffffffffffffffffffffffffffffffffffffff8216906340c10f19906044016020604051808303816000875af1158015610176573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019a9190610846565b506001546040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821660048201527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60248201529082169063095ea7b3906044016020604051808303816000875af1158015610233573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102579190610846565b506001546040517f617ba03700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015260248201859052306044830152600060648301529091169063617ba03790608401600060405180830381600087803b1580156102d957600080fd5b505af11580156102ed573d6000803e3d6000fd5b50505050505050565b60008581610304878761046f565b905061030f88610485565b6040517f40c10f190000000000000000000000000000000000000000000000000000000081523060048201526024810187905273ffffffffffffffffffffffffffffffffffffffff8316906340c10f19906044016020604051808303816000875af1158015610382573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a69190610846565b506040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820183905289169063095ea7b3906044016020604051808303816000875af115801561043c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104609190610846565b50600198975050505050505050565b8082018281101561047f57600080fd5b92915050565b6001546040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff838116600483015260009216906335ea6a75906024016101e060405180830381865afa1580156104f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051b9190610908565b6101008101516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015291925083916000918316906370a0823190602401602060405180830381865afa158015610595573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b99190610a2b565b6001546040517fa415bcad00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff878116600483015260248201849052600260448301526000606483015230608483015292935091169063a415bcad9060a401600060405180830381600087803b15801561064357600080fd5b505af1158015610657573d6000803e3d6000fd5b5050505050505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461068357600080fd5b50565b6000806040838503121561069957600080fd5b82356106a481610661565b946020939093013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516101e0810167ffffffffffffffff81118282101715610705576107056106b2565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610752576107526106b2565b604052919050565b600080600080600060a0868803121561077257600080fd5b853561077d81610661565b9450602086810135945060408701359350606087013561079c81610661565b9250608087013567ffffffffffffffff808211156107b957600080fd5b818901915089601f8301126107cd57600080fd5b8135818111156107df576107df6106b2565b61080f847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161070b565b91508082528a8482850101111561082557600080fd5b80848401858401376000848284010152508093505050509295509295909350565b60006020828403121561085857600080fd5b8151801515811461086857600080fd5b9392505050565b60006020828403121561088157600080fd5b6040516020810181811067ffffffffffffffff821117156108a4576108a46106b2565b6040529151825250919050565b80516fffffffffffffffffffffffffffffffff811681146108d157600080fd5b919050565b805164ffffffffff811681146108d157600080fd5b805161ffff811681146108d157600080fd5b80516108d181610661565b60006101e0828403121561091b57600080fd5b6109236106e1565b61092d848461086f565b815261093b602084016108b1565b602082015261094c604084016108b1565b604082015261095d606084016108b1565b606082015261096e608084016108b1565b608082015261097f60a084016108b1565b60a082015261099060c084016108d6565b60c08201526109a160e084016108eb565b60e08201526101006109b48185016108fd565b908201526101206109c68482016108fd565b908201526101406109d88482016108fd565b908201526101606109ea8482016108fd565b908201526101806109fc8482016108b1565b908201526101a0610a0e8482016108b1565b908201526101c0610a208482016108b1565b908201529392505050565b600060208284031215610a3d57600080fd5b505191905056fea26469706673582212206bf268dd84d797af35262909bb7316e8c74fa8323c740ef237c0783ceeafc5f664736f6c63430008180033";

type FlashloanAttackerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FlashloanAttackerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FlashloanAttacker__factory extends ContractFactory {
  constructor(...args: FlashloanAttackerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    provider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(provider, overrides || {});
  }
  override deploy(
    provider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(provider, overrides || {}) as Promise<
      FlashloanAttacker & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): FlashloanAttacker__factory {
    return super.connect(runner) as FlashloanAttacker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FlashloanAttackerInterface {
    return new Interface(_abi) as FlashloanAttackerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): FlashloanAttacker {
    return new Contract(address, _abi, runner) as unknown as FlashloanAttacker;
  }
}

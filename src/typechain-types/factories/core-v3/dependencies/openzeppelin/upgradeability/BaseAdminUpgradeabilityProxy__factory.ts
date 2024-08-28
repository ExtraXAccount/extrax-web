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
  BaseAdminUpgradeabilityProxy,
  BaseAdminUpgradeabilityProxyInterface,
} from "../../../../../core-v3/dependencies/openzeppelin/upgradeability/BaseAdminUpgradeabilityProxy";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506107cd806100206000396000f3fe60806040526004361061005a5760003560e01c80635c60da1b116100435780635c60da1b146100975780638f283970146100d5578063f851a440146100f55761005a565b80633659cfe6146100645780634f1ef28614610084575b61006261010a565b005b34801561007057600080fd5b5061006261007f3660046106e2565b610144565b610062610092366004610704565b610196565b3480156100a357600080fd5b506100ac610267565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100e157600080fd5b506100626100f03660046106e2565b6102de565b34801561010157600080fd5b506100ac610464565b6101126104d0565b61014261013d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b610596565b565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361018e5761018b816105ba565b50565b61018b61010a565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361025a576101dd836105ba565b60008373ffffffffffffffffffffffffffffffffffffffff168383604051610206929190610787565b600060405180830381855af49150503d8060008114610241576040519150601f19603f3d011682016040523d82523d6000602084013e610246565b606091505b505090508061025457600080fd5b50505050565b61026261010a565b505050565b60006102917fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff1633036102d357507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b6102db61010a565b90565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361018e5773ffffffffffffffffffffffffffffffffffffffff81166103c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f43616e6e6f74206368616e6765207468652061646d696e206f6620612070726f60448201527f787920746f20746865207a65726f20616464726573730000000000000000000060648201526084015b60405180910390fd5b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f61040d7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b6040805173ffffffffffffffffffffffffffffffffffffffff928316815291841660208301520160405180910390a161018b817fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b600061048e7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff1633036102d357507fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff163303610142576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e20667260448201527f6f6d207468652070726f78792061646d696e000000000000000000000000000060648201526084016103bb565b3660008037600080366000845af43d6000803e8080156105b5573d6000f35b3d6000fd5b6105c381610607565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b610695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f43616e6e6f742073657420612070726f787920696d706c656d656e746174696f60448201527f6e20746f2061206e6f6e2d636f6e74726163742061646472657373000000000060648201526084016103bb565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b803573ffffffffffffffffffffffffffffffffffffffff811681146106dd57600080fd5b919050565b6000602082840312156106f457600080fd5b6106fd826106b9565b9392505050565b60008060006040848603121561071957600080fd5b610722846106b9565b9250602084013567ffffffffffffffff8082111561073f57600080fd5b818601915086601f83011261075357600080fd5b81358181111561076257600080fd5b87602082850101111561077457600080fd5b6020830194508093505050509250925092565b818382376000910190815291905056fea26469706673582212206411d252e146014188a58142601f6fb2dd848d80e94e265a24666407b8185db264736f6c63430008180033";

type BaseAdminUpgradeabilityProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BaseAdminUpgradeabilityProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BaseAdminUpgradeabilityProxy__factory extends ContractFactory {
  constructor(...args: BaseAdminUpgradeabilityProxyConstructorParams) {
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
      BaseAdminUpgradeabilityProxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): BaseAdminUpgradeabilityProxy__factory {
    return super.connect(runner) as BaseAdminUpgradeabilityProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BaseAdminUpgradeabilityProxyInterface {
    return new Interface(_abi) as BaseAdminUpgradeabilityProxyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BaseAdminUpgradeabilityProxy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as BaseAdminUpgradeabilityProxy;
  }
}
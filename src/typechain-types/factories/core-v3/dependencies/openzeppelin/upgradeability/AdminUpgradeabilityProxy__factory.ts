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
  BytesLike,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { PayableOverrides } from "../../../../../common";
import type {
  AdminUpgradeabilityProxy,
  AdminUpgradeabilityProxyInterface,
} from "../../../../../core-v3/dependencies/openzeppelin/upgradeability/AdminUpgradeabilityProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
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
  "0x608060405260405162000bae38038062000bae83398101604081905262000026916200024d565b82816200005560017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd6200032d565b60008051602062000b8e8339815191521462000075576200007562000355565b620000808262000168565b805115620000f7576000826001600160a01b031682604051620000a491906200036b565b600060405180830381855af49150503d8060008114620000e1576040519150601f19603f3d011682016040523d82523d6000602084013e620000e6565b606091505b5050905080620000f557600080fd5b505b5062000127905060017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61046200032d565b60008051602062000b6e8339815191521462000147576200014762000355565b6200015f8260008051602062000b6e83398151915255565b50505062000389565b803b620001e15760405162461bcd60e51b815260206004820152603b60248201527f43616e6e6f742073657420612070726f787920696d706c656d656e746174696f60448201527f6e20746f2061206e6f6e2d636f6e747261637420616464726573730000000000606482015260840160405180910390fd5b60008051602062000b8e83398151915255565b80516001600160a01b03811681146200020c57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620002445781810151838201526020016200022a565b50506000910152565b6000806000606084860312156200026357600080fd5b6200026e84620001f4565b92506200027e60208501620001f4565b60408501519092506001600160401b03808211156200029c57600080fd5b818601915086601f830112620002b157600080fd5b815181811115620002c657620002c662000211565b604051601f8201601f19908116603f01168101908382118183101715620002f157620002f162000211565b816040528281528960208487010111156200030b57600080fd5b6200031e83602083016020880162000227565b80955050505050509250925092565b818103818111156200034f57634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052600160045260246000fd5b600082516200037f81846020870162000227565b9190910192915050565b6107d580620003996000396000f3fe60806040526004361061005a5760003560e01c80635c60da1b116100435780635c60da1b146100975780638f283970146100d5578063f851a440146100f55761005a565b80633659cfe6146100645780634f1ef28614610084575b61006261010a565b005b34801561007057600080fd5b5061006261007f3660046106ea565b610144565b61006261009236600461070c565b610196565b3480156100a357600080fd5b506100ac610267565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100e157600080fd5b506100626100f03660046106ea565b6102de565b34801561010157600080fd5b506100ac610464565b6101126104d0565b61014261013d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b6104d8565b565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361018e5761018b816104fc565b50565b61018b61010a565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361025a576101dd836104fc565b60008373ffffffffffffffffffffffffffffffffffffffff16838360405161020692919061078f565b600060405180830381855af49150503d8060008114610241576040519150601f19603f3d011682016040523d82523d6000602084013e610246565b606091505b505090508061025457600080fd5b50505050565b61026261010a565b505050565b60006102917fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff1633036102d357507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b6102db61010a565b90565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361018e5773ffffffffffffffffffffffffffffffffffffffff81166103c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f43616e6e6f74206368616e6765207468652061646d696e206f6620612070726f60448201527f787920746f20746865207a65726f20616464726573730000000000000000000060648201526084015b60405180910390fd5b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f61040d7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b6040805173ffffffffffffffffffffffffffffffffffffffff928316815291841660208301520160405180910390a161018b817fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b600061048e7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff1633036102d357507fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b610142610549565b3660008037600080366000845af43d6000803e8080156104f7573d6000f35b3d6000fd5b6105058161060f565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff163303610142576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e20667260448201527f6f6d207468652070726f78792061646d696e000000000000000000000000000060648201526084016103bb565b803b61069d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f43616e6e6f742073657420612070726f787920696d706c656d656e746174696f60448201527f6e20746f2061206e6f6e2d636f6e74726163742061646472657373000000000060648201526084016103bb565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b803573ffffffffffffffffffffffffffffffffffffffff811681146106e557600080fd5b919050565b6000602082840312156106fc57600080fd5b610705826106c1565b9392505050565b60008060006040848603121561072157600080fd5b61072a846106c1565b9250602084013567ffffffffffffffff8082111561074757600080fd5b818601915086601f83011261075b57600080fd5b81358181111561076a57600080fd5b87602082850101111561077c57600080fd5b6020830194508093505050509250925092565b818382376000910190815291905056fea2646970667358221220107eed673d66323953f7f0c8e0921ab99187964e03315926c7ee857393deaf1d64736f6c63430008180033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

type AdminUpgradeabilityProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdminUpgradeabilityProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AdminUpgradeabilityProxy__factory extends ContractFactory {
  constructor(...args: AdminUpgradeabilityProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _logic: AddressLike,
    _admin: AddressLike,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_logic, _admin, _data, overrides || {});
  }
  override deploy(
    _logic: AddressLike,
    _admin: AddressLike,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ) {
    return super.deploy(_logic, _admin, _data, overrides || {}) as Promise<
      AdminUpgradeabilityProxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): AdminUpgradeabilityProxy__factory {
    return super.connect(runner) as AdminUpgradeabilityProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminUpgradeabilityProxyInterface {
    return new Interface(_abi) as AdminUpgradeabilityProxyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AdminUpgradeabilityProxy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AdminUpgradeabilityProxy;
  }
}

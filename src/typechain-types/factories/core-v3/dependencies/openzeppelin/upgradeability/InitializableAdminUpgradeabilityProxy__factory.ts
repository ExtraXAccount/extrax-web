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
  InitializableAdminUpgradeabilityProxy,
  InitializableAdminUpgradeabilityProxyInterface,
} from "../../../../../core-v3/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy";

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
        name: "logic",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
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
  "0x608060405234801561001057600080fd5b50610c36806100206000396000f3fe6080604052600436106100705760003560e01c80638f2839701161004e5780638f283970146100eb578063cf7a1d771461010b578063d1f578941461011e578063f851a4401461013157610070565b80633659cfe61461007a5780634f1ef2861461009a5780635c60da1b146100ad575b610078610146565b005b34801561008657600080fd5b50610078610095366004610927565b610180565b6100786100a8366004610949565b6101d2565b3480156100b957600080fd5b506100c26102a3565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100f757600080fd5b50610078610106366004610927565b61031a565b610078610119366004610aa6565b6104a0565b61007861012c366004610b04565b610575565b34801561013d57600080fd5b506100c26106a1565b61014e61070d565b61017e6101797f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b610715565b565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff1633036101ca576101c781610739565b50565b6101c7610146565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff1633036102965761021983610739565b60008373ffffffffffffffffffffffffffffffffffffffff168383604051610242929190610b52565b600060405180830381855af49150503d806000811461027d576040519150601f19603f3d011682016040523d82523d6000602084013e610282565b606091505b505090508061029057600080fd5b50505050565b61029e610146565b505050565b60006102cd7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff16330361030f57507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b610317610146565b90565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff1633036101ca5773ffffffffffffffffffffffffffffffffffffffff8116610400576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f43616e6e6f74206368616e6765207468652061646d696e206f6620612070726f60448201527f787920746f20746865207a65726f20616464726573730000000000000000000060648201526084015b60405180910390fd5b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6104497fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b6040805173ffffffffffffffffffffffffffffffffffffffff928316815291841660208301520160405180910390a16101c7817fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b60006104ca7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b73ffffffffffffffffffffffffffffffffffffffff16146104ea57600080fd5b6104f48382610575565b61051f60017fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6104610b62565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61031461054d5761054d610ba2565b61029e827fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610355565b600061059f7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b73ffffffffffffffffffffffffffffffffffffffff16146105bf57600080fd5b6105ea60017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd610b62565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc1461061857610618610ba2565b61062182610786565b80511561069d5760008273ffffffffffffffffffffffffffffffffffffffff168260405161064f9190610bd1565b600060405180830381855af49150503d806000811461068a576040519150601f19603f3d011682016040523d82523d6000602084013e61068f565b606091505b505090508061029e57600080fd5b5050565b60006106cb7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b73ffffffffffffffffffffffffffffffffffffffff16330361030f57507fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b61017e610838565b3660008037600080366000845af43d6000803e808015610734573d6000f35b3d6000fd5b61074281610786565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b610814576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f43616e6e6f742073657420612070726f787920696d706c656d656e746174696f60448201527f6e20746f2061206e6f6e2d636f6e74726163742061646472657373000000000060648201526084016103f7565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035473ffffffffffffffffffffffffffffffffffffffff16330361017e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e20667260448201527f6f6d207468652070726f78792061646d696e000000000000000000000000000060648201526084016103f7565b803573ffffffffffffffffffffffffffffffffffffffff8116811461092257600080fd5b919050565b60006020828403121561093957600080fd5b610942826108fe565b9392505050565b60008060006040848603121561095e57600080fd5b610967846108fe565b9250602084013567ffffffffffffffff8082111561098457600080fd5b818601915086601f83011261099857600080fd5b8135818111156109a757600080fd5b8760208285010111156109b957600080fd5b6020830194508093505050509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f830112610a0c57600080fd5b813567ffffffffffffffff80821115610a2757610a276109cc565b604051601f83017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715610a6d57610a6d6109cc565b81604052838152866020858801011115610a8657600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600060608486031215610abb57600080fd5b610ac4846108fe565b9250610ad2602085016108fe565b9150604084013567ffffffffffffffff811115610aee57600080fd5b610afa868287016109fb565b9150509250925092565b60008060408385031215610b1757600080fd5b610b20836108fe565b9150602083013567ffffffffffffffff811115610b3c57600080fd5b610b48858286016109fb565b9150509250929050565b8183823760009101908152919050565b81810381811115610b9c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b6000825160005b81811015610bf25760208186018101518583015201610bd8565b50600092019182525091905056fea2646970667358221220d70fc06ab3adf2c758444c5859749bd20def972408f940eb7b1c1a567ccef21764736f6c63430008180033";

type InitializableAdminUpgradeabilityProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InitializableAdminUpgradeabilityProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class InitializableAdminUpgradeabilityProxy__factory extends ContractFactory {
  constructor(...args: InitializableAdminUpgradeabilityProxyConstructorParams) {
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
      InitializableAdminUpgradeabilityProxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): InitializableAdminUpgradeabilityProxy__factory {
    return super.connect(
      runner
    ) as InitializableAdminUpgradeabilityProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InitializableAdminUpgradeabilityProxyInterface {
    return new Interface(
      _abi
    ) as InitializableAdminUpgradeabilityProxyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): InitializableAdminUpgradeabilityProxy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as InitializableAdminUpgradeabilityProxy;
  }
}

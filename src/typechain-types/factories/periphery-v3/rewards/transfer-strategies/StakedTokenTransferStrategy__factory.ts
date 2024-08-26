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
  StakedTokenTransferStrategy,
  StakedTokenTransferStrategyInterface,
} from "../../../../periphery-v3/rewards/transfer-strategies/StakedTokenTransferStrategy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "incentivesController",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardsAdmin",
        type: "address",
      },
      {
        internalType: "contract IStakedToken",
        name: "stakeToken",
        type: "address",
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
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EmergencyWithdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "dropApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "emergencyWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getIncentivesController",
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
    name: "getRewardsAdmin",
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
    name: "getStakeContract",
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
    name: "getUnderlyingToken",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "reward",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "performTransfer",
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
    inputs: [],
    name: "renewApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101006040523480156200001257600080fd5b5060405162000df738038062000df78339810160408190526200003591620001d1565b6001600160a01b0380841660805280831660a052811660c08190526040805163312f6b8360e01b8152905163312f6b83916004808201926020929091908290030181865afa1580156200008c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000b2919062000225565b6001600160a01b0390811660e081905260c05160405163095ea7b360e01b815292166004830152600060248301529063095ea7b3906044016020604051808303816000875af11580156200010a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200013091906200024c565b5060e05160c05160405163095ea7b360e01b81526001600160a01b039182166004820152600019602482015291169063095ea7b3906044016020604051808303816000875af115801562000188573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001ae91906200024c565b5050505062000270565b6001600160a01b0381168114620001ce57600080fd5b50565b600080600060608486031215620001e757600080fd5b8351620001f481620001b8565b60208501519093506200020781620001b8565b60408501519092506200021a81620001b8565b809150509250925092565b6000602082840312156200023857600080fd5b81516200024581620001b8565b9392505050565b6000602082840312156200025f57600080fd5b815180151581146200024557600080fd5b60805160a05160c05160e051610afa620002fd6000396000818161016f015281816104ab0152818161076a01526108630152600081816101490152818161023b0152818161033a0152818161047c0152818161073b0152610815015260008181610123015281816103b801528181610534015261067701526000818160c101526101970152610afa6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063a34062511161005b578063a340625114610119578063c625544314610121578063dfd29d9e14610147578063ee719bc81461016d57600080fd5b806316beb9821461008d5780633a342acc146100b557806375d26413146100bf5780638d8e5da714610106575b600080fd5b6100a061009b366004610a5f565b610193565b60405190151581526020015b60405180910390f35b6100bd6103a0565b005b7f00000000000000000000000000000000000000000000000000000000000000005b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ac565b6100bd610114366004610a5f565b61051c565b6100bd61065f565b7f00000000000000000000000000000000000000000000000000000000000000006100e1565b7f00000000000000000000000000000000000000000000000000000000000000006100e1565b7f00000000000000000000000000000000000000000000000000000000000000006100e1565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163314610239576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f43414c4c45525f4e4f545f494e43454e54495645535f434f4e54524f4c4c455260448201526064015b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146102ee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5245574152445f544f4b454e5f4e4f545f5354414b455f434f4e5452414354006044820152606401610230565b6040517fadc9772e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018490527f0000000000000000000000000000000000000000000000000000000000000000169063adc9772e90604401600060405180830381600087803b15801561037e57600080fd5b505af1158015610392573d6000803e3d6000fd5b506001979650505050505050565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461043f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4f4e4c595f524557415244535f41444d494e00000000000000000000000000006044820152606401610230565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000081166004830152600060248301527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044015b6020604051808303816000875af11580156104f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105199190610a9b565b50565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146105bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4f4e4c595f524557415244535f41444d494e00000000000000000000000000006044820152606401610230565b6105dc73ffffffffffffffffffffffffffffffffffffffff84168383610892565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f7dc4ea712e6400e67a5abca1a983e5c420c386c19936dc120cd860b50b8e25798460405161065291815260200190565b60405180910390a4505050565b3373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146106fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f4f4e4c595f524557415244535f41444d494e00000000000000000000000000006044820152606401610230565b6040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000081166004830152600060248301527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af11580156107b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d79190610a9b565b506040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000811660048301527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60248301527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016104d6565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000080825273ffffffffffffffffffffffffffffffffffffffff84166004830152602482018390529060008060448382895af16108f5573d6000803e3d6000fd5b506108ff8461096b565b610965576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f475076323a206661696c6564207472616e7366657200000000000000000000006044820152606401610230565b50505050565b60006109aa565b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045280602452508060445260646000fd5b3d80156109e95760208114610a23576109e47f475076323a206d616c666f726d6564207472616e7366657220726573756c7400601f610972565b610a30565b823b610a1a57610a1a7f475076323a206e6f74206120636f6e74726163740000000000000000000000006014610972565b60019150610a30565b3d6000803e600051151591505b50919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610a5a57600080fd5b919050565b600080600060608486031215610a7457600080fd5b610a7d84610a36565b9250610a8b60208501610a36565b9150604084013590509250925092565b600060208284031215610aad57600080fd5b81518015158114610abd57600080fd5b939250505056fea26469706673582212208503d076107cf0e8992b57ee27526afb30492fd3845a0504282a32891db302fd64736f6c63430008180033";

type StakedTokenTransferStrategyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakedTokenTransferStrategyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakedTokenTransferStrategy__factory extends ContractFactory {
  constructor(...args: StakedTokenTransferStrategyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    incentivesController: AddressLike,
    rewardsAdmin: AddressLike,
    stakeToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      incentivesController,
      rewardsAdmin,
      stakeToken,
      overrides || {}
    );
  }
  override deploy(
    incentivesController: AddressLike,
    rewardsAdmin: AddressLike,
    stakeToken: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      incentivesController,
      rewardsAdmin,
      stakeToken,
      overrides || {}
    ) as Promise<
      StakedTokenTransferStrategy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): StakedTokenTransferStrategy__factory {
    return super.connect(runner) as StakedTokenTransferStrategy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakedTokenTransferStrategyInterface {
    return new Interface(_abi) as StakedTokenTransferStrategyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): StakedTokenTransferStrategy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as StakedTokenTransferStrategy;
  }
}

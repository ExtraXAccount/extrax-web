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
import type { NonPayableOverrides } from "../../../common";
import type {
  L2Encoder,
  L2EncoderInterface,
} from "../../../core-v3/misc/L2Encoder";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IPool",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "interestRateMode",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
    ],
    name: "encodeBorrowParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collateralAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "debtAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "debtToCover",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "receiveAToken",
        type: "bool",
      },
    ],
    name: "encodeLiquidationCall",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "encodeRebalanceStableBorrowRate",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "interestRateMode",
        type: "uint256",
      },
    ],
    name: "encodeRepayParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "interestRateMode",
        type: "uint256",
      },
    ],
    name: "encodeRepayWithATokensParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "interestRateMode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "permitV",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "permitR",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "permitS",
        type: "bytes32",
      },
    ],
    name: "encodeRepayWithPermitParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "bool",
        name: "useAsCollateral",
        type: "bool",
      },
    ],
    name: "encodeSetUserUseReserveAsCollateral",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
    ],
    name: "encodeSupplyParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "uint16",
        name: "referralCode",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "permitV",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "permitR",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "permitS",
        type: "bytes32",
      },
    ],
    name: "encodeSupplyWithPermitParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        name: "interestRateMode",
        type: "uint256",
      },
    ],
    name: "encodeSwapBorrowRateMode",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    ],
    name: "encodeWithdrawParams",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161143138038061143183398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516113606100d16000396000818161016b0152818161027e015281816103760152818161043f015281816105180152818161062e0152818161073c015281816107fc0152818161094101528181610a700152610b5501526113606000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806388d5185211610081578063b76398e41161005b578063b76398e414610200578063fc0eed8514610213578063fed63a931461022157600080fd5b806388d51852146101b25780638da7fb18146101da5780639d2ffc1b146101ed57600080fd5b80635cc7bc10116100b25780635cc7bc1014610125578063671a7fae146101385780637535d2461461016657600080fd5b80631a64acf2146100d95780631a8f6dee146100ff5780631fd3479714610112575b600080fd5b6100ec6100e7366004610e66565b610234565b6040519081526020015b60405180910390f35b6100ec61010d366004610eb0565b61032c565b6100ec610120366004610ee9565b6103f5565b6100ec610133366004610ee9565b6104ce565b61014b610146366004610f2b565b6105e0565b604080519384526020840192909252908201526060016100f6565b61018d7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100f6565b6101c56101c0366004610fa9565b6106f0565b604080519283526020830191909152016100f6565b6100ec6101e836600461100d565b6108e2565b6100ec6101fb36600461100d565b6108f7565b6100ec61020e366004611042565b610a26565b6100ec61010d366004611084565b61014b61022f3660046110b9565b610b07565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa1580156102c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102ea9190611207565b60e081015190915060006102fd87610c5d565b9050600061030a87610d08565b60109290921b60909290921b60989690961b9590950101019695505050505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff838116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa1580156103be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e29190611207565b60e00151601084901b0191505092915050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff838116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610487573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ab9190611207565b60e081015190915060006104be85610d08565b60101b9190910195945050505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff838116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610560573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105849190611207565b60e081015190915060007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85146105c3576105be85610c5d565b6104be565b5071ffffffffffffffffffffffffffffffff000001949350505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff88811660048301526000918291829182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610676573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069a9190611207565b60e081015190915060006106ad8c610c5d565b905060006106ba8b610d9b565b905060008a60c01b8260a01b018d60901b018360101b0184019050808a8a97509750975050505050509750975097945050505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8681166004830152600091829182917f0000000000000000000000000000000000000000000000000000000000000000909116906335ea6a75906024016101e060405180830381865afa158015610786573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107aa9190611207565b60e08101516040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a8116600483015292935090916000917f0000000000000000000000000000000000000000000000000000000000000000909116906335ea6a75906024016101e060405180830381865afa158015610846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086a9190611207565b60e081015190915060007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff89146108a9576108a489610c5d565b6108bb565b6fffffffffffffffffffffffffffffffff5b60109290921b9390930160208a901b019550608087901b0193505050509550959350505050565b60006108ef8484846108f7565b949350505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610989573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ad9190611207565b60e081015190915060007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff86146109ec576109e786610c5d565b6109fe565b6fffffffffffffffffffffffffffffffff5b90506000610a0b86610d08565b60901b60109290921b91909101919091019695505050505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610ab8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adc9190611207565b60e08101519091506000610aef86610c5d565b60101b609086901b0191909101925050509392505050565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff88811660048301526000918291829182917f000000000000000000000000000000000000000000000000000000000000000016906335ea6a75906024016101e060405180830381865afa158015610b9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc19190611207565b60e081015190915060007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8c14610c0057610bfb8c610c5d565b610c12565b6fffffffffffffffffffffffffffffffff5b90506000610c1f8c610d08565b90506000610c2c8c610d9b565b60b89b909b1b60989b909b1b9a909a0160909190911b0160109190911b01019b959a50939850939650505050505050565b60006fffffffffffffffffffffffffffffffff821115610d04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203160448201527f323820626974730000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b5090565b600060ff821115610d04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203860448201527f20626974730000000000000000000000000000000000000000000000000000006064820152608401610cfb565b600063ffffffff821115610d04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201527f32206269747300000000000000000000000000000000000000000000000000006064820152608401610cfb565b73ffffffffffffffffffffffffffffffffffffffff81168114610e5357600080fd5b50565b61ffff81168114610e5357600080fd5b60008060008060808587031215610e7c57600080fd5b8435610e8781610e31565b935060208501359250604085013591506060850135610ea581610e56565b939692955090935050565b60008060408385031215610ec357600080fd5b8235610ece81610e31565b91506020830135610ede81610e31565b809150509250929050565b60008060408385031215610efc57600080fd5b8235610f0781610e31565b946020939093013593505050565b803560ff81168114610f2657600080fd5b919050565b600080600080600080600060e0888a031215610f4657600080fd5b8735610f5181610e31565b9650602088013595506040880135610f6881610e56565b945060608801359350610f7d60808901610f15565b925060a0880135915060c0880135905092959891949750929550565b80358015158114610f2657600080fd5b600080600080600060a08688031215610fc157600080fd5b8535610fcc81610e31565b94506020860135610fdc81610e31565b93506040860135610fec81610e31565b92506060860135915061100160808701610f99565b90509295509295909350565b60008060006060848603121561102257600080fd5b833561102d81610e31565b95602085013595506040909401359392505050565b60008060006060848603121561105757600080fd5b833561106281610e31565b925060208401359150604084013561107981610e56565b809150509250925092565b6000806040838503121561109757600080fd5b82356110a281610e31565b91506110b060208401610f99565b90509250929050565b600080600080600080600060e0888a0312156110d457600080fd5b87356110df81610e31565b9650602088013595506040880135945060608801359350610f7d60808901610f15565b6040516101e0810167ffffffffffffffff8111828210171561114d577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b60006020828403121561116557600080fd5b6040516020810181811067ffffffffffffffff821117156111af577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040529151825250919050565b80516fffffffffffffffffffffffffffffffff81168114610f2657600080fd5b805164ffffffffff81168114610f2657600080fd5b8051610f2681610e56565b8051610f2681610e31565b60006101e0828403121561121a57600080fd5b611222611102565b61122c8484611153565b815261123a602084016111bc565b602082015261124b604084016111bc565b604082015261125c606084016111bc565b606082015261126d608084016111bc565b608082015261127e60a084016111bc565b60a082015261128f60c084016111dc565b60c08201526112a060e084016111f1565b60e08201526101006112b38185016111fc565b908201526101206112c58482016111fc565b908201526101406112d78482016111fc565b908201526101606112e98482016111fc565b908201526101806112fb8482016111bc565b908201526101a061130d8482016111bc565b908201526101c061131f8482016111bc565b90820152939250505056fea264697066735822122071a6567d9295d5c2be6706e97da80e4f17a1ac8e0c91afce5aee76308156c12864736f6c63430008180033";

type L2EncoderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: L2EncoderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class L2Encoder__factory extends ContractFactory {
  constructor(...args: L2EncoderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    pool: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(pool, overrides || {});
  }
  override deploy(
    pool: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(pool, overrides || {}) as Promise<
      L2Encoder & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): L2Encoder__factory {
    return super.connect(runner) as L2Encoder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): L2EncoderInterface {
    return new Interface(_abi) as L2EncoderInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): L2Encoder {
    return new Contract(address, _abi, runner) as unknown as L2Encoder;
  }
}

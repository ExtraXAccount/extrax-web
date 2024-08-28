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
  PriceOracle,
  PriceOracleInterface,
} from "../../../../core-v3/mocks/oracle/PriceOracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "AssetPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "EthPriceUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getAssetPrice",
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
    name: "getEthUsdPrice",
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
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setAssetPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setEthUsdPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610231806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806351323f7214610051578063a0a8045e14610066578063b3596f071461007c578063b951883a146100b2575b600080fd5b61006461005f366004610196565b6100c5565b005b6001545b60405190815260200160405180910390f35b61006a61008a3660046101c0565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6100646100c03660046101e2565b61012d565b73ffffffffffffffffffffffffffffffffffffffff821660008181526020818152604091829020849055815192835282018390524282820152517fce6e0b57367bae95ca7198e1172f653ea64a645c16ab586b4cefa9237bfc2d929181900360600190a15050565b6001819055604080518281524260208201527fb4f35977939fa8b5ffe552d517a8ff5223046b1fdd3ee0068ae38d1e2b8d0016910160405180910390a150565b803573ffffffffffffffffffffffffffffffffffffffff8116811461019157600080fd5b919050565b600080604083850312156101a957600080fd5b6101b28361016d565b946020939093013593505050565b6000602082840312156101d257600080fd5b6101db8261016d565b9392505050565b6000602082840312156101f457600080fd5b503591905056fea26469706673582212207ab4831b8c34643981de9afd64bd61632aa5f7477a91be5cfc98ca62541f531b64736f6c63430008180033";

type PriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceOracle__factory extends ContractFactory {
  constructor(...args: PriceOracleConstructorParams) {
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
      PriceOracle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PriceOracle__factory {
    return super.connect(runner) as PriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceOracleInterface {
    return new Interface(_abi) as PriceOracleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): PriceOracle {
    return new Contract(address, _abi, runner) as unknown as PriceOracle;
  }
}
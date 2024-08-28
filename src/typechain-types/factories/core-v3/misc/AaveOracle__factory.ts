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
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  AaveOracle,
  AaveOracleInterface,
} from "../../../core-v3/misc/AaveOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "provider",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "sources",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "fallbackOracle",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseCurrency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "baseCurrencyUnit",
        type: "uint256",
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
        name: "asset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "source",
        type: "address",
      },
    ],
    name: "AssetSourceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "baseCurrency",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseCurrencyUnit",
        type: "uint256",
      },
    ],
    name: "BaseCurrencySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fallbackOracle",
        type: "address",
      },
    ],
    name: "FallbackOracleUpdated",
    type: "event",
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
    name: "BASE_CURRENCY",
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
    name: "BASE_CURRENCY_UNIT",
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
    inputs: [
      {
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
    ],
    name: "getAssetsPrices",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFallbackOracle",
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
        name: "asset",
        type: "address",
      },
    ],
    name: "getSourceOfAsset",
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
        internalType: "address[]",
        name: "assets",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "sources",
        type: "address[]",
      },
    ],
    name: "setAssetSources",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fallbackOracle",
        type: "address",
      },
    ],
    name: "setFallbackOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e06040523480156200001157600080fd5b506040516200117738038062001177833981016040819052620000349162000345565b6001600160a01b0386166080526200004c83620000ab565b620000588585620000f5565b6001600160a01b03821660a081905260c08290526040518281527fe27c4c1372396a3d15a9922f74f9dfc7c72b1ad6d63868470787249c356454c19060200160405180910390a250505050505062000460565b600180546001600160a01b0319166001600160a01b0383169081179091556040517fce7a780d33665b1ea097af5f155e3821b809ecbaa839d3b33aa83ba28168cefb90600090a250565b8051825114604051806040016040528060028152602001611b9b60f11b815250906200013f5760405162461bcd60e51b8152600401620001369190620003f9565b60405180910390fd5b5060005b82518110156200024f578181815181106200016257620001626200044a565b60200260200101516000808584815181106200018257620001826200044a565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b03160217905550818181518110620001e357620001e36200044a565b60200260200101516001600160a01b03168382815181106200020957620002096200044a565b60200260200101516001600160a01b03167f22c5b7b2d8561d39f7f210b6b326a1aa69f15311163082308ac4877db6339dc160405160405180910390a360010162000143565b505050565b6001600160a01b03811681146200026a57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b8051620002908162000254565b919050565b600082601f830112620002a757600080fd5b815160206001600160401b0380831115620002c657620002c66200026d565b8260051b604051601f19603f83011681018181108482111715620002ee57620002ee6200026d565b60405293845260208187018101949081019250878511156200030f57600080fd5b6020870191505b848210156200033a576200032a8262000283565b8352918301919083019062000316565b979650505050505050565b60008060008060008060c087890312156200035f57600080fd5b86516200036c8162000254565b60208801519096506001600160401b03808211156200038a57600080fd5b620003988a838b0162000295565b96506040890151915080821115620003af57600080fd5b50620003be89828a0162000295565b9450506060870151620003d18162000254565b6080880151909350620003e48162000254565b8092505060a087015190509295509295509295565b60006020808352835180602085015260005b8181101562000429578581018301518582016040015282016200040b565b506000604082860101526040601f19601f8301168501019250505092915050565b634e487b7160e01b600052603260045260246000fd5b60805160a05160c051610cd3620004a460003960008181610131015261039b0152600081816101e5015261037001526000818160ad01526105990152610cd36000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c806392bf2be011610076578063abfd53101161005b578063abfd5310146101ba578063b3596f07146101cd578063e19f4700146101e057600080fd5b806392bf2be0146101615780639d23d9f21461019a57600080fd5b80630542975c146100a8578063170aee73146100f95780636210308c1461010e5780638c89b64f1461012c575b600080fd5b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b61010c610107366004610a1f565b610207565b005b60015473ffffffffffffffffffffffffffffffffffffffff166100cf565b6101537f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016100f0565b6100cf61016f366004610a1f565b73ffffffffffffffffffffffffffffffffffffffff9081166000908152602081905260409020541690565b6101ad6101a8366004610a88565b61021b565b6040516100f09190610aca565b61010c6101c8366004610b0e565b6102c6565b6101536101db366004610a1f565b610341565b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b61020f610595565b610218816107c6565b50565b606060008267ffffffffffffffff81111561023857610238610b7a565b604051908082528060200260200182016040528015610261578160200160208202803683370190505b50905060005b838110156102be5761029985858381811061028457610284610ba9565b90506020020160208101906101db9190610a1f565b8282815181106102ab576102ab610ba9565b6020908102919091010152600101610267565b509392505050565b6102ce610595565b61033b8484808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152505060408051602080880282810182019093528782529093508792508691829185019084908082843760009201919091525061083592505050565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8082166000818152602081905260408120549092908116917f000000000000000000000000000000000000000000000000000000000000000090911690036103c057507f000000000000000000000000000000000000000000000000000000000000000092915050565b73ffffffffffffffffffffffffffffffffffffffff8116610476576001546040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301529091169063b3596f0790602401602060405180830381865afa15801561044b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046f9190610bd8565b9392505050565b60008173ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e79190610bd8565b905060008113156104f9579392505050565b6001546040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301529091169063b3596f0790602401602060405180830381865afa158015610569573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058d9190610bd8565b949350505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663707cd7166040518163ffffffff1660e01b8152600401602060405180830381865afa158015610602573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106269190610bf1565b6040517f13ee32e000000000000000000000000000000000000000000000000000000000815233600482015290915073ffffffffffffffffffffffffffffffffffffffff8216906313ee32e090602401602060405180830381865afa158015610693573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b79190610c0e565b8061074b57506040517f7be53ca100000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff821690637be53ca190602401602060405180830381865afa158015610727573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074b9190610c0e565b6040518060400160405280600181526020017f3500000000000000000000000000000000000000000000000000000000000000815250906107c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b99190610c30565b60405180910390fd5b5050565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517fce7a780d33665b1ea097af5f155e3821b809ecbaa839d3b33aa83ba28168cefb90600090a250565b80518251146040518060400160405280600281526020017f3736000000000000000000000000000000000000000000000000000000000000815250906108a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b99190610c30565b5060005b82518110156109f8578181815181106108c7576108c7610ba9565b60200260200101516000808584815181106108e4576108e4610ba9565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081818151811061097657610976610ba9565b602002602001015173ffffffffffffffffffffffffffffffffffffffff168382815181106109a6576109a6610ba9565b602002602001015173ffffffffffffffffffffffffffffffffffffffff167f22c5b7b2d8561d39f7f210b6b326a1aa69f15311163082308ac4877db6339dc160405160405180910390a36001016108ac565b505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461021857600080fd5b600060208284031215610a3157600080fd5b813561046f816109fd565b60008083601f840112610a4e57600080fd5b50813567ffffffffffffffff811115610a6657600080fd5b6020830191508360208260051b8501011115610a8157600080fd5b9250929050565b60008060208385031215610a9b57600080fd5b823567ffffffffffffffff811115610ab257600080fd5b610abe85828601610a3c565b90969095509350505050565b6020808252825182820181905260009190848201906040850190845b81811015610b0257835183529284019291840191600101610ae6565b50909695505050505050565b60008060008060408587031215610b2457600080fd5b843567ffffffffffffffff80821115610b3c57600080fd5b610b4888838901610a3c565b90965094506020870135915080821115610b6157600080fd5b50610b6e87828801610a3c565b95989497509550505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610bea57600080fd5b5051919050565b600060208284031215610c0357600080fd5b815161046f816109fd565b600060208284031215610c2057600080fd5b8151801515811461046f57600080fd5b60006020808352835180602085015260005b81811015610c5e57858101830151858201604001528201610c42565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116850101925050509291505056fea2646970667358221220317dbfdab8245d25c3b8381121a9e0117c24a020fda92655e7cbf456771800a764736f6c63430008180033";

type AaveOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AaveOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AaveOracle__factory extends ContractFactory {
  constructor(...args: AaveOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    provider: AddressLike,
    assets: AddressLike[],
    sources: AddressLike[],
    fallbackOracle: AddressLike,
    baseCurrency: AddressLike,
    baseCurrencyUnit: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      provider,
      assets,
      sources,
      fallbackOracle,
      baseCurrency,
      baseCurrencyUnit,
      overrides || {}
    );
  }
  override deploy(
    provider: AddressLike,
    assets: AddressLike[],
    sources: AddressLike[],
    fallbackOracle: AddressLike,
    baseCurrency: AddressLike,
    baseCurrencyUnit: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      provider,
      assets,
      sources,
      fallbackOracle,
      baseCurrency,
      baseCurrencyUnit,
      overrides || {}
    ) as Promise<
      AaveOracle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AaveOracle__factory {
    return super.connect(runner) as AaveOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AaveOracleInterface {
    return new Interface(_abi) as AaveOracleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): AaveOracle {
    return new Contract(address, _abi, runner) as unknown as AaveOracle;
  }
}
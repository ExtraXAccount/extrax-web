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
  PoolAddressesProvider,
  PoolAddressesProviderInterface,
} from "../../../../core-v3/protocol/configuration/PoolAddressesProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "marketId",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
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
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "ACLAdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "ACLManagerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "AddressSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "oldImplementationAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImplementationAddress",
        type: "address",
      },
    ],
    name: "AddressSetAsProxy",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "oldMarketId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "string",
        name: "newMarketId",
        type: "string",
      },
    ],
    name: "MarketIdSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PoolConfiguratorUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PoolDataProviderUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PoolUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PriceOracleSentinelUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "PriceOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxyAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "implementationAddress",
        type: "address",
      },
    ],
    name: "ProxyCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "getACLAdmin",
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
    name: "getACLManager",
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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getAddress",
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
    name: "getMarketId",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPool",
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
    name: "getPoolConfigurator",
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
    name: "getPoolDataProvider",
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
    name: "getPriceOracle",
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
    name: "getPriceOracleSentinel",
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
    name: "owner",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAclAdmin",
        type: "address",
      },
    ],
    name: "setACLAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAclManager",
        type: "address",
      },
    ],
    name: "setACLManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "setAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "newImplementationAddress",
        type: "address",
      },
    ],
    name: "setAddressAsProxy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newMarketId",
        type: "string",
      },
    ],
    name: "setMarketId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPoolConfiguratorImpl",
        type: "address",
      },
    ],
    name: "setPoolConfiguratorImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newDataProvider",
        type: "address",
      },
    ],
    name: "setPoolDataProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPoolImpl",
        type: "address",
      },
    ],
    name: "setPoolImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPriceOracle",
        type: "address",
      },
    ],
    name: "setPriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPriceOracleSentinel",
        type: "address",
      },
    ],
    name: "setPriceOracleSentinel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002c4c38038062002c4c8339810160408190526200003491620002f1565b600080546001600160a01b0319163390811782556040519091829160008051602062002c2c833981519152908290a3506200006f8262000082565b6200007a8162000187565b505062000539565b6000600180546200009390620003be565b80601f0160208091040260200160405190810160405280929190818152602001828054620000c190620003be565b8015620001125780601f10620000e65761010080835404028352916020019162000112565b820191906000526020600020905b815481529060010190602001808311620000f457829003601f168201915b5050505050905081600190816200012a91906200044f565b50816040516200013b91906200051b565b6040518091039020816040516200015391906200051b565b604051908190038120907fe685c8cdecc6030c45030fd54778812cb84ed8e4467c38294403d68ba786082390600090a35050565b6000546001600160a01b03163314620001e75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6001600160a01b0381166200024e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401620001de565b600080546040516001600160a01b038085169392169160008051602062002c2c83398151915291a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620002cb578181015183820152602001620002b1565b50506000910152565b80516001600160a01b0381168114620002ec57600080fd5b919050565b600080604083850312156200030557600080fd5b82516001600160401b03808211156200031d57600080fd5b818501915085601f8301126200033257600080fd5b81518181111562000347576200034762000298565b604051601f8201601f19908116603f0116810190838211818310171562000372576200037262000298565b816040528281528860208487010111156200038c57600080fd5b6200039f836020830160208801620002ae565b8096505050505050620003b560208401620002d4565b90509250929050565b600181811c90821680620003d357607f821691505b602082108103620003f457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200044a576000816000526020600020601f850160051c81016020861015620004255750805b601f850160051c820191505b81811015620004465782815560010162000431565b5050505b505050565b81516001600160401b038111156200046b576200046b62000298565b62000483816200047c8454620003be565b84620003fa565b602080601f831160018114620004bb5760008415620004a25750858301515b600019600386901b1c1916600185901b17855562000446565b600085815260208120601f198616915b82811015620004ec57888601518255948401946001909101908401620004cb565b50858210156200050b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082516200052f818460208701620002ae565b9190910192915050565b6126e380620005496000396000f3fe608060405234801561001057600080fd5b50600436106101825760003560e01c806376d84ffc116100d8578063e4ca28b71161008c578063f2fde38b11610066578063f2fde38b1461052f578063f67b184714610542578063fca513a81461055557600080fd5b8063e4ca28b7146104a3578063e860accb146104b6578063ed301ca91461051c57600080fd5b8063a1564406116100bd578063a15644061461046a578063ca446dd91461047d578063e44e9ed11461049057600080fd5b806376d84ffc146104395780638da5cb5b1461044c57600080fd5b80635dcc528c1161013a578063707cd71611610114578063707cd716146103b8578063715018a61461041e57806374944cec1461042657600080fd5b80635dcc528c146102d95780635eb88d3d146102ec578063631adfca1461035257600080fd5b806321f8a7211161016b57806321f8a72114610279578063530e784f146102af578063568ef470146102c457600080fd5b8063026b1d5f146101875780630e67178c14610213575b600080fd5b7f504f4f4c0000000000000000000000000000000000000000000000000000000060005260026020527f4fe005067814bb4b024d9515847377d15011b64593c006223b4a722952d2c05a5473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b7f41434c5f41444d494e000000000000000000000000000000000000000000000060005260026020527ffab167ad2009dcb80ee379700bb4bd029d97c1181ed9d961625632c8a6f051c65473ffffffffffffffffffffffffffffffffffffffff166101e9565b6101e96102873660046118c3565b60009081526002602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b6102c26102bd3660046118fe565b6105bb565b005b6102cc6106ff565b60405161020a9190611990565b6102c26102e73660046119a3565b610791565b7f50524943455f4f5241434c455f53454e54494e454c000000000000000000000060005260026020527f0d2c1bcee56447b4f46248272f34207a580a5c40f666a31f4e2fbb470ea53ab85473ffffffffffffffffffffffffffffffffffffffff166101e9565b7f504f4f4c5f434f4e464947555241544f5200000000000000000000000000000060005260026020527f90c127ef1c12c03f5781afeca3079527ea5333738078bba6fea26825bf9bf2c55473ffffffffffffffffffffffffffffffffffffffff166101e9565b7f41434c5f4d414e4147455200000000000000000000000000000000000000000060005260026020527f9edef266ef35fd0c6e131df0f31a330f3dd4c4d19dd31ed615c21d005c68116b5473ffffffffffffffffffffffffffffffffffffffff166101e9565b6102c26108a7565b6102c26104343660046118fe565b610997565b6102c26104473660046118fe565b610ad6565b60005473ffffffffffffffffffffffffffffffffffffffff166101e9565b6102c26104783660046118fe565b610c15565b6102c261048b3660046119a3565b610d4b565b6102c261049e3660046118fe565b610e4f565b6102c26104b13660046118fe565b610f8e565b7f444154415f50524f56494445520000000000000000000000000000000000000060005260026020527fcd7944601aaa5cd7ccdae1bebec659e98c6aac8f12486b30e59db0d39698051f5473ffffffffffffffffffffffffffffffffffffffff166101e9565b6102c261052a3660046118fe565b6110c4565b6102c261053d3660046118fe565b611203565b6102c2610550366004611a02565b6113b4565b7f50524943455f4f5241434c45000000000000000000000000000000000000000060005260026020527f740f710666bd7a12af42df98311e541e47f7fd33d382d11602457a6d540cbd635473ffffffffffffffffffffffffffffffffffffffff166101e9565b60005473ffffffffffffffffffffffffffffffffffffffff163314610641576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b7f50524943455f4f5241434c450000000000000000000000000000000000000000600090815260026020527f740f710666bd7a12af42df98311e541e47f7fd33d382d11602457a6d540cbd63805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935560405191169283917f56b5f80d8cac1479698aa7d01605fd6111e90b15fc4d2b377417f46034876cbd9190a35050565b60606001805461070e90611ad1565b80601f016020809104026020016040519081016040528092919081815260200182805461073a90611ad1565b80156107875780601f1061075c57610100808354040283529160200191610787565b820191906000526020600020905b81548152906001019060200180831161076a57829003601f168201915b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff163314610812576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b60008281526002602052604081205473ffffffffffffffffffffffffffffffffffffffff169061084184611441565b905061084d84846114f8565b60405173ffffffffffffffffffffffffffffffffffffffff8281168252808516919084169086907f3bbd45b5429b385e3fb37ad5cd1cd1435a3c8ec32196c7937597365a3fd3e99c9060200160405180910390a450505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610928576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff163314610a18576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b7f50524943455f4f5241434c455f53454e54494e454c0000000000000000000000600090815260026020527f0d2c1bcee56447b4f46248272f34207a580a5c40f666a31f4e2fbb470ea53ab8805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935560405191169283917f5326514eeca90494a14bedabcff812a0e683029ee85d1e23824d44fd14cd6ae79190a35050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610b57576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b7f41434c5f41444d494e0000000000000000000000000000000000000000000000600090815260026020527ffab167ad2009dcb80ee379700bb4bd029d97c1181ed9d961625632c8a6f051c6805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935560405191169283917fe9cf53972264dc95304fd424458745019ddfca0e37ae8f703d74772c41ad115b9190a35050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c96576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b6000610cc17f504f4f4c00000000000000000000000000000000000000000000000000000000611441565b9050610ced7f504f4f4c00000000000000000000000000000000000000000000000000000000836114f8565b8173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f90affc163f1a2dfedcd36aa02ed992eeeba8100a4014f0b4cdc20ea265a6662760405160405180910390a35050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610dcc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b60008281526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000811673ffffffffffffffffffffffffffffffffffffffff8681169182179093559251911692839186917f9ef0e8c8e52743bb38b83b17d9429141d494b8041ca6d616a6c77cebae9cd8b791a4505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610ed0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b7f444154415f50524f564944455200000000000000000000000000000000000000600090815260026020527fcd7944601aaa5cd7ccdae1bebec659e98c6aac8f12486b30e59db0d39698051f805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935560405191169283917fc853974cfbf81487a14a23565917bee63f527853bcb5fa54f2ae1cdf8a38356d9190a35050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461100f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b600061103a7f504f4f4c5f434f4e464947555241544f52000000000000000000000000000000611441565b90506110667f504f4f4c5f434f4e464947555241544f52000000000000000000000000000000836114f8565b8173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8932892569eba59c8382a089d9b732d1f49272878775235761a2a6b0309cd46560405160405180910390a35050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611145576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b7f41434c5f4d414e41474552000000000000000000000000000000000000000000600090815260026020527f9edef266ef35fd0c6e131df0f31a330f3dd4c4d19dd31ed615c21d005c68116b805473ffffffffffffffffffffffffffffffffffffffff8481167fffffffffffffffffffffffff00000000000000000000000000000000000000008316811790935560405191169283917fb30efa04327bb8a537d61cc1e5c48095345ad18ef7cc04e6bacf7dfb6caaf5079190a35050565b60005473ffffffffffffffffffffffffffffffffffffffff163314611284576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b73ffffffffffffffffffffffffffffffffffffffff8116611327576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610638565b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff163314611435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610638565b61143e816117bf565b50565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16806114745750600092915050565b60008190508073ffffffffffffffffffffffffffffffffffffffff16635c60da1b6040518163ffffffff1660e01b81526004016020604051808303816000875af11580156114c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ea9190611b1e565b949350505050565b50919050565b60008281526002602052604080822054905130602482015273ffffffffffffffffffffffffffffffffffffffff90911691908190604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc4d66de800000000000000000000000000000000000000000000000000000000179052905073ffffffffffffffffffffffffffffffffffffffff831661172e57306040516115cf906118b6565b73ffffffffffffffffffffffffffffffffffffffff9091168152602001604051809103906000f080158015611608573d6000803e3d6000fd5b506000868152600260205260409081902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915590517fd1f578940000000000000000000000000000000000000000000000000000000081529194508493509063d1f578949061169c9087908590600401611b3b565b600060405180830381600087803b1580156116b657600080fd5b505af11580156116ca573d6000803e3d6000fd5b505050508373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16867f4a465a9bd819d9662563c1e11ae958f8109e437e7f4bf1c6ef0b9a7b3f35d47860405160405180910390a46117b8565b6040517f4f1ef28600000000000000000000000000000000000000000000000000000000815283925073ffffffffffffffffffffffffffffffffffffffff831690634f1ef286906117859087908590600401611b3b565b600060405180830381600087803b15801561179f57600080fd5b505af11580156117b3573d6000803e3d6000fd5b505050505b5050505050565b6000600180546117ce90611ad1565b80601f01602080910402602001604051908101604052809291908181526020018280546117fa90611ad1565b80156118475780601f1061181c57610100808354040283529160200191611847565b820191906000526020600020905b81548152906001019060200180831161182a57829003601f168201915b50505050509050816001908161185d9190611bbb565b508160405161186c9190611cd5565b6040518091039020816040516118829190611cd5565b604051908190038120907fe685c8cdecc6030c45030fd54778812cb84ed8e4467c38294403d68ba786082390600090a35050565b6109bc80611cf283390190565b6000602082840312156118d557600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461143e57600080fd5b60006020828403121561191057600080fd5b813561191b816118dc565b9392505050565b60005b8381101561193d578181015183820152602001611925565b50506000910152565b6000815180845261195e816020860160208601611922565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061191b6020830184611946565b600080604083850312156119b657600080fd5b8235915060208301356119c8816118dc565b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215611a1457600080fd5b813567ffffffffffffffff80821115611a2c57600080fd5b818401915084601f830112611a4057600080fd5b813581811115611a5257611a526119d3565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611a9857611a986119d3565b81604052828152876020848701011115611ab157600080fd5b826020860160208301376000928101602001929092525095945050505050565b600181811c90821680611ae557607f821691505b6020821081036114f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060208284031215611b3057600080fd5b815161191b816118dc565b73ffffffffffffffffffffffffffffffffffffffff831681526040602082015260006114ea6040830184611946565b601f821115611bb6576000816000526020600020601f850160051c81016020861015611b935750805b601f850160051c820191505b81811015611bb257828155600101611b9f565b5050505b505050565b815167ffffffffffffffff811115611bd557611bd56119d3565b611be981611be38454611ad1565b84611b6a565b602080601f831160018114611c3c5760008415611c065750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555611bb2565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611c8957888601518255948401946001909101908401611c6a565b5085821015611cc557878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b60008251611ce7818460208701611922565b919091019291505056fe60a060405234801561001057600080fd5b506040516109bc3803806109bc83398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b60805161090e6100ae6000396000818161014e0152818161019f015281816102710152818161040d01528181610436015261059f015261090e6000f3fe60806040526004361061005a5760003560e01c80635c60da1b116100435780635c60da1b14610097578063d1f57894146100d5578063f851a440146100e85761005a565b80633659cfe6146100645780634f1ef28614610084575b6100626100fd565b005b34801561007057600080fd5b5061006261007f366004610676565b610137565b610062610092366004610698565b610188565b3480156100a357600080fd5b506100ac610258565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6100626100e336600461074a565b6102c8565b3480156100f457600080fd5b506100ac6103f4565b610105610458565b6101356101307f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b610460565b565b73ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633036101805761017d81610484565b50565b61017d6100fd565b73ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016330361024b576101ce83610484565b60008373ffffffffffffffffffffffffffffffffffffffff1683836040516101f792919061082a565b600060405180830381855af49150503d8060008114610232576040519150601f19603f3d011682016040523d82523d6000602084013e610237565b606091505b505090508061024557600080fd5b50505050565b6102536100fd565b505050565b600073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633036102bd57507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b6102c56100fd565b90565b60006102f27f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b73ffffffffffffffffffffffffffffffffffffffff161461031257600080fd5b61033d60017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd61083a565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc1461036b5761036b61087a565b610374826104d1565b8051156103f05760008273ffffffffffffffffffffffffffffffffffffffff16826040516103a291906108a9565b600060405180830381855af49150503d80600081146103dd576040519150601f19603f3d011682016040523d82523d6000602084013e6103e2565b606091505b505090508061025357600080fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001633036102bd57507f000000000000000000000000000000000000000000000000000000000000000090565b610135610588565b3660008037600080366000845af43d6000803e80801561047f573d6000f35b3d6000fd5b61048d816104d1565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b610564576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f43616e6e6f742073657420612070726f787920696d706c656d656e746174696f60448201527f6e20746f2061206e6f6e2d636f6e74726163742061646472657373000000000060648201526084015b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163303610135576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e20667260448201527f6f6d207468652070726f78792061646d696e0000000000000000000000000000606482015260840161055b565b803573ffffffffffffffffffffffffffffffffffffffff8116811461067157600080fd5b919050565b60006020828403121561068857600080fd5b6106918261064d565b9392505050565b6000806000604084860312156106ad57600080fd5b6106b68461064d565b9250602084013567ffffffffffffffff808211156106d357600080fd5b818601915086601f8301126106e757600080fd5b8135818111156106f657600080fd5b87602082850101111561070857600080fd5b6020830194508093505050509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806040838503121561075d57600080fd5b6107668361064d565b9150602083013567ffffffffffffffff8082111561078357600080fd5b818501915085601f83011261079757600080fd5b8135818111156107a9576107a961071b565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156107ef576107ef61071b565b8160405282815288602084870101111561080857600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b8183823760009101908152919050565b81810381811115610874577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b6000825160005b818110156108ca57602081860181015185830152016108b0565b50600092019182525091905056fea26469706673582212206431eef3882efe27ab4cfa9a69c7a77e456e01a8c1058fae533b8984ad8783b264736f6c63430008180033a2646970667358221220dd0338035508ffef6b2c4be88180abd396d1c93f4c7f2276d2ff18935760040764736f6c634300081800338be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0";

type PoolAddressesProviderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolAddressesProviderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PoolAddressesProvider__factory extends ContractFactory {
  constructor(...args: PoolAddressesProviderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    marketId: string,
    owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(marketId, owner, overrides || {});
  }
  override deploy(
    marketId: string,
    owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(marketId, owner, overrides || {}) as Promise<
      PoolAddressesProvider & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): PoolAddressesProvider__factory {
    return super.connect(runner) as PoolAddressesProvider__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolAddressesProviderInterface {
    return new Interface(_abi) as PoolAddressesProviderInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): PoolAddressesProvider {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as PoolAddressesProvider;
  }
}

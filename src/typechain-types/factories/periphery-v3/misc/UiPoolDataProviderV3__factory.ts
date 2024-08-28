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
  UiPoolDataProviderV3,
  UiPoolDataProviderV3Interface,
} from "../../../periphery-v3/misc/UiPoolDataProviderV3";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEACAggregatorProxy",
        name: "_networkBaseTokenPriceInUsdProxyAggregator",
        type: "address",
      },
      {
        internalType: "contract IEACAggregatorProxy",
        name: "_marketReferenceCurrencyPriceInUsdProxyAggregator",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ETH_CURRENCY_UNIT",
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
    name: "MKR_ADDRESS",
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
        name: "_bytes32",
        type: "bytes32",
      },
    ],
    name: "bytes32ToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "provider",
        type: "address",
      },
    ],
    name: "getReservesData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "underlyingAsset",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseLTVasCollateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveLiquidationThreshold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveLiquidationBonus",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reserveFactor",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "usageAsCollateralEnabled",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "borrowingEnabled",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "stableBorrowRateEnabled",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isFrozen",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "liquidityIndex",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "variableBorrowIndex",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "liquidityRate",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "variableBorrowRate",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "stableBorrowRate",
            type: "uint128",
          },
          {
            internalType: "uint40",
            name: "lastUpdateTimestamp",
            type: "uint40",
          },
          {
            internalType: "address",
            name: "aTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "stableDebtTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "variableDebtTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "interestRateStrategyAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "availableLiquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalPrincipalStableDebt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "averageStableRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stableDebtLastUpdateTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalScaledVariableDebt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "priceInMarketReferenceCurrency",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "priceOracle",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "variableRateSlope1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "variableRateSlope2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stableRateSlope1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stableRateSlope2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseStableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseVariableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "optimalUsageRatio",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSiloedBorrowing",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "accruedToTreasury",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "unbacked",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "isolationModeTotalDebt",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "flashLoanEnabled",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "debtCeiling",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "debtCeilingDecimals",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "eModeCategoryId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "borrowCap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "supplyCap",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "eModeLtv",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "eModeLiquidationThreshold",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "eModeLiquidationBonus",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "eModePriceSource",
            type: "address",
          },
          {
            internalType: "string",
            name: "eModeLabel",
            type: "string",
          },
          {
            internalType: "bool",
            name: "borrowableInIsolation",
            type: "bool",
          },
        ],
        internalType: "struct IUiPoolDataProviderV3.AggregatedReserveData[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "marketReferenceCurrencyUnit",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "marketReferenceCurrencyPriceInUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "networkBaseTokenPriceInUsd",
            type: "int256",
          },
          {
            internalType: "uint8",
            name: "networkBaseTokenPriceDecimals",
            type: "uint8",
          },
        ],
        internalType: "struct IUiPoolDataProviderV3.BaseCurrencyInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "provider",
        type: "address",
      },
    ],
    name: "getReservesList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "provider",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserReservesData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "underlyingAsset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "scaledATokenBalance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "usageAsCollateralEnabledOnUser",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "stableBorrowRate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "scaledVariableDebt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "principalStableDebt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stableBorrowLastUpdateTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct IUiPoolDataProviderV3.UserReserveData[]",
        name: "",
        type: "tuple[]",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketReferenceCurrencyPriceInUsdProxyAggregator",
    outputs: [
      {
        internalType: "contract IEACAggregatorProxy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "networkBaseTokenPriceInUsdProxyAggregator",
    outputs: [
      {
        internalType: "contract IEACAggregatorProxy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620030c9380380620030c9833981016040819052620000349162000069565b6001600160a01b039182166080521660a052620000a1565b80516001600160a01b03811681146200006457600080fd5b919050565b600080604083850312156200007d57600080fd5b62000088836200004c565b915062000098602084016200004c565b90509250929050565b60805160a051612fee620000db6000396000818161017c015261221501526000818160b401528181611ffb01526120930152612fee6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063825ffd921161005b578063825ffd921461013c5780639201de5514610157578063d22cf68a14610177578063ec489c211461019e57600080fd5b80630496f53a1461008d5780633c1740ed146100af57806351974cc0146100fb578063586c14421461011c575b600080fd5b61009c670de0b6b3a764000081565b6040519081526020015b60405180910390f35b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100a6565b61010e6101093660046123f8565b6101bf565b6040516100a6929190612431565b61012f61012a3660046124d5565b6109d8565b6040516100a691906124f2565b6100d6739f8f72aa9304c8b593d555f12ef6589cc3a579a281565b61016a61016536600461254c565b610ae5565b6040516100a691906125d3565b6100d67f000000000000000000000000000000000000000000000000000000000000000081565b6101b16101ac3660046124d5565b610c5d565b6040516100a69291906125e6565b60606000808473ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561020f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023391906129b7565b905060008173ffffffffffffffffffffffffffffffffffffffff1663d1946dbc6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610282573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526102c89190810190612a9f565b6040517f4417a58300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8781166004830152919250600091841690634417a58390602401602060405180830381865afa15801561033a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035e9190612b93565b6040517feddf1b7900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff888116600483015291925060009185169063eddf1b7990602401602060405180830381865afa1580156103d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f49190612baf565b9050600073ffffffffffffffffffffffffffffffffffffffff881661041a57600061041d565b83515b67ffffffffffffffff811115610435576104356129d4565b6040519080825280602002602001820160405280156104be57816020015b6104ab6040518060e00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600015158152602001600081526020016000815260200160008152602001600081525090565b8152602001906001900390816104535790505b50905060005b84518110156109ca5760008673ffffffffffffffffffffffffffffffffffffffff166335ea6a758784815181106104fd576104fd612bc8565b60200260200101516040518263ffffffff1660e01b815260040161053d919073ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b6101e060405180830381865afa15801561055b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057f9190612c3e565b905085828151811061059357610593612bc8565b60200260200101518383815181106105ad576105ad612bc8565b602090810291909101015173ffffffffffffffffffffffffffffffffffffffff91821690526101008201516040517f1da24f3e0000000000000000000000000000000000000000000000000000000081528c83166004820152911690631da24f3e90602401602060405180830381865afa15801561062f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106539190612baf565b83838151811061066557610665612bc8565b602090810291909101810151015261067d85836122c4565b83838151811061068f5761068f612bc8565b60209081029190910101519015156040909101526106ad8583612351565b156109c1576101408101516040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8c8116600483015290911690631da24f3e90602401602060405180830381865afa158015610725573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107499190612baf565b83838151811061075b5761075b612bc8565b6020908102919091010151608001526101208101516040517fc634dfaa00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8c811660048301529091169063c634dfaa90602401602060405180830381865afa1580156107dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108019190612baf565b83838151811061081357610813612bc8565b602002602001015160a001818152505082828151811061083557610835612bc8565b602002602001015160a001516000146109c1576101208101516040517fe78c9b3b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8c811660048301529091169063e78c9b3b90602401602060405180830381865afa1580156108bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108df9190612baf565b8383815181106108f1576108f1612bc8565b6020908102919091010151606001526101208101516040517f79ce6b8c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8c81166004830152909116906379ce6b8c90602401602060405180830381865afa158015610973573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109979190612d61565b64ffffffffff168383815181106109b0576109b0612bc8565b602002602001015160c00181815250505b506001016104c4565b509890975095505050505050565b606060008273ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4b91906129b7565b90508073ffffffffffffffffffffffffffffffffffffffff1663d1946dbc6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610a98573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610ade9190810190612a9f565b9392505050565b606060005b60208160ff16108015610b365750828160ff1660208110610b0d57610b0d612bc8565b1a60f81b7fff000000000000000000000000000000000000000000000000000000000000001615155b15610b4d5780610b4581612d7c565b915050610aea565b60008160ff1667ffffffffffffffff811115610b6b57610b6b6129d4565b6040519080825280601f01601f191660200182016040528015610b95576020820181803683370190505b509050600091505b60208260ff16108015610be95750838260ff1660208110610bc057610bc0612bc8565b1a60f81b7fff000000000000000000000000000000000000000000000000000000000000001615155b15610ade57838260ff1660208110610c0357610c03612bc8565b1a60f81b818360ff1681518110610c1c57610c1c612bc8565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081610c5581612d7c565b925050610b9d565b6060610c8d6040518060800160405280600081526020016000815260200160008152602001600060ff1681525090565b60008373ffffffffffffffffffffffffffffffffffffffff1663fca513a86040518163ffffffff1660e01b8152600401602060405180830381865afa158015610cda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfe91906129b7565b905060008473ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d7191906129b7565b905060008573ffffffffffffffffffffffffffffffffffffffff1663e860accb6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610dc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de491906129b7565b905060008273ffffffffffffffffffffffffffffffffffffffff1663d1946dbc6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610e33573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610e799190810190612a9f565b90506000815167ffffffffffffffff811115610e9757610e976129d4565b60405190808252806020026020018201604052801561109357816020015b604080516106c0810182526000808252606060208084018290529383018190528083018290526080830182905260a0830182905260c0830182905260e08301829052610100830182905261012083018290526101408301829052610160830182905261018083018290526101a083018290526101c083018290526101e08301829052610200830182905261022083018290526102408301829052610260830182905261028083018290526102a083018290526102c083018290526102e08301829052610300830182905261032083018290526103408301829052610360830182905261038083018290526103a083018290526103c083018290526103e08301829052610400830182905261042083018290526104408301829052610460830182905261048083018290526104a083018290526104c083018290526104e08301829052610500830182905261052083018290526105408301829052610560830182905261058083018290526105a083018290526105c083018290526105e0830182905261060083018290526106208301829052610640830182905261066083018290526106808301526106a082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610eb55790505b50905060005b8251811015611fca5760008282815181106110b6576110b6612bc8565b602002602001015190508382815181106110d2576110d2612bc8565b602090810291909101015173ffffffffffffffffffffffffffffffffffffffff9081168083526040517f35ea6a7500000000000000000000000000000000000000000000000000000000815260048101919091526000918816906335ea6a75906024016101e060405180830381865afa158015611153573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111779190612c3e565b60208101516fffffffffffffffffffffffffffffffff9081166101a0850152606082015181166101c085015260408083015182166101e08601526080830151821661020086015260a083015190911661022085015260c082015164ffffffffff1661024085015261010082015173ffffffffffffffffffffffffffffffffffffffff908116610260860152610120830151811661028086015261014083015181166102a086015261016083015181166102c0860152845191517fb3596f0700000000000000000000000000000000000000000000000000000000815291811660048301529192509089169063b3596f0790602401602060405180830381865afa158015611288573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ac9190612baf565b61038083015281516040517f92bf2be000000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182166004820152908916906392bf2be090602401602060405180830381865afa158015611321573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061134591906129b7565b73ffffffffffffffffffffffffffffffffffffffff9081166103a084015282516102608401516040517f70a0823100000000000000000000000000000000000000000000000000000000815290831660048201529116906370a0823190602401602060405180830381865afa1580156113c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113e69190612baf565b826102e001818152505081610280015173ffffffffffffffffffffffffffffffffffffffff1663797743386040518163ffffffff1660e01b8152600401608060405180830381865afa158015611440573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114649190612dc2565b64ffffffffff16610340860152610320850152506103008301526102a0820151604080517fb1bf962d000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff9092169163b1bf962d916004808201926020929091908290030181865afa1580156114f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115159190612baf565b610360830152815173ffffffffffffffffffffffffffffffffffffffff167fffffffffffffffffffffffff60708d556cfb374a6c2aaa0ed109a7633c5a865e0161166b576000826000015173ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b8152600401602060405180830381865afa1580156115aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ce9190612baf565b90506000836000015173ffffffffffffffffffffffffffffffffffffffff166306fdde036040518163ffffffff1660e01b8152600401602060405180830381865afa158015611621573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116459190612baf565b905061165082610ae5565b604085015261165e81610ae5565b6020850152506117a39050565b816000015173ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa1580156116ba573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526117009190810190612e8b565b8260400181905250816000015173ffffffffffffffffffffffffffffffffffffffff166306fdde036040518163ffffffff1660e01b8152600401600060405180830381865afa158015611757573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261179d9190810190612e8b565b60208301525b8051805161ffff604082811c821660e087015260ff603084901c81166060880152602084811c841660c0890152601085901c841660a08901529284166080880181905215156101008801528451671000000000000000811615156104a08901526708000000000000008116151561014089015267040000000000000081161515610120890152670200000000000000811615156101808901526701000000000000001615156101608801526102c087015182517f0b3429a2000000000000000000000000000000000000000000000000000000008152925160a89590951c9091169373ffffffffffffffffffffffffffffffffffffffff90911692630b3429a292600480820193918290030181865afa9250505080156118fe575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526118fb91810190612baf565b60015b1561190a576103c08501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff1663f42024096040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611994575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261199191810190612baf565b60015b156119a0576103e08501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff1663d5cd73916040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611a2a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611a2791810190612baf565b60015b15611a36576104008501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff166314e32da46040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611ac0575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611abd91810190612baf565b60015b15611acc576104208501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff1663acd786866040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611b56575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611b5391810190612baf565b60015b15611b62576104408501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff166334762ca56040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611bec575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611be991810190612baf565b60015b15611bf8576104608501525b836102c0015173ffffffffffffffffffffffffffffffffffffffff166354c365c66040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611c82575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611c7f91810190612baf565b60015b15611c8e576104808501525b60ff81166105a0850152815160d41c64ffffffffff16846105600181815250508773ffffffffffffffffffffffffffffffffffffffff166369b169e16040518163ffffffff1660e01b8152600401602060405180830381865afa158015611cf9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1d9190612baf565b6105808501528151640fffffffff605082901c81169160741c166105e08601526105c085015283516040517fd7ed3ef400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821660048201529089169063d7ed3ef490602401602060405180830381865afa925050508015611dec575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611de991810190612ec0565b60015b611e2e573d808015611e1a576040519150601f19603f3d011682016040523d82523d6000602084013e611e1f565b606091505b50506001610540850152611e37565b15156105408501525b815167400000000000000016151515156104c08501526101a08301516fffffffffffffffffffffffffffffffff9081166105008601526101c08401518116610520860152610180840151166104e08501526105a08401516040517f6c6f6ae100000000000000000000000000000000000000000000000000000000815260ff909116600482015260009073ffffffffffffffffffffffffffffffffffffffff8b1690636c6f6ae190602401600060405180830381865afa158015611eff573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611f459190810190612ee2565b805161ffff90811661060088015260208201518116610620880152604082015116610640870152606081015173ffffffffffffffffffffffffffffffffffffffff1661066087015260808101516106808701529050611fae835167200000000000000016151590565b15156106a0909501949094525050600190920191506110999050565b50611ff96040518060800160405280600081526020016000815260200160008152602001600060ff1681525090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612064573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120889190612baf565b8160400181815250507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156120fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121209190612f95565b60ff166060820152604080517f8c89b64f000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff881691638c89b64f9160048083019260209291908290030181865afa9250505080156121cd575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526121ca91810190612baf565b60015b6122ad573d8080156121fb576040519150601f19603f3d011682016040523d82523d6000602084013e612200565b606091505b50670de0b6b3a76400008260000181815250507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561227e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122a29190612baf565b6020830152506122b6565b80825260208201525b909890975095505050505050565b60408051808201909152600281527f373400000000000000000000000000000000000000000000000000000000000060208201526000906080831061233f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161233691906125d3565b60405180910390fd5b50509051600191821b82011c16151590565b60408051808201909152600281527f37340000000000000000000000000000000000000000000000000000000000006020820152600090608083106123c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161233691906125d3565b50509051600191821b1c16151590565b73ffffffffffffffffffffffffffffffffffffffff811681146123f557600080fd5b50565b6000806040838503121561240b57600080fd5b8235612416816123d3565b91506020830135612426816123d3565b809150509250929050565b6040808252835182820181905260009190606090818501906020808901865b838110156124be578151805173ffffffffffffffffffffffffffffffffffffffff16865283810151848701528781015115158887015286810151878701526080808201519087015260a0808201519087015260c0908101519086015260e09094019390820190600101612450565b50505060ff87166020870152509250610ade915050565b6000602082840312156124e757600080fd5b8135610ade816123d3565b6020808252825182820181905260009190848201906040850190845b8181101561254057835173ffffffffffffffffffffffffffffffffffffffff168352928401929184019160010161250e565b50909695505050505050565b60006020828403121561255e57600080fd5b5035919050565b60005b83811015612580578181015183820152602001612568565b50506000910152565b600081518084526125a1816020860160208601612565565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000610ade6020830184612589565b600060a080830160a0845280865180835260c0925060c08601915060c08160051b8701016020808a0160005b84811015612965578984037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff400186528151805173ffffffffffffffffffffffffffffffffffffffff1685526106c084820151818688015261267582880182612589565b9150506040808301518783038289015261268f8382612589565b606085810151908a0152608080860151908a01528c8501518d8a01528b8501518c8a015260e080860151908a0152610100808601511515908a0152610120808601511515908a0152610140808601511515908a0152610160808601511515908a0152610180808601511515908a01526101a0808601516fffffffffffffffffffffffffffffffff908116918b01919091526101c0808701518216908b01526101e0808701518216908b0152610200808701518216908b0152610220808701518216908b01526102408087015164ffffffffff16908b01526102608087015173ffffffffffffffffffffffffffffffffffffffff908116918c0191909152610280808801518216908c01526102a0808801518216908c01526102c0808801518216908c01526102e080880151908c015261030080880151908c015261032080880151908c015261034080880151908c015261036080880151908c015261038080880151908c01526103a0808801518216908c01526103c080880151908c01526103e080880151908c015261040080880151908c015261042080880151908c015261044080880151908c015261046080880151908c015261048080880151908c01526104a0808801511515908c01526104c0808801511515908c01526104e0808801518316908c0152610500808801518316908c015261052080880151909216918b0191909152610540808701511515908b015261056080870151908b015261058080870151908b01526105a08087015160ff16908b01526105c080870151908b01526105e080870151908b01526106008087015161ffff908116918c0191909152610620808801518216908c015261064080880151909116908b015261066080870151909116908a0152610680808601518a8303828c0152919450925090506129378382612589565b925050506106a08083015192506129518188018415159052565b509684019694505090820190600101612612565b505081965061299a8189018a80518252602081015160208301526040810151604083015260ff60608201511660608301525050565b5050505050509392505050565b80516129b2816123d3565b919050565b6000602082840312156129c957600080fd5b8151610ade816123d3565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516101e0810167ffffffffffffffff81118282101715612a2757612a276129d4565b60405290565b60405160a0810167ffffffffffffffff81118282101715612a2757612a276129d4565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612a9757612a976129d4565b604052919050565b60006020808385031215612ab257600080fd5b825167ffffffffffffffff80821115612aca57600080fd5b818501915085601f830112612ade57600080fd5b815181811115612af057612af06129d4565b8060051b9150612b01848301612a50565b8181529183018401918481019088841115612b1b57600080fd5b938501935b83851015612b455784519250612b35836123d3565b8282529385019390850190612b20565b98975050505050505050565b600060208284031215612b6357600080fd5b6040516020810181811067ffffffffffffffff82111715612b8657612b866129d4565b6040529151825250919050565b600060208284031215612ba557600080fd5b610ade8383612b51565b600060208284031215612bc157600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80516fffffffffffffffffffffffffffffffff811681146129b257600080fd5b805164ffffffffff811681146129b257600080fd5b805161ffff811681146129b257600080fd5b60006101e08284031215612c5157600080fd5b612c59612a03565b612c638484612b51565b8152612c7160208401612bf7565b6020820152612c8260408401612bf7565b6040820152612c9360608401612bf7565b6060820152612ca460808401612bf7565b6080820152612cb560a08401612bf7565b60a0820152612cc660c08401612c17565b60c0820152612cd760e08401612c2c565b60e0820152610100612cea8185016129a7565b90820152610120612cfc8482016129a7565b90820152610140612d0e8482016129a7565b90820152610160612d208482016129a7565b90820152610180612d32848201612bf7565b908201526101a0612d44848201612bf7565b908201526101c0612d56848201612bf7565b908201529392505050565b600060208284031215612d7357600080fd5b610ade82612c17565b600060ff821660ff8103612db9577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60010192915050565b60008060008060808587031215612dd857600080fd5b845193506020850151925060408501519150612df660608601612c17565b905092959194509250565b600082601f830112612e1257600080fd5b815167ffffffffffffffff811115612e2c57612e2c6129d4565b612e5d60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612a50565b818152846020838601011115612e7257600080fd5b612e83826020830160208701612565565b949350505050565b600060208284031215612e9d57600080fd5b815167ffffffffffffffff811115612eb457600080fd5b612e8384828501612e01565b600060208284031215612ed257600080fd5b81518015158114610ade57600080fd5b600060208284031215612ef457600080fd5b815167ffffffffffffffff80821115612f0c57600080fd5b9083019060a08286031215612f2057600080fd5b612f28612a2d565b612f3183612c2c565b8152612f3f60208401612c2c565b6020820152612f5060408401612c2c565b60408201526060830151612f63816123d3565b6060820152608083015182811115612f7a57600080fd5b612f8687828601612e01565b60808301525095945050505050565b600060208284031215612fa757600080fd5b815160ff81168114610ade57600080fdfea2646970667358221220a764b367fc3e6aa043c7eb2201b08ae7267822eb3497c6477999ad2797dd5cf764736f6c63430008180033";

type UiPoolDataProviderV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UiPoolDataProviderV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UiPoolDataProviderV3__factory extends ContractFactory {
  constructor(...args: UiPoolDataProviderV3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _networkBaseTokenPriceInUsdProxyAggregator: AddressLike,
    _marketReferenceCurrencyPriceInUsdProxyAggregator: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _networkBaseTokenPriceInUsdProxyAggregator,
      _marketReferenceCurrencyPriceInUsdProxyAggregator,
      overrides || {}
    );
  }
  override deploy(
    _networkBaseTokenPriceInUsdProxyAggregator: AddressLike,
    _marketReferenceCurrencyPriceInUsdProxyAggregator: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _networkBaseTokenPriceInUsdProxyAggregator,
      _marketReferenceCurrencyPriceInUsdProxyAggregator,
      overrides || {}
    ) as Promise<
      UiPoolDataProviderV3 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): UiPoolDataProviderV3__factory {
    return super.connect(runner) as UiPoolDataProviderV3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UiPoolDataProviderV3Interface {
    return new Interface(_abi) as UiPoolDataProviderV3Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UiPoolDataProviderV3 {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as UiPoolDataProviderV3;
  }
}
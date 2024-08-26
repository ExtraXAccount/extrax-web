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
  AaveProtocolDataProvider,
  AaveProtocolDataProviderInterface,
} from "../../../core-v3/misc/AaveProtocolDataProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IPoolAddressesProvider",
        name: "addressesProvider",
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
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getATokenTotalSupply",
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
    name: "getAllATokens",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        internalType: "struct IPoolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllReservesTokens",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        internalType: "struct IPoolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
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
    name: "getDebtCeiling",
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
    name: "getDebtCeilingDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
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
    name: "getFlashLoanEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    name: "getInterestRateStrategyAddress",
    outputs: [
      {
        internalType: "address",
        name: "irStrategyAddress",
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
    name: "getLiquidationProtocolFee",
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
    name: "getPaused",
    outputs: [
      {
        internalType: "bool",
        name: "isPaused",
        type: "bool",
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
    name: "getReserveCaps",
    outputs: [
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
    name: "getReserveConfigurationData",
    outputs: [
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ltv",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidationThreshold",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidationBonus",
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
    name: "getReserveData",
    outputs: [
      {
        internalType: "uint256",
        name: "unbacked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "accruedToTreasuryScaled",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalAToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalStableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVariableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidityRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "variableBorrowRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stableBorrowRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "averageStableBorrowRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidityIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "variableBorrowIndex",
        type: "uint256",
      },
      {
        internalType: "uint40",
        name: "lastUpdateTimestamp",
        type: "uint40",
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
    name: "getReserveEModeCategory",
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
    name: "getReserveTokensAddresses",
    outputs: [
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
    name: "getSiloedBorrowing",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
    name: "getTotalDebt",
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
    name: "getUnbackedMintCap",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserReserveData",
    outputs: [
      {
        internalType: "uint256",
        name: "currentATokenBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentStableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentVariableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "principalStableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "scaledVariableDebt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stableBorrowRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidityRate",
        type: "uint256",
      },
      {
        internalType: "uint40",
        name: "stableRateLastUpdated",
        type: "uint40",
      },
      {
        internalType: "bool",
        name: "usageAsCollateralEnabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523480156200001157600080fd5b50604051620030ac380380620030ac833981016040819052620000349162000046565b6001600160a01b031660805262000078565b6000602082840312156200005957600080fd5b81516001600160a01b03811681146200007157600080fd5b9392505050565b608051612f9a620001126000396000818161015b015281816104580152818161059b015281816106c101528181610c70015281816110510152818161118b015281816112c801528181611463015281816115aa015281816117c30152818161195e01528181611a9101528181611bc40152818161202e015281816121a7015281816122ec0152818161242701526127620152612f9a6000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c806351460e25116100cd578063b55d990411610081578063d7ed3ef411610066578063d7ed3ef414610425578063f561ae4114610438578063fcf40a621461044057600080fd5b8063b55d9904146103b8578063d2493b6c146103db57600080fd5b806369b169e1116100b257806369b169e1146103895780637ba1ae3614610390578063b316ff89146103a357600080fd5b806351460e25146103635780636744362a1461037657600080fd5b80633c798109116101245780633e150141116101095780633e150141146102c157806346fbe558146103285780634d44ac4f1461035057600080fd5b80633c7981091461029b5780633cb8a622146102ae57600080fd5b80630542975c14610156578063163a0f20146101a757806328dd2d01146101c857806335ea6a7514610228575b600080fd5b61017d7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6101ba6101b5366004612943565b610453565b60405190815260200161019e565b6101db6101d6366004612960565b61058a565b60408051998a5260208a0198909852968801959095526060870193909352608086019190915260a085015260c084015264ffffffffff1660e083015215156101008201526101200161019e565b61023b610236366004612943565b610c5a565b604080519c8d5260208d019b909b52998b019890985260608a0196909652608089019490945260a088019290925260c087015260e086015261010085015261012084015261014083015264ffffffffff166101608201526101800161019e565b6101ba6102a9366004612943565b61104a565b6101ba6102bc366004612943565b611184565b6102d46102cf366004612943565b6112b5565b604080519a8b5260208b01999099529789019690965260608801949094526080870192909252151560a0860152151560c0850152151560e0840152151561010083015215156101208201526101400161019e565b61033b610336366004612943565b61145b565b6040805192835260208301919091520161019e565b6101ba61035e366004612943565b6115a5565b6101ba610371366004612943565b6117be565b61017d610384366004612943565b611959565b60026101ba565b6101ba61039e366004612943565b611a8a565b6103ab611bbe565b60405161019e9190612a07565b6103cb6103c6366004612943565b612027565b604051901515815260200161019e565b6103ee6103e9366004612943565b61219f565b6040805173ffffffffffffffffffffffffffffffffffffffff9485168152928416602084015292169181019190915260600161019e565b6103cb610433366004612943565b6122e7565b6103ab612421565b6103cb61044e366004612943565b61275b565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e59190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa158015610553573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105779190612bca565b805190915060a81c60ff165b9392505050565b6000806000806000806000806000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610604573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106289190612ac3565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8e8116600483015291909116906335ea6a75906024016101e060405180830381865afa158015610697573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bb9190612c2d565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561072a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074e9190612ac3565b6040517f4417a58300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8e811660048301529190911690634417a58390602401602060405180830381865afa1580156107bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e09190612bca565b6101008301516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f811660048301529293509116906370a0823190602401602060405180830381865afa158015610855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108799190612d50565b6101408301516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f81166004830152929d509116906370a0823190602401602060405180830381865afa1580156108ee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109129190612d50565b6101208301516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f81166004830152929b509116906370a0823190602401602060405180830381865afa158015610987573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ab9190612d50565b6101208301516040517fc634dfaa00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f81166004830152929c5091169063c634dfaa90602401602060405180830381865afa158015610a20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a449190612d50565b6101408301516040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f81166004830152929a50911690631da24f3e90602401602060405180830381865afa158015610ab9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610add9190612d50565b965081604001516fffffffffffffffffffffffffffffffff16945081610120015173ffffffffffffffffffffffffffffffffffffffff1663e78c9b3b8d6040518263ffffffff1660e01b8152600401610b52919073ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b602060405180830381865afa158015610b6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b939190612d50565b6101208301516040517f79ce6b8c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8f811660048301529298509116906379ce6b8c90602401602060405180830381865afa158015610c08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c2c9190612d69565b9350610c498260e0015161ffff168261289190919063ffffffff16565b925050509295985092959850929598565b60008060008060008060008060008060008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610cd9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfd9190612ac3565b73ffffffffffffffffffffffffffffffffffffffff166335ea6a758f6040518263ffffffff1660e01b8152600401610d51919073ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b6101e060405180830381865afa158015610d6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d939190612c2d565b9050806101a0015181610180015182610100015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610df1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e159190612d50565b83610120015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e65573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e899190612d50565b84610140015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ed9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efd9190612d50565b856040015186608001518760a0015188610120015173ffffffffffffffffffffffffffffffffffffffff166390f6fcf26040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f809190612d50565b89602001518a606001518b60c001518b6fffffffffffffffffffffffffffffffff169b508a6fffffffffffffffffffffffffffffffff169a50866fffffffffffffffffffffffffffffffff169650856fffffffffffffffffffffffffffffffff169550846fffffffffffffffffffffffffffffffff169450826fffffffffffffffffffffffffffffffff169250816fffffffffffffffffffffffffffffffff1691509c509c509c509c509c509c509c509c509c509c509c509c505091939597999b5091939597999b565b600061117e7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110de9190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa15801561114c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111709190612bca565b5160d41c64ffffffffff1690565b92915050565b600061117e7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156111f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112189190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa158015611286573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112aa9190612bca565b5160981c61ffff1690565b60008060008060008060008060008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611331573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113559190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8e81166004830152919091169063c44b11f790602401602060405180830381865afa1580156113c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113e79190612bca565b5160ff603082901c169d61ffff8083169e50601083901c81169d50602083901c81169c50604083901c169a508c151599506704000000000000008216151598506708000000000000008216151597506701000000000000008216151596506702000000000000009091161515945092505050565b60008061159b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114f09190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8681166004830152919091169063c44b11f790602401602060405180830381865afa15801561155e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115829190612bca565b51640fffffffff605082901c81169260749290921c1690565b9094909350915050565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611613573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116379190612ac3565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015291909116906335ea6a75906024016101e060405180830381865afa1580156116a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ca9190612c2d565b905080610140015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561171c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117409190612d50565b81610120015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611790573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b49190612d50565b6105839190612d84565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561182c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118509190612ac3565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015291909116906335ea6a75906024016101e060405180830381865afa1580156118bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118e39190612c2d565b905080610100015173ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611935573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105839190612d50565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119eb9190612ac3565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015291909116906335ea6a75906024016101e060405180830381865afa158015611a5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a7e9190612c2d565b61016001519392505050565b600061117e7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611afa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b1e9190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa158015611b8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bb09190612bca565b5160b01c640fffffffff1690565b606060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611c2d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c519190612ac3565b905060008173ffffffffffffffffffffffffffffffffffffffff1663d1946dbc6040518163ffffffff1660e01b8152600401600060405180830381865afa158015611ca0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611ce69190810190612dbe565b90506000815167ffffffffffffffff811115611d0457611d04612ae0565b604051908082528060200260200182016040528015611d4a57816020015b604080518082019091526060815260006020820152815260200190600190039081611d225790505b50905060005b825181101561201f57739f8f72aa9304c8b593d555f12ef6589cc3a579a273ffffffffffffffffffffffffffffffffffffffff16838281518110611d9657611d96612e70565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603611e545760405180604001604052806040518060400160405280600381526020017f4d4b5200000000000000000000000000000000000000000000000000000000008152508152602001848381518110611e1157611e11612e70565b602002602001015173ffffffffffffffffffffffffffffffffffffffff16815250828281518110611e4457611e44612e70565b6020026020010181905250612017565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff16838281518110611e9157611e91612e70565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1603611f0c5760405180604001604052806040518060400160405280600381526020017f45544800000000000000000000000000000000000000000000000000000000008152508152602001848381518110611e1157611e11612e70565b6040518060400160405280848381518110611f2957611f29612e70565b602002602001015173ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015611f7b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611fc19190810190612e9f565b8152602001848381518110611fd857611fd8612e70565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1681525082828151811061200b5761200b612e70565b60200260200101819052505b600101611d50565b509392505050565b60006121957f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612097573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120bb9190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa158015612129573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061214d9190612bca565b51670100000000000000811615159167020000000000000082161515916704000000000000008116151591670800000000000000821615159167100000000000000016151590565b9695505050505050565b6000806000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612210573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122349190612ac3565b6040517f35ea6a7500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff878116600483015291909116906335ea6a75906024016101e060405180830381865afa1580156122a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c79190612c2d565b610100810151610120820151610140909201519097919650945092505050565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612355573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123799190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa1580156123e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061240b9190612bca565b9050610583815167800000000000000016151590565b606060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612490573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124b49190612ac3565b905060008173ffffffffffffffffffffffffffffffffffffffff1663d1946dbc6040518163ffffffff1660e01b8152600401600060405180830381865afa158015612503573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526125499190810190612dbe565b90506000815167ffffffffffffffff81111561256757612567612ae0565b6040519080825280602002602001820160405280156125ad57816020015b6040805180820190915260608152600060208201528152602001906001900390816125855790505b50905060005b825181101561201f5760008473ffffffffffffffffffffffffffffffffffffffff166335ea6a758584815181106125ec576125ec612e70565b60200260200101516040518263ffffffff1660e01b815260040161262c919073ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b6101e060405180830381865afa15801561264a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061266e9190612c2d565b9050604051806040016040528082610100015173ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa1580156126cb573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526127119190810190612e9f565b815260200182610100015173ffffffffffffffffffffffffffffffffffffffff1681525083838151811061274757612747612e70565b6020908102919091010152506001016125b3565b600061117e7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663026b1d5f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156127cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127ef9190612ac3565b6040517fc44b11f700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152919091169063c44b11f790602401602060405180830381865afa15801561285d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128819190612bca565b5167400000000000000016151590565b60408051808201909152600281527f373400000000000000000000000000000000000000000000000000000000000060208201526000906080831061290c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016129039190612f51565b60405180910390fd5b50509051600191821b82011c16151590565b73ffffffffffffffffffffffffffffffffffffffff8116811461294057600080fd5b50565b60006020828403121561295557600080fd5b81356105838161291e565b6000806040838503121561297357600080fd5b823561297e8161291e565b9150602083013561298e8161291e565b809150509250929050565b60005b838110156129b457818101518382015260200161299c565b50506000910152565b600081518084526129d5816020860160208601612999565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600060208083018184528085518083526040925060408601915060408160051b87010184880160005b83811015612aa5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc089840301855281518051878552612a72888601826129bd565b9189015173ffffffffffffffffffffffffffffffffffffffff169489019490945294870194925090860190600101612a30565b509098975050505050505050565b8051612abe8161291e565b919050565b600060208284031215612ad557600080fd5b81516105838161291e565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516101e0810167ffffffffffffffff81118282101715612b3357612b33612ae0565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612b8057612b80612ae0565b604052919050565b600060208284031215612b9a57600080fd5b6040516020810181811067ffffffffffffffff82111715612bbd57612bbd612ae0565b6040529151825250919050565b600060208284031215612bdc57600080fd5b6105838383612b88565b80516fffffffffffffffffffffffffffffffff81168114612abe57600080fd5b805164ffffffffff81168114612abe57600080fd5b805161ffff81168114612abe57600080fd5b60006101e08284031215612c4057600080fd5b612c48612b0f565b612c528484612b88565b8152612c6060208401612be6565b6020820152612c7160408401612be6565b6040820152612c8260608401612be6565b6060820152612c9360808401612be6565b6080820152612ca460a08401612be6565b60a0820152612cb560c08401612c06565b60c0820152612cc660e08401612c1b565b60e0820152610100612cd9818501612ab3565b90820152610120612ceb848201612ab3565b90820152610140612cfd848201612ab3565b90820152610160612d0f848201612ab3565b90820152610180612d21848201612be6565b908201526101a0612d33848201612be6565b908201526101c0612d45848201612be6565b908201529392505050565b600060208284031215612d6257600080fd5b5051919050565b600060208284031215612d7b57600080fd5b61058382612c06565b8082018082111561117e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006020808385031215612dd157600080fd5b825167ffffffffffffffff80821115612de957600080fd5b818501915085601f830112612dfd57600080fd5b815181811115612e0f57612e0f612ae0565b8060051b9150612e20848301612b39565b8181529183018401918481019088841115612e3a57600080fd5b938501935b83851015612e645784519250612e548361291e565b8282529385019390850190612e3f565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215612eb157600080fd5b815167ffffffffffffffff80821115612ec957600080fd5b818401915084601f830112612edd57600080fd5b815181811115612eef57612eef612ae0565b612f2060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601612b39565b9150808252856020828501011115612f3757600080fd5b612f48816020840160208601612999565b50949350505050565b60208152600061058360208301846129bd56fea2646970667358221220038d56f0cf2d1631e41827fbe1d754c997dda7fcd0585ced10ddb2a845c4854a64736f6c63430008180033";

type AaveProtocolDataProviderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AaveProtocolDataProviderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AaveProtocolDataProvider__factory extends ContractFactory {
  constructor(...args: AaveProtocolDataProviderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    addressesProvider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(addressesProvider, overrides || {});
  }
  override deploy(
    addressesProvider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(addressesProvider, overrides || {}) as Promise<
      AaveProtocolDataProvider & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): AaveProtocolDataProvider__factory {
    return super.connect(runner) as AaveProtocolDataProvider__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AaveProtocolDataProviderInterface {
    return new Interface(_abi) as AaveProtocolDataProviderInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AaveProtocolDataProvider {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AaveProtocolDataProvider;
  }
}

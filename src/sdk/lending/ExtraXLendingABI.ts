export const ExtraXLendingABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'GlobalPaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'GlobalUnPaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'LendingInit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
    ],
    name: 'MarketInit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
    ],
    name: 'NewVault',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'reserve',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'reserveId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'eTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'debtTokenAddress',
        type: 'address',
      },
    ],
    name: 'ReserveInit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
    ],
    name: 'VaultDeployerDisabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'deployer',
        type: 'address',
      },
    ],
    name: 'VaultDeployerEnabled',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MAX_RESERVES_NUM',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINIMUM_DEPOSIT_AMOUNT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'calculateUserHealthData',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
            ],
            internalType: 'struct DecimalValueUtil.DecimalValue',
            name: 'collateralValue',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
            ],
            internalType: 'struct DecimalValueUtil.DecimalValue',
            name: 'debtValue',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
            ],
            internalType: 'struct DecimalValueUtil.DecimalValue',
            name: 'ltv',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'decimals',
                type: 'uint8',
              },
            ],
            internalType: 'struct DecimalValueUtil.DecimalValue',
            name: 'liquidationThreshold',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'healthFactor',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.UserHealthData',
        name: 'healthData',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'checkHealthLTV',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'closePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'eTokenAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'vaultDeployer',
        type: 'address',
      },
    ],
    name: 'disableVaultDeployer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'vaultDeployer',
        type: 'address',
      },
    ],
    name: 'enableVaultDeployer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getActivePositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'liquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debt',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.LendingPosition[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getActiveReservesOf',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLendingState',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'frozen',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'nextMarketId',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.LendingState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'debtToken',
        type: 'address',
      },
    ],
    name: 'getMarketAndReserveIdOfDebtToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'eToken',
        type: 'address',
      },
    ],
    name: 'getMarketAndReserveIdOfEToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
    ],
    name: 'getMarketState',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'frozen',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'borrowDisabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'recursiveLoop',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextReserveId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextVaultId',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.MarketState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'marketId',
        type: 'uint256[]',
      },
    ],
    name: 'getMultiMarketStates',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'frozen',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'borrowDisabled',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'recursiveLoop',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextReserveId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'nextVaultId',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.MarketState[]',
        name: 'markets',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'reserveId',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getMultiPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'liquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debt',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.LendingPosition[]',
        name: 'positions',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'reserveId',
        type: 'uint256[]',
      },
    ],
    name: 'getMultiReserveStatus',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'availableLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDebts',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowingIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'exchangeRate',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.ReserveStatus[]',
        name: 'status',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'reserveId',
        type: 'uint256[]',
      },
    ],
    name: 'getMultiReserveStorage',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'paused',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'frozen',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'borrowEnabled',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'collateralEnabled',
                type: 'bool',
              },
              {
                internalType: 'uint16',
                name: 'LTV',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationThreshold',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationBonus',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationProtocolFee',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'reserveProtocoalFee',
                type: 'uint16',
              },
              {
                internalType: 'uint256',
                name: 'supplyCap',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'borrowCap',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'colddownTime',
                type: 'uint256',
              },
            ],
            internalType: 'struct ExtraXTypes.ReserveConfiguration',
            name: 'config',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'utilizationA',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'borrowingRateA',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'utilizationB',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'borrowingRateB',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'maxBorrowingRate',
                type: 'uint16',
              },
            ],
            internalType: 'struct ExtraXTypes.InterestRateConfigBPS',
            name: 'interestRateConfig',
            type: 'tuple',
          },
          {
            internalType: 'uint40',
            name: 'lastUpdateTimestamp',
            type: 'uint40',
          },
          {
            internalType: 'uint256',
            name: 'availableLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowingIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentBorrowingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'underlyingAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'eTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'debtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeReceiver',
            type: 'address',
          },
        ],
        internalType: 'struct ExtraXTypes.ReserveData[]',
        name: 'reserves',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reserveId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getPosition',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'liquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debt',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.LendingPosition',
        name: 'position',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reserveId',
        type: 'uint256',
      },
    ],
    name: 'getReserveStatus',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'availableLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDebts',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowingIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'exchangeRate',
            type: 'uint256',
          },
        ],
        internalType: 'struct ExtraXTypes.ReserveStatus',
        name: 'status',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reserveId',
        type: 'uint256',
      },
    ],
    name: 'getReserveStorage',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'reserveId',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'paused',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'frozen',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'borrowEnabled',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'collateralEnabled',
                type: 'bool',
              },
              {
                internalType: 'uint16',
                name: 'LTV',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationThreshold',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationBonus',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'liquidationProtocolFee',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'reserveProtocoalFee',
                type: 'uint16',
              },
              {
                internalType: 'uint256',
                name: 'supplyCap',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'borrowCap',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'colddownTime',
                type: 'uint256',
              },
            ],
            internalType: 'struct ExtraXTypes.ReserveConfiguration',
            name: 'config',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint16',
                name: 'utilizationA',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'borrowingRateA',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'utilizationB',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'borrowingRateB',
                type: 'uint16',
              },
              {
                internalType: 'uint16',
                name: 'maxBorrowingRate',
                type: 'uint16',
              },
            ],
            internalType: 'struct ExtraXTypes.InterestRateConfigBPS',
            name: 'interestRateConfig',
            type: 'tuple',
          },
          {
            internalType: 'uint40',
            name: 'lastUpdateTimestamp',
            type: 'uint40',
          },
          {
            internalType: 'uint256',
            name: 'availableLiquidity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowingIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentBorrowingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'underlyingAsset',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'eTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'debtTokenAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeReceiver',
            type: 'address',
          },
        ],
        internalType: 'struct ExtraXTypes.ReserveData',
        name: 'reserve',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
    ],
    name: 'getVault',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vault',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'paused',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'frozen',
                type: 'bool',
              },
              {
                internalType: 'address[]',
                name: 'assets',
                type: 'address[]',
              },
              {
                components: [
                  {
                    internalType: 'uint16',
                    name: 'LTV',
                    type: 'uint16',
                  },
                  {
                    internalType: 'uint16',
                    name: 'liquidationThreshold',
                    type: 'uint16',
                  },
                  {
                    internalType: 'uint16',
                    name: 'liquidationBonus',
                    type: 'uint16',
                  },
                  {
                    internalType: 'uint16',
                    name: 'liquidationProtocolFee',
                    type: 'uint16',
                  },
                ],
                internalType: 'struct ExtraXTypes.LoanConfig[]',
                name: 'loanConfig',
                type: 'tuple[]',
              },
              {
                internalType: 'uint256',
                name: 'supplyCap',
                type: 'uint256',
              },
            ],
            internalType: 'struct ExtraXTypes.VaultConfiguration',
            name: 'config',
            type: 'tuple',
          },
        ],
        internalType: 'struct ExtraXTypes.VaultData',
        name: 'vaultData',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'globalPause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'globalUnPaused',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'reserveTokenAddress',
        type: 'address',
      },
    ],
    name: 'initReserve',
    outputs: [
      {
        internalType: 'uint256',
        name: 'reserveId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initializeLendingMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'vaultDeployer',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'newVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'openPosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marketId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'vaultId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: 'assets',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        internalType: 'struct ExtraXLendingSupportedVault.PayToVaultParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'payToVaultCallBack',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'readOnlyCall',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'repay',
    outputs: [
      {
        internalType: 'uint256',
        name: 'repaid',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'vaultId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'underlyingsOfUser',
    outputs: [
      {
        internalType: 'address[]',
        name: 'assets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'reserveAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const

export const ExtraXLendingABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reserveAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "eTokenAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "debtTokenAddress",
        "type": "address"
      }
    ],
    "name": "ReserveInit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reserveTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "EXTRA_GLOBAL_VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WETH",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getExchangeRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getLatestBorrowIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getPosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "reserveId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "debt",
            "type": "uint256"
          }
        ],
        "internalType": "struct LendingTypes.LendingPosition",
        "name": "position",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      }
    ],
    "name": "getReserve",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "data",
                "type": "uint256"
              }
            ],
            "internalType": "struct LendingTypes.ReserveConfigurationMap",
            "name": "configuration",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint16",
                "name": "utilizationA",
                "type": "uint16"
              },
              {
                "internalType": "uint16",
                "name": "borrowingRateA",
                "type": "uint16"
              },
              {
                "internalType": "uint16",
                "name": "utilizationB",
                "type": "uint16"
              },
              {
                "internalType": "uint16",
                "name": "borrowingRateB",
                "type": "uint16"
              },
              {
                "internalType": "uint16",
                "name": "maxBorrowingRate",
                "type": "uint16"
              }
            ],
            "internalType": "struct LendingTypes.InterestRateConfigBPS",
            "name": "interestRateConfig",
            "type": "tuple"
          },
          {
            "internalType": "uint40",
            "name": "lastUpdateTimestamp",
            "type": "uint40"
          },
          {
            "internalType": "uint256",
            "name": "availableLiquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "borrowIndex",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentBorrowRate",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "underlyingTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "eTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "debtTokenAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "treasury",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "reserveFeeFactor",
            "type": "uint16"
          }
        ],
        "internalType": "struct LendingTypes.ReserveData",
        "name": "reserve",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "debtToken",
        "type": "address"
      }
    ],
    "name": "getReserveIdOfDebtToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "eToken",
        "type": "address"
      }
    ],
    "name": "getReserveIdOfEToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "debtToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getUnderlyingDebtOfDebtToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "eToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getUnderlyingLiqudityOfEToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "debtToken",
        "type": "address"
      }
    ],
    "name": "getUnderlyingTokenOfDebtToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "eToken",
        "type": "address"
      }
    ],
    "name": "getUnderlyingTokenOfEToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "reserve",
        "type": "address"
      }
    ],
    "name": "initReserve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addressRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "eTokenImpl",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "debtTokenImpl",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "repay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "reserveId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "eTokenAmount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reserveAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
] as const
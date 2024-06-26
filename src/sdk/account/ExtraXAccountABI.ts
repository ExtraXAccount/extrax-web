export const ExtraXAccountABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolTag',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userTag',
        type: 'uint256',
      },
    ],
    name: 'AccountInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'AccountOwnerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'delegate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'guard',
        type: 'address',
      },
    ],
    name: 'DelegateGuardInit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'guardManager',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementiation',
        type: 'address',
      },
    ],
    name: 'DelegateGuardManagerInit',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
          {
            internalType: 'uint8',
            name: 'operation',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes',
          },
        ],
        internalType: 'struct IExtraXAccount.ExecTransactionParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'execTransaction',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fields',
    outputs: [
      {
        internalType: 'bool',
        name: 'initialized',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'factory',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'delegateGuardManager',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'protoclTag',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'userTag',
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
        name: 'delegate',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'guard',
        type: 'address',
      },
    ],
    name: 'initDelegateGuard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initDelegateGuardManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'protoclTag',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userTag',
            type: 'uint256',
          },
        ],
        internalType: 'struct IExtraXAccount.AccountInitParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'initialize',
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
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'setAccountOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

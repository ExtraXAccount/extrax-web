export const ExtraXAccountFactoryABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
    ],
    name: 'CurrentSingletonSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'singleton',
        type: 'address',
      },
    ],
    name: 'ExtraAccountCreation',
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
        indexed: false,
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'singleton',
        type: 'address',
      },
    ],
    name: 'SingletonAdded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'EXTRA_GLOBAL_VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'accountOfId',
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
        internalType: 'address',
        name: 'singleton',
        type: 'address',
      },
    ],
    name: 'addSingleton',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'addressRegistry',
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
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
    ],
    name: 'createChainSpecificProxyWithNonce',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
      {
        internalType: 'contract IProxyCreationCallback',
        name: 'callback',
        type: 'address',
      },
    ],
    name: 'createProxyWithCallback',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
    ],
    name: 'createProxyWithNonce',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentSingletonVersion',
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
    name: 'getChainId',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'idOfAccount',
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
    inputs: [
      {
        internalType: 'address',
        name: '_addressRegistry',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'singleton',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
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
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'isExtraXAccount',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextAccountId',
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
    name: 'nextSingletonVersion',
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
    inputs: [],
    name: 'proxyCreationCode',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
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
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
    ],
    name: 'setCurrentSingleton',
    outputs: [],
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
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

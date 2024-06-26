export const VELO_V1_POOLS = {
  'vAMM-WETH/USDC': {
    vaultId: '1',
    veloGauge: '0xE2CEc8aB811B648bA7B1691Ce08d5E800Dd0a60a',
    veloPair: '0x79c912FEF520be002c2B6e57EC4324e260f38E50',
    token0: '0x4200000000000000000000000000000000000006',
    token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    stable: false,
    vaultAddress: '0x2f8305faee654E7ccC115C4E33D36421AC3FA33C',
    rewards: [
      '0x4200000000000000000000000000000000000006',
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          stable: false,
        },
      ],
    ],
  },

  'vAMM-VELO/USDC': {
    vaultId: '2',
    veloGauge: '0x6b8EDC43de878Fd5Cd5113C42747d32500Db3873',
    veloPair: '0xe8537b6FF1039CB9eD0B71713f697DDbaDBb717d',
    token0: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    stable: false,
    vaultAddress: '0xbc19F5A7eac4bEF3d0896D8094ae3d6c7D1B418D',
    rewards: [
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    ],
    routes: [[], []],
  },
  'vAMM-OP/USDC': {
    vaultId: '3',
    veloGauge: '0x0299d40E99F2a5a1390261f5A71d13C3932E214C',
    veloPair: '0x47029bc8f5CBe3b464004E87eF9c9419a48018cd',
    token0: '0x4200000000000000000000000000000000000042',
    token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    stable: false,
    vaultAddress: '0x5101081495D209a80F5DBb1C5ecd76Fe137A9eE9',
    rewards: [
      '0x4200000000000000000000000000000000000042',
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          stable: false,
        },
      ],
    ],
  },
  // 'vAMM-USDC/SNX': {
  //   vaultId: '4',
  //   veloGauge: '0x099b3368eb5BBE6f67f14a791ECAeF8bC1628A7F',
  //   veloPair: '0x9056EB7Ca982a5Dd65A584189994e6a27318067D',
  //   token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //   token1: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
  //   stable: false,
  //   vaultAddress: '0x1F5334d6Ee8C87c4ac759e802a048ac0Ae46652a',
  //   rewards: [
  //     '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //     '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },

  // 'sAMM-USDC/USX': {
  //   vaultId: '5',
  //   vaultAddress: '0x5537e79c2c323b1a12E01961d1cC7820c8fCD39a',
  //   veloGauge: '0xAEA343b1EF5ECfa0D252d7078425BaC047cf5d18',
  //   veloPair: '0x5edac6B8EA08d535c01981D75B3361481C0EE999',
  //   token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //   token1: '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
  //   stable: true,
  //   rewards: [
  //     '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //     '0xbfD291DA8A403DAAF7e5E9DC1ec0aCEaCd4848B9',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },
  // 'vAMM-STG/USDC': {
  //   vaultId: '6',
  //   vaultAddress: '0x7809c2768e5a1c0B22B8F6Fdd2A405B69c6AdCf2',
  //   veloGauge: '0x1B87CeA9cFF792f350C363F9ad52Aa031B4EcB37',
  //   veloPair: '0x7892d498F22c9393385F4A798788126F7090d2CC',
  //   token0: '0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97',
  //   token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //   stable: false,
  //   rewards: [
  //     '0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97',
  //     '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },
  // 'sAMM-USDC/DOLA': {
  //   vaultId: '14',
  //   vaultAddress: '0x96FdF1Bd01c613fb2F77988F6054a09e242bfb58',
  //   veloGauge: '0xAFD2c84b9d1cd50E7E18a55e419749A6c9055E1F',
  //   veloPair: '0x6C5019D345Ec05004A7E7B0623A91a0D9B8D590d',
  //   token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //   token1: '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
  //   stable: true,
  //   rewards: [
  //     '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //     '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },

  // 'sAMM-USD+/DOLA': {
  //   vaultId: '7',
  //   vaultAddress: '0x1B83E1bd3C23891700D87c0c6697A8fB9784f2E7',
  //   veloGauge: '0x05d74f34ff651e80b0a1a4bD96D8867626Ac2ddD',
  //   veloPair: '0xa99817d2d286C894F8f3888096A5616d06F20d46',
  //   token0: '0x73cb180bf0521828d8849bc8CF2B920918e23032',
  //   token1: '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
  //   stable: true,
  //   rewards: [
  //     '0x73cb180bf0521828d8849bc8CF2B920918e23032',
  //     '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x8aE125E8653821E851F12A49F7765db9a9ce7384',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },

  // 'vAMM-WETH/KWENTA': {
  //   vaultId: '8',
  //   vaultAddress: '0xD39E5aDE8E2a4f0b39eBaca5634E29AaA947aBD0',
  //   veloGauge: '0xDFc1eCf1Dcb82B1daeA91fdDA2023973447c4309',
  //   veloPair: '0xd65c1120DDF79F827b925C505949E02c5A0D6236',
  //   token0: '0x4200000000000000000000000000000000000006',
  //   token1: '0x920Cf626a271321C151D027030D5d08aF699456b',
  //   stable: false,
  //   rewards: [
  //     '0x4200000000000000000000000000000000000006',
  //     '0x920Cf626a271321C151D027030D5d08aF699456b',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x4200000000000000000000000000000000000006',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },
  // 'vAMM-LYRA/USDC': {
  //   vaultId: '9',
  //   vaultAddress: '0xa801a0D768c6180CF421c33528d8dC4E0bD840e1',
  //   veloGauge: '0x461ba7FA5c2e94EB93e881b7C7E3A7DC4c1CD6b4',
  //   veloPair: '0xDEE1856D7B75Abf4C1bDf986da4e1C6c7864d640',
  //   token0: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  //   token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //   stable: false,
  //   rewards: [
  //     '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  //     '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },
  'vAMM-SONNE/USDC': {
    vaultId: '10',
    vaultAddress: '0xba470Fa584f06738fb6Ea3d79117826B58E2Bf35',
    veloGauge: '0x3786d4419D6B4A902607cEb2BB319Bb336735Df8',
    veloPair: '0xc899C4D73ED8dF2eAd1543AB915888B0Bf7d57a2',
    token0: '0x1DB2466d9F5e10D7090E7152B68d62703a2245F0',
    token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    stable: false,
    rewards: [
      '0x1DB2466d9F5e10D7090E7152B68d62703a2245F0',
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          stable: false,
        },
      ],
    ],
  },
  'vAMM-WETH/OP': {
    vaultId: '11',
    vaultAddress: '0xCEd77A7275041816Aa703d7946B87b06428B57d5',
    veloGauge: '0x2f733b00127449fcF8B5a195bC51Abb73B7F7A75',
    veloPair: '0xcdd41009E74bD1AE4F7B2EeCF892e4bC718b9302',
    token0: '0x4200000000000000000000000000000000000006',
    token1: '0x4200000000000000000000000000000000000042',
    stable: false,
    rewards: [
      '0x4200000000000000000000000000000000000006',
      '0x4200000000000000000000000000000000000042',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x4200000000000000000000000000000000000006',
          stable: false,
        },
      ],
    ],
  },
  // 'vAMM-wstETH/OP': {
  //   vaultId: '12',
  //   vaultAddress: '0x126daCB2ee56DbE0D8811f5B2345eF19a79aEd4a',
  //   veloGauge: '0x212ceDC5c942304D0F8E139B5BFA4e78196B37Ca',
  //   veloPair: '0x3905870E647c97Cb9C8D99Db24384f480531B5b9',
  //   token0: '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb',
  //   token1: '0x4200000000000000000000000000000000000042',
  //   stable: false,
  //   rewards: [
  //     '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb',
  //     '0x4200000000000000000000000000000000000042',
  //     '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   ],
  //   routes: [
  //     [],
  //     [],
  //     [
  //       {
  //         from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //         to: '0x4200000000000000000000000000000000000042',
  //         stable: false,
  //       },
  //     ],
  //   ],
  // },
  // 'vAMM-VELO/OP': {
  //   vaultId: '13',
  //   vaultAddress: '0xbBEc5E4534d05C705E4aBc70D58355D7b2CA0a7d',
  //   veloGauge: '0x1F36f95a02C744f2B3cD196b5e44E749c153D3B9',
  //   veloPair: '0xFFD74EF185989BFF8752c818A53a47FC45388F08',
  //   token0: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
  //   token1: '0x4200000000000000000000000000000000000042',
  //   stable: false,
  //   rewards: ['0x3c8B650257cFb5f272f799F5e2b4e65093a11a05', '0x4200000000000000000000000000000000000042'],
  //   routes: [[], []],
  // },

  'sAMM-USDC/MAI': {
    vaultId: '15',
    vaultAddress: '0xAcD3CD66a6f7773f088FfD8421B57952522Eb32A',
    veloGauge: '0xDF479E13E71ce207CE1e58D6f342c039c3D90b7D',
    veloPair: '0xd62C9D8a3D4fd98b27CaaEfE3571782a3aF0a737',
    token0: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    token1: '0xdFA46478F9e5EA86d57387849598dbFB2e964b02',
    stable: true,
    rewards: [
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0xdFA46478F9e5EA86d57387849598dbFB2e964b02',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          stable: false,
        },
      ],
    ],
  },
  'sAMM-WETH/frxETH': {
    vaultId: '16',
    vaultAddress: '0xFfc7EC33F95ECccE3190e387548F90A219b0e7a8',
    veloGauge: '0x1d8867B65C90DD7B40760A693e309d6CB467947a',
    veloPair: '0x63642a192BAb08B09A70a997bb35B36b9286B01e',
    token0: '0x4200000000000000000000000000000000000006',
    token1: '0x6806411765Af15Bddd26f8f544A34cC40cb9838B',
    stable: true,
    rewards: [
      '0x4200000000000000000000000000000000000006',
      '0x6806411765Af15Bddd26f8f544A34cC40cb9838B',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x4200000000000000000000000000000000000006',
          stable: false,
        },
      ],
    ],
  },
  'vAMM-wUSDR/USDC': {
    vaultId: '17',
    vaultAddress: '0xcE60CBBeA05fAfdAd18f66f299E19FF048567672',
    veloGauge: '0x497E7F08F153FB58f522032B408D7DAfC29FcAC8',
    veloPair: '0x48dce63BacF1C7C839cFa7d4F871ad17c0D30D38',
    token0: '0x340fE1D898ECCAad394e2ba0fC1F93d27c7b717A',
    token1: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    stable: false,
    rewards: [
      '0x340fE1D898ECCAad394e2ba0fC1F93d27c7b717A',
      '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
      '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
    ],
    routes: [
      [],
      [],
      [
        {
          from: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          to: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
          stable: false,
        },
      ],
    ],
  },
}

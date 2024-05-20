import { SupportedChainId } from './chains'

export const CONTRACT_ADDRESSES = {
  [SupportedChainId.OPTIMISM]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: "0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B",
    AddressRegistry: "0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D",

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x6cD0e947024F90Fd70B84bF4d558B74a253f7c4c',
    accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xb72A7F71E0c3Ec96d99888eAF49fc4A6b79FB536',
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    v2: '0xA128Eb2dD8bF17a2D4Fc2aC583fa330b79bA3CB4',
    lend: '0x2a2C3B2a78b6c09a15520C97747bD1c5cbf39431',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',    

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: "0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B",
    AddressRegistry: "0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D",

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x6cD0e947024F90Fd70B84bF4d558B74a253f7c4c',
    accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xb72A7F71E0c3Ec96d99888eAF49fc4A6b79FB536',
  },
  [SupportedChainId.BASE]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0xD12d930Edb56EDcbA54F9E812b450615E9046B73',

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: "0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B",
    AddressRegistry: "0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D",

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x6cD0e947024F90Fd70B84bF4d558B74a253f7c4c',
    accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xb72A7F71E0c3Ec96d99888eAF49fc4A6b79FB536',
  },
} as const

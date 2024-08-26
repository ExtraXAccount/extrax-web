import { SupportedChainId } from './chains'

export const CONTRACT_ADDRESSES = {
  [SupportedChainId.OPTIMISM]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: '0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B',
    AddressRegistry: '0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D',

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x066003814B920356dB0b364104aeEf377fcD405c',
    // accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xEdbF0DcBf7Ce7ba2178cfF50cbC0c008fA679216',

    // new aave contract address
    ACL_MANAGER: '0x8457EE3F16937b2CE0bFeCCb92a93D03E6e0cE3A',
    EXTRA_X_ACCOUNT_FACTORY: '0xc5dC7d922FFD599b6F781E13A1b10113194667e6',
    AAVE_ORCALE: '0x1CC73C8751e3395A15EEeEbFC5787730F1018D64',
    LENDING_POOL_ADDRESS_PROVIDER: '0x422B0F06609184f0137F555F7638e2A158eBe7ba',
    LENDING_POOL_DATA_PROVIDER: '0x64d6E6A164ceB5182071C570B2034d3C6aEa23DD',
    UiPoolDataProviderAddress: '0x6b4fa7Bbd7277Bbeae4f087Ff0171f3E02d81F98',
    LENDING_POOL: '0xb84e886845f9cA5b52c4501A50EfB5A90987fc88',
    WETH_GATEWAY: '0xe743017CA9e1846768F4D62d9c7532d8116B6Dda',
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    v2: '0xA128Eb2dD8bF17a2D4Fc2aC583fa330b79bA3CB4',
    lend: '0x2a2C3B2a78b6c09a15520C97747bD1c5cbf39431',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: '0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B',
    AddressRegistry: '0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D',

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x066003814B920356dB0b364104aeEf377fcD405c',
    // accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xEdbF0DcBf7Ce7ba2178cfF50cbC0c008fA679216',
  },
  [SupportedChainId.BASE]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0xD12d930Edb56EDcbA54F9E812b450615E9046B73',

    // extrax
    BalanceChecker: '0xB1c568e9C3E6bdaf755A60c7418C269eb11524FC',
    MultiSendCallOnly: '0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B',
    AddressRegistry: '0x6Fee695ADaE85701bEC2A4F3ae677344b0ef4e6D',

    // The Following Addresses are registried in AddressRegistry contract
    accountFactory: '0x066003814B920356dB0b364104aeEf377fcD405c',
    // accountSingleton: '0x3b57BEdF69284A1ba15E17175c4b34d656400c0C',
    healthManager: '0x9099a2dC1FE0b801A7eb890C0137F2099B7d4dB6',
    lendingPool: '0xEdbF0DcBf7Ce7ba2178cfF50cbC0c008fA679216',
  },
} as const

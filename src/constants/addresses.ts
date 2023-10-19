import { SupportedChainId } from './chains'

export const CONTRACT_ADDRESSES = {
  [SupportedChainId.OPTIMISM]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
  },
  [SupportedChainId.OPTIMISM_LOCAL_TEST]: {
    v2: '0xA128Eb2dD8bF17a2D4Fc2aC583fa330b79bA3CB4',
    lend: '0x2a2C3B2a78b6c09a15520C97747bD1c5cbf39431',
    dataProvider: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
  },
  [SupportedChainId.BASE]: {
    v2: '0xf9cFB8a62f50e10AdDE5Aa888B44cF01C5957055',
    lend: '0xBB505c54D71E9e599cB8435b4F0cEEc05fC71cbD',
    dataProvider: '0xD12d930Edb56EDcbA54F9E812b450615E9046B73',
  },
}

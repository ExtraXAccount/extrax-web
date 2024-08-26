import { SigningKey, Wallet } from 'ethers'

// import { PRVKEY } from './env'
import { getProvider } from './provider'

const PRVKEY = '0x123'

export function getPrvkey() {
  return 'PRVKEY'
}

export function getSigner(prvkey?: string) {
  if (prvkey) {
    return new SigningKey(prvkey)
  }

  return new SigningKey(PRVKEY)
}

export function getWallet(chain: string, prvkey?: string) {
  const signer = getSigner(prvkey)
  const provider = getProvider(chain)

  return new Wallet(signer, provider)
}

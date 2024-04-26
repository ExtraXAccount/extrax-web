
import { erc20Abi, getContract, Client } from 'viem'
import { Address } from "@/types";
import { CONTRACT_ADDRESSES } from '@/constants/addresses'

import { ExtraXLendingABI } from './ExtraXLendingABI'
import { MultiSendCallOnlyABI } from './MultiSendCallOnlyABI'
import { LendingConfig } from './lending-pool'
import { defaultChainId } from '@/constants'
import { SupportedChainId } from '@/constants/chains'

export class LendingManager {
  public chainId = defaultChainId
  public account: Address
  public publicClient: Client
  public walletClient: Client

  constructor(chainId: SupportedChainId, publicClient, walletClient, account?: Address, ) {
    if (chainId && chainId in SupportedChainId) {
      this.chainId = chainId
    }
    if (account) {
      this.account = account
    }
    if (publicClient) {
      this.publicClient = publicClient
    }
    if (walletClient) {
      this.walletClient = walletClient
    }
  }

  public getExtraXLendingContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.lendingPool,
      abi: ExtraXLendingABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public getErc20Contract(erc20TokenAddr: Address) {
    return getContract({
      address: erc20TokenAddr,
      abi: erc20Abi,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public getMultiSendCallOnlyContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.MultiSendCallOnly,
      abi: MultiSendCallOnlyABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public async getPoolStatus(reserveId: bigint) {
    const res = await this.getExtraXLendingContract().read.getReserve([reserveId])
    console.log('getPoolStatus :>> ', res)
    return res
  }

  public async approve(account: Address, reserveId: bigint, amount: bigint) {
    console.log('deposit lending :>> ', [reserveId, amount, account])
    const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const erc20Contract = this.getErc20Contract(lendConfig.underlyingTokenAddress)

    await erc20Contract.write.approve([account, amount])
  }
}

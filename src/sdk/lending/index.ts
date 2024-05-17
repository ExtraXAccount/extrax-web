import { WalletClient, encodeFunctionData, erc20Abi, getContract, PublicClient, Client, toBytes, encodePacked } from 'viem'
import { Address } from "@/types";
import { CONTRACT_ADDRESSES } from '@/constants/addresses'

import { ExtraXLendingABI } from './ExtraXLendingABI'
import { MultiSendCallOnlyABI } from './MultiSendCallOnlyABI'
import { LendingConfig } from './lending-pool'
import { defaultChainId } from '@/constants'
import { SupportedChainId } from '@/constants/chains'
import { HealthManagerABI } from '../account/HealthManagerABI';
import { ERC20ABI } from '../abis/erc20ABI';
import { ExtraXAccountABI } from '../account/ExtraXAccountABI';
import { buildSignedMetaTransaction } from './build-safe-transaction';
import { Hex } from 'viem';
import { HealthManagerConfig } from './health-manager-config';
import { isWETH } from '../utils/token';
import { calculateGasLimit } from '../utils/calculateGasMargin';

export interface MetaTransaction {
  to: Address;
  value: string | number | bigint;
  data: Address;
  operation: number;
}

export function encodeMetaTransaction(tx: MetaTransaction) {
  const data = toBytes(tx.data);
  const encoded = encodePacked(
    ["uint8", "address", "uint256", "uint256", "bytes"],
    [tx.operation, tx.to, BigInt(tx.value), BigInt(data.length), tx.data]
  );
  return encoded.slice(2);
}

export function encodeMultiSend(txs: MetaTransaction[]): Hex {
  return `0x${txs.map((tx) => encodeMetaTransaction(tx)).join('')}`;
}

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

  public async requireAllowance(tokenAddress: Address, targetAddress: Address, amount: bigint, useNativeETH = true) {
    if (useNativeETH && isWETH(this.chainId, tokenAddress)) {
      return false
    }
    const tokenContract = getContract({
      address: tokenAddress,
      abi: ERC20ABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
    console.log('readallowance :>> ', [this.account, targetAddress]);
    const res = await tokenContract.read.allowance([this.account, targetAddress])
    console.log('readallowance :>> ', res);
    return res < amount
  }

  public async approve(address: Address, tokenAddr: Address, amount: bigint) {
    console.log('deposit lending :>> ', [tokenAddr, amount, address])
    // const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const erc20Contract = this.getErc20Contract(tokenAddr)

    await erc20Contract.write.approve([address, amount])
  }

  public healthManagerContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.healthManager,
      abi: HealthManagerABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public getExtraXAccountContract() {
    return getContract({
      address: CONTRACT_ADDRESSES[this.chainId]?.accountSingleton,
      abi: ExtraXAccountABI,
      client: {
        public: this.publicClient,
        wallet: this.walletClient,
      }
    })
  }

  public async buildSetAsCollateralTx(assetId: bigint, chainId?: SupportedChainId) {
    const funcData = encodeFunctionData({
      abi: HealthManagerABI,
      functionName: 'setAsCollateral',
      args: [
        assetId,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.healthManager,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }

  public async buildDepositToAccountTx(
    tokenAddress: Address,
    safeAccount: Address,
    amount: bigint,
  ) {
    const funcData = encodeFunctionData({
      abi: ERC20ABI,
      functionName: 'transferFrom',
      args: [
        this.account,
        safeAccount,
        amount,
      ]
    })
    let metaTx = {
      to: tokenAddress,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }

  public async buildApproveLendingTx(
    tokenAddress: Address,
    amount: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ERC20ABI,
      functionName: 'approve',
      args: [
        CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
        amount,
      ]
    })
    let metaTx = {
      to: tokenAddress,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }
  
  public async buildDepositToLendingTx(
    reserveId: bigint,
    amount: bigint,
    nativeETH?: boolean,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'deposit',
      args: [
        reserveId,
        amount,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: nativeETH ? amount : 0n,
    };
    return metaTx;
  }

  public async multiSend(
    safeAccount: Address,
    transactions: { to: Address; value: bigint; data: Address }[]
  ) {
    let nonce = await this.getExtraXAccountContract().read.nonce();
    
    console.log('nonce :>> ', nonce);
    let signedSafeTransactions: MetaTransaction[] = [];
  
    for (let tx of transactions) {
      console.log(tx);
  
      signedSafeTransactions.push(
        await buildSignedMetaTransaction(this.publicClient, this.walletClient, this.account, safeAccount, tx, nonce++)
      );
    }
  
    let encodedMultiSendTx = encodeMultiSend(signedSafeTransactions);
  
    console.log('encodedMultiSendTx :>> ', signedSafeTransactions, encodedMultiSendTx);
    const multiSendCall = this.getMultiSendCallOnlyContract()

    const estimateFee = await multiSendCall.estimateGas.multiSend([encodedMultiSendTx]);
    console.log('estimateFee :>> ', estimateFee);

    const res = await multiSendCall.write.multiSend([encodedMultiSendTx], {
      gasLimit: calculateGasLimit(estimateFee),
    });
  
    return res
  }

  public async depositToLending(safeAccount: Address, reserveId: bigint, amount: bigint, useNativeETH = true) {
    console.log('depositToLending :>> ', {safeAccount, reserveId, amount, useNativeETH});
    // Apprve the Account transfer assets from user's wallet
    // Note: This tx cannot be batched to a multiSend Transaction
    console.log("approve ...");
    const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const token = lendConfig.name
    const requireAllowance =  await this.requireAllowance(lendConfig.underlyingTokenAddress, safeAccount, amount, useNativeETH)
    console.log('requireAllowance :>> ', requireAllowance);
    if (requireAllowance) {
      await this.approve(
        safeAccount,
        lendConfig.underlyingTokenAddress,
        amount
      );
    }
  
    let transactions: { to: Hex; data: Hex; value: bigint }[] = [];

    console.log('assetId :>> ', HealthManagerConfig[this.chainId].assets[`${token}_BASIC_ASSET`].assetId);
    transactions.push(
      await this.buildSetAsCollateralTx(
        HealthManagerConfig[this.chainId].assets[`${token}_BASIC_ASSET`].assetId
      )
    );
  
    transactions.push(
      await this.buildSetAsCollateralTx(
        HealthManagerConfig[this.chainId].assets[`${token}_ETOKEN_ASSET`].assetId
      )
    );
  
    transactions.push(
      await this.buildDepositToAccountTx(
        LendingConfig[this.chainId][token].underlyingTokenAddress,
        safeAccount,
        amount
      )
    );
  
    transactions.push(
      await this.buildApproveLendingTx(
        LendingConfig[this.chainId][token].underlyingTokenAddress,
        amount
      )
    );
  
    transactions.push(
      await this.buildDepositToLendingTx(
        LendingConfig[this.chainId][token].reserveId,
        amount
      )
    );
  
    console.log("(MultiSend) deposit to lending pool ...", {
      safeAccount,
      transactions,
    });
    const res = await this.multiSend(safeAccount, transactions);
    console.log('multiSend res :>> ', res);
  }

  public async buildWithdrawTransaction(
    reserveId: bigint,
    eTokenAmount: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'withdraw',
      args: [
        reserveId,
        eTokenAmount,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }
  public async withdraw(safeAccount: Address, reserveId: bigint, amount: bigint) {
    console.log('withdraw :>> ', {safeAccount, reserveId, amount});

    let transactions: { to: Hex; data: Hex; value: bigint }[] = [];
    transactions.push(
      await this.buildWithdrawTransaction(
        reserveId,
        amount,
      )
    );

    console.log("(MultiSend) withraw lending pool ...", {
      safeAccount,
      transactions,
    });
    const res = await this.multiSend(safeAccount, transactions);
    console.log('multiSend res :>> ', res);
  }

  public async buildActivateUserDebtTx(
    userAccount: Address,
    reserveId: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: HealthManagerABI,
      functionName: 'activateUserDebt',
      args: [
        userAccount,
        reserveId,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.healthManager,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }
  public async buildBorrowTransaction(
    reserveId: bigint,
    eTokenAmount: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'borrow',
      args: [
        reserveId,
        eTokenAmount,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }
  public async borrow(safeAccount: Address, reserveId: bigint, amount: bigint, debtId: bigint) {
    console.log('borrow :>> ', {safeAccount, reserveId, amount});

    let transactions: { to: Hex; data: Hex; value: bigint }[] = [];
    transactions.push(await this.buildActivateUserDebtTx(this.account, debtId));
    transactions.push(
      await this.buildBorrowTransaction(
        reserveId,
        amount,
      )
    );

    console.log("(MultiSend) borrow lending pool ...", {
      safeAccount,
      transactions,
    });
    const res = await this.multiSend(safeAccount, transactions);
    console.log('multiSend res :>> ', res);
  }

  public async buildRepayTransaction(
    reserveId: bigint,
    eTokenAmount: bigint,
    chainId?: SupportedChainId
  ) {
    const funcData = encodeFunctionData({
      abi: ExtraXLendingABI,
      functionName: 'repay',
      args: [
        reserveId,
        eTokenAmount,
      ]
    })
    let metaTx = {
      to: CONTRACT_ADDRESSES[chainId || this.chainId]?.lendingPool,
      data: funcData,
      value: 0n,
    };
    return metaTx;
  }
  public async repay(safeAccount: Address, reserveId: bigint, amount: bigint) {
    console.log('repay :>> ', {safeAccount, reserveId, amount});
    const lendConfig: any = Object.values(LendingConfig[this.chainId]).find((item: any) => item.reserveId === reserveId)
    const token = lendConfig.name

    let transactions: { to: Hex; data: Hex; value: bigint }[] = [];
    transactions.push(
      await this.buildApproveLendingTx(
        LendingConfig[this.chainId][token].underlyingTokenAddress,
        amount
      )
    );
    transactions.push(
      await this.buildRepayTransaction(
        reserveId,
        amount,
      )
    );

    console.log("(MultiSend) repay lending pool ...", {
      safeAccount,
      transactions,
    });
    const res = await this.multiSend(safeAccount, transactions);
    console.log('multiSend res :>> ', res);
  }
}

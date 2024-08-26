import { ethers } from 'ethers'

import { ReserveAssets } from '../config'

export function generateTransferFromTx(
  tokenAddress: string,
  from: string,
  to: string,
  amount: ethers.BigNumberish
): { to: string; data: string } {
  // ERC20 ABI, only the approve function is needed
  const erc20Abi = [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function transferFrom(address from, address to, uint256 value) external returns (bool)',
  ]

  // Create an instance of ethers.utils.Interface with the ERC20 ABI
  const erc20Interface = new ethers.Interface(erc20Abi)

  // Encode the approve function call
  const data = erc20Interface.encodeFunctionData('transferFrom', [from, to, amount])

  // Return the transaction object
  return {
    to: tokenAddress,
    data: data,
  }
}

export function generateWrapEtherTx(chain: string, amount: string): { to: string; data: string; value: string } {
  const WETH = ReserveAssets[chain]['WETH'].Reserve

  const wethAbi = ['function deposit() external payable', 'function withdraw(uint wad) external']

  const wethInterface = new ethers.Interface(wethAbi)

  const data = wethInterface.encodeFunctionData('deposit', [])

  return {
    to: WETH,
    data: data,
    value: amount,
  }
}

import { Contract, ContractTransactionResponse, ethers, JsonRpcSigner } from 'ethers'

export function generateApproveTx(
  tokenAddress: string,
  spender: string,
  amount: ethers.BigNumberish
): { to: string; data: string } {
  // ERC20 ABI, only the approve function is needed
  const erc20Abi = ['function approve(address spender, uint256 amount) external returns (bool)']

  // Create an instance of ethers.utils.Interface with the ERC20 ABI
  const erc20Interface = new ethers.Interface(erc20Abi)

  // Encode the approve function call
  const data = erc20Interface.encodeFunctionData('approve', [spender, amount])

  // Return the transaction object
  return {
    to: tokenAddress,
    data: data,
  }
}

export async function approve(
  signer: JsonRpcSigner,
  tokenAddress: string,
  spender: string,
  amount: ethers.BigNumberish
) {
  // ERC20 ABI, only the approve function is needed
  const erc20Abi = ['function approve(address spender, uint256 amount) external returns (bool)']

  // Create an instance of ethers.utils.Interface with the ERC20 ABI
  const erc20Interface = new ethers.Interface(erc20Abi)
  ContractTransactionResponse
  const tokenContract = new Contract(tokenAddress, erc20Interface, signer)

  const tx = await tokenContract.approve(spender, amount)

  console.log(tx)
  const res = tx.wait()
  return res
}

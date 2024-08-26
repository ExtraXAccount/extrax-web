// import dotenv from 'dotenv'

// dotenv.config()

const RPC_URL_OP = 'https://virtual.optimism.rpc.tenderly.co/77b8e846-c004-4697-8dab-7ee0e30df151'
const RPC_URL_BASE = ''
const SUBGRAPH_OP = ''
const SUBGRAPH_BASE = ''

// export const PRVKEY = process.env.PRVKEY!

export const RPC_URL: { [key: string]: string } = {
  optimism: RPC_URL_OP,
  base: RPC_URL_BASE,
}

export const SUBGRAPH_URL: { [key: string]: string } = {
  optimism: SUBGRAPH_OP,
  base: SUBGRAPH_BASE,
}

export const ChainId: { [key: string]: number } = {
  optimism: 10,
  base: 8453,
}

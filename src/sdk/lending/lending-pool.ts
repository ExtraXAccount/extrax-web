import { SupportedChainId } from "@/constants/chains";

export const LendingConfig = {
  [SupportedChainId.OPTIMISM]: {
    WETH: {
      name: "WETH",
      underlyingTokenAddress: "0x4200000000000000000000000000000000000006",
      reserveId: 1n,
      eToken: "0x957d3315cCFDE114E5b797339Defa194fb296BCd",
      debtToken: "0x5f24E8F4f285d28C26A6A06B1446662d208976dd",
      decimals: 18,
    },
    "USDC.e": {
      name: "USDC.e",
      underlyingTokenAddress: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      reserveId: 2n,
      eToken: "0x8C2e1dC189fe8e018352de12c9b2C46B78e3110C",
      debtToken: "0x79d3D95C9a953B20444E8de0c24407181C121B30",
      decimals: 6,
    },
    OP: {
      name: "OP",
      underlyingTokenAddress: "0x4200000000000000000000000000000000000042",
      reserveId: 3n,
      eToken: "0x3D675ffecaAc199383168D5B7082b28Ba22B2369",
      debtToken: "0x55b9DD7B0d177F3a454f883c883FE8bf2eCedfF8",
      decimals: 18,
    },
  },
} as const

import { defineChain } from 'viem'

export const PharosDevnet = defineChain({
  id: 50002,
  name: 'PharosDevnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://devnet.dplabs-internal.com'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://pharosscan.xyz/' },
  },
  testnet: true,
})
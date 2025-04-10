import { http, createConfig } from 'wagmi'
import { PharosDevnet } from './PharosDevnet'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [PharosDevnet],
  connectors: [
    metaMask(),
  ],
  transports: {
    [PharosDevnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

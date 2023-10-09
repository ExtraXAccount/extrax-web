import { createContext, ReactNode, useContext } from 'react'

import useWagmi from '@/hooks/useWagmi'

export const WagmiContext = createContext<ReturnType<typeof useWagmi>>(null)

export default function WagmiContextProvider({ children }: { children: ReactNode }) {
  const wagmiCtx = useWagmi()
  return <WagmiContext.Provider value={wagmiCtx}>{children}</WagmiContext.Provider>
}

export function useWagmiCtx() {
  const wagmiCtx = useContext(WagmiContext)
  return wagmiCtx
}

import React, { createContext, ReactNode, ReactElement } from 'react'
import { RootStore } from '../stores'

export const StoreContext = createContext<RootStore>({} as RootStore)

type StoreComponent = {
  store: RootStore
  children: ReactNode
}

export const StoreProvider: React.FC<StoreComponent> = ({
  children,
  store,
}: StoreComponent): ReactElement => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

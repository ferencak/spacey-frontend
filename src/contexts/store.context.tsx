import { FC, createContext, useState } from 'react'

import { IGlobalStore, IStore, IStoreProviderProps } from 'interfaces/IStore'

export const StoreDefaultValues: IStore = {
  store: {
    astronauts: [],
    astronautsFiltered: [],
  },
  setStore: (_store: IGlobalStore) => {},
  resetStore: () => {},
}

export const StoreContext = createContext<IStore>(StoreDefaultValues)

export const StoreProvider: FC<IStoreProviderProps> = ({ children }): JSX.Element => {
  const [store, setStoreState] = useState<IGlobalStore>(StoreDefaultValues.store)

  const setStore = (_store: IGlobalStore): void => {
    return setStoreState({ ...store, ..._store })
  }

  const resetStore = (): void => {
    return setStoreState(StoreDefaultValues.store)
  }

  return <StoreContext.Provider value={{ store, setStore, resetStore }}>{children}</StoreContext.Provider>
}

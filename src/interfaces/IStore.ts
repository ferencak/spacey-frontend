import { IAstronaut } from './IAstronaut'

export interface IGlobalStore {
  astronauts: IAstronaut[]
  astronautsFiltered: IAstronaut[]
}

export interface IStore {
  store: IGlobalStore
  setStore: (_store: IGlobalStore) => void
  resetStore: () => void
}

export interface IStoreProviderProps {
  children: React.ReactNode
}

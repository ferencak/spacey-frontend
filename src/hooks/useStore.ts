import { useContext } from 'react'

import { IStore } from 'interfaces/IStore'

import { StoreContext } from 'contexts/store.context'

export const useStore = () => useContext<IStore>(StoreContext)

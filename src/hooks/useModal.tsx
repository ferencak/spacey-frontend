import { useContext } from 'react'

import { IModalProviderProps, ModalContext } from 'contexts/modal.context'

export const useModal = () => useContext<IModalProviderProps>(ModalContext)

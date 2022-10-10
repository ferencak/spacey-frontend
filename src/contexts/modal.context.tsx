import { FC, createContext, useState } from 'react'

import ModalWrapper from 'components/modal/ModalWrapper'

export interface IModalProviderProps {
  showModal: (_modal: any) => void
  hideModal: () => void
  isModalActive: boolean
}

const ModalProviderDefaults: IModalProviderProps = {
  showModal: (_modal: any) => {},
  hideModal: () => {},
  isModalActive: false,
}

export const ModalContext = createContext<IModalProviderProps>(ModalProviderDefaults)

export const ModalProvider: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  const [modal, showModal] = useState<any>(null)
  const [isModalActive] = useState<boolean>(modal !== null)
  const hideModal = (): void => showModal(null)

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        isModalActive,
      }}
    >
      {modal && <ModalWrapper>{modal}</ModalWrapper>}
      {children}
    </ModalContext.Provider>
  )
}

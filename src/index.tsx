import React from 'react'
import ReactDOM from 'react-dom/client'

import AppLayout from 'layouts/AppLayout'

import { ModalProvider } from 'contexts/modal.context'
import { StoreProvider } from 'contexts/store.context'

import './assets/styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StoreProvider>
    <ModalProvider>
      <AppLayout />
    </ModalProvider>
  </StoreProvider>
)

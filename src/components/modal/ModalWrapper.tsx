import { FC } from 'react'

interface IModalWrapperProps {
  children: JSX.Element | JSX.Element[]
}

const ModalWrapper: FC<IModalWrapperProps> = ({ children }): JSX.Element => (
  <div
    id="defaultModal"
    tabIndex={-1}
    className="absolute flex z-50 w-full h-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div className="relative bg-white rounded-lg shadow">{children}</div>
    </div>
  </div>
)

export default ModalWrapper

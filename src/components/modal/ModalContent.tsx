import { FC } from 'react'

interface IModalContentProps {
  children: JSX.Element
}

const ModalContent: FC<IModalContentProps> = ({ children }): JSX.Element => <div className="p-6">{children}</div>

export default ModalContent

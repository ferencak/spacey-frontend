import { FC } from 'react'

interface IBoxHeaderProps {
  children: JSX.Element | JSX.Element[]
}

const BoxHeader: FC<IBoxHeaderProps> = ({ children }): JSX.Element => (
  <header className="px-5 py-4 w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-20 flex flex-row items-center justify-between">
    {children}
  </header>
)

export default BoxHeader

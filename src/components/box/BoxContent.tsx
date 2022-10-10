import { FC } from 'react'

interface IBoxContentProps {
  children: JSX.Element
}

const BoxContent: FC<IBoxContentProps> = ({ children }): JSX.Element => (
  <div className="flex flex-col w-full">{children}</div>
)

export default BoxContent

import { FC } from 'react'

interface IBoxWrapperProps {
  children: JSX.Element | JSX.Element[]
}

const BoxWrapper: FC<IBoxWrapperProps> = ({ children }): JSX.Element => (
  <div className="flex flex-col gap-2 w-full">{children}</div>
)

export default BoxWrapper

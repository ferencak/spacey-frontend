import { FC } from 'react'

interface IButtonProps {
  text: string
  icon?: JSX.Element
  className?: string
  isLoading?: boolean
  onClick: () => void
}

const Button: FC<IButtonProps> = ({ text, icon, className, isLoading, onClick }): JSX.Element => (
  <button
    className={`${
      !className
        ? 'inline-flex gap-1 items-center px-4 py-1 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
        : className
    }`}
    onClick={() => !isLoading && onClick()}
  >
    {text}
    {icon}
  </button>
)

export default Button

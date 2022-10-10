import { FC } from 'react'

interface IInputProps {
  type: 'text' | 'password' | 'email' | 'number' | 'date'
  placeholder: string
  label?: string
  className?: string
  defaultValue?: string
  spellCheck?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInputProps> = ({
  type,
  placeholder,
  label,
  className,
  defaultValue,
  spellCheck = false,
  onChange,
}): JSX.Element => (
  <div>
    {label && <label className="block text-sm text-gray-400">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      spellCheck={spellCheck}
      className={`px-2 py-1 text-sm w-34 border border-gray-200 rounded-md focus:border-gray-400 duration-300 outline-none ${className}`}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event)}
    />
  </div>
)

export default Input

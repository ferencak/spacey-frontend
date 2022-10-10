import { FC } from 'react'

interface ISelectProps {
  placeholder: string
  label?: string
  children: JSX.Element | JSX.Element[]
  className?: string
  defaultValue?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<ISelectProps> = ({ placeholder, label, children, className, defaultValue, onChange }): JSX.Element => {
  return (
    <div>
      {label && <label className="block text-sm text-gray-400">{label}</label>}
      <select
        defaultValue={defaultValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event)}
        className={`px-2 py-1 text-sm w-34 border border-gray-200 rounded-md focus:border-gray-400 duration-300 outline-none ${className}`}
      >
        <option value="" selected disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  )
}

export default Select

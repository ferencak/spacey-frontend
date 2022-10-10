import { FC, useState } from 'react'
import { IoRocketSharp } from 'react-icons/io5'

const TopBar: FC = (): JSX.Element => {
  const [logoEasterToggled, setLogoEasterToggled] = useState<boolean>(false)

  return (
    <div className="flex flex-row w-full items-center justify-center md:justify-start py-8 md:py-12">
      <div className="flex flex-col items-start text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 select-none">
        <div className="inline-flex">
          <h1 className="font-bold">Space</h1>
          <span
            className="font-medium cursor-pointer hover:text-pink-700 duration-300"
            onClick={() => setLogoEasterToggled(!logoEasterToggled)}
          >
            {logoEasterToggled ? 'X' : 'Y'}
          </span>
        </div>
        <h1 className="inline-flex gap-1 items-center text-sm font-medium">
          <IoRocketSharp className="text-blue-600" /> Fides Mission
        </h1>
      </div>
    </div>
  )
}

export default TopBar

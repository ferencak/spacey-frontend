import { FC, useEffect, useState } from 'react'

import Button from 'components/button/Button'
import Input from 'components/form/Input'
import Select from 'components/form/Select'
import LoadingContainer from 'components/loading-container/LoadingContainer'
import ModalContent from 'components/modal/ModalContent'
import ModalHeader from 'components/modal/ModalHeader'
import ModalWrapper from 'components/modal/ModalWrapper'

import { IAstronaut } from 'interfaces/IAstronaut'

import { Superpower } from 'enums/superpower.enum'

import useApi from 'hooks/useApi'
import { useModal } from 'hooks/useModal'
import { useStore } from 'hooks/useStore'

const AddAstronautModal: FC = (): JSX.Element => {
  const [astronautData, setAstronautData] = useState<IAstronaut>({
    firstName: '',
    lastName: '',
    birthDate: '',
    superPower: '',
  })

  const { setStore } = useStore()
  const { hideModal } = useModal()

  const onSubmit = (): Promise<void> => addAstronautCall()

  /**
   * Add astronaut
   */
  const {
    call: addAstronautCall,
    response: addAstronautResponse,
    loading: addAstronautLoading,
  } = useApi({
    url: '/create-astronaut',
    method: 'POST',
    data: astronautData,
  })

  useEffect(() => {
    if (!addAstronautResponse) return
    if (addAstronautResponse.status === 'OK') refreshAstronautsCall()
  }, [addAstronautResponse])

  /**
   * Refresh astronauts
   */
  const {
    call: refreshAstronautsCall,
    response: refreshAstronautsResponse,
    loading: refreshAstronautsLoading,
  } = useApi({
    url: '/astronauts',
    method: 'GET',
  })

  useEffect(() => {
    if (!refreshAstronautsResponse) return
    if (refreshAstronautsResponse.status === 'OK') {
      setStore({ astronauts: refreshAstronautsResponse.data, astronautsFiltered: refreshAstronautsResponse.data })
      return hideModal()
    }
  }, [refreshAstronautsResponse])

  return (
    <LoadingContainer isLoading={addAstronautLoading || refreshAstronautsLoading}>
      <ModalWrapper>
        <ModalHeader title="Add Astronaut" />
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-2 md:gap-5 justify-between">
              <Input
                label="First Name"
                placeholder="Enter first name..."
                type="text"
                className="w-full"
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  setAstronautData({
                    ...astronautData,
                    firstName: event.target.value,
                  })
                }
              />
              <Input
                label="Last Name"
                placeholder="Enter last name..."
                type="text"
                className="w-full"
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  setAstronautData({
                    ...astronautData,
                    lastName: event.target.value,
                  })
                }
              />
              <Input
                label="Birth date"
                placeholder="Name"
                type="date"
                className="w-full"
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  setAstronautData({
                    ...astronautData,
                    birthDate: event.target.value,
                  })
                }
              />
              <Select
                placeholder="Select superpower"
                label="Superpower"
                className="w-full"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
                  setAstronautData({
                    ...astronautData,
                    superPower: event.target.value,
                  })
                }
              >
                {Superpower.map((superpower: string) => (
                  <option key={superpower} value={superpower.toLowerCase()}>
                    {superpower.charAt(0).toUpperCase() + superpower.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end items-center pt-4 space-x-3 rounded-b border-t border-gray-200 dark:border-gray-600">
              <Button
                text="Create"
                className="text-white bg-blue-700 hover:bg-blue-800 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 !py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                isLoading={addAstronautLoading || refreshAstronautsLoading}
                onClick={onSubmit}
              />
            </div>
          </div>
        </ModalContent>
      </ModalWrapper>
    </LoadingContainer>
  )
}

export default AddAstronautModal

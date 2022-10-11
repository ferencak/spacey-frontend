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

interface IEditAstronautModalProps {
  astronaut: IAstronaut
}

const EditAstronautModal: FC<IEditAstronautModalProps> = ({ astronaut }): JSX.Element => {
  const [astronautData, setAstronautData] = useState<IAstronaut>({
    id: astronaut.id,
    firstName: astronaut.firstName,
    lastName: astronaut.lastName,
    birthDate: astronaut.birthDate,
    superPower: astronaut.superPower,
  })

  const { setStore } = useStore()
  const { hideModal } = useModal()

  const onSubmit = (): Promise<void> => updateAstronautCall()
  const onDelete = (): Promise<void> => deleteAstronautCall()

  /**
   * Update astronaut
   */
  const {
    call: updateAstronautCall,
    response: updateAstronautResponse,
    loading: updateAstronautLoading,
  } = useApi({
    url: `/astronaut/update/${astronautData.id}`,
    method: 'PUT',
    data: astronautData,
  })

  useEffect(() => {
    if (!updateAstronautResponse) return
    if (updateAstronautResponse.status === 'OK') refreshAstronautsCall()
  }, [updateAstronautResponse])

  /**
   * Delete astronaut
   */
  const {
    call: deleteAstronautCall,
    response: deleteAstronautResponse,
    loading: deleteAstronautLoading,
  } = useApi({
    url: `/astronaut/delete/${astronautData.id}`,
    method: 'DELETE',
  })

  useEffect(() => {
    if (!deleteAstronautResponse) return
    if (deleteAstronautResponse.status === 'OK') refreshAstronautsCall()
  }, [deleteAstronautResponse])

  /**
   * Refetch astronauts
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
    <LoadingContainer isLoading={updateAstronautLoading || deleteAstronautLoading || refreshAstronautsLoading}>
      <ModalWrapper>
        <ModalHeader title="Edit Astronaut" />
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-2 md:gap-5 justify-between">
              <Input
                label="First Name"
                placeholder="Enter first name..."
                type="text"
                className="w-full"
                defaultValue={astronautData.firstName}
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
                defaultValue={astronautData.lastName}
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
                defaultValue={new Date(astronautData.birthDate).toISOString().split('T')[0]}
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
                defaultValue={astronautData.superPower.toLowerCase()}
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
            <div className="flex justify-between items-center pt-4 space-x-3 rounded-b border-t border-gray-200">
              <Button
                text="Delete"
                className="text-white bg-red-600 hover:bg-red-700 duration-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                isLoading={deleteAstronautLoading || refreshAstronautsLoading}
                onClick={onDelete}
              />
              <Button
                text="Save"
                className="text-white bg-blue-700 hover:bg-blue-800 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 !py-2.5 text-center"
                isLoading={updateAstronautLoading || refreshAstronautsLoading}
                onClick={onSubmit}
              />
            </div>
          </div>
        </ModalContent>
      </ModalWrapper>
    </LoadingContainer>
  )
}

export default EditAstronautModal

import { FC, useEffect } from 'react'
import { GoPlusSmall } from 'react-icons/go'

import BoxWrapper from 'components/box/Box'
import BoxContent from 'components/box/BoxContent'
import BoxHeader from 'components/box/BoxHeader'
import Button from 'components/button/Button'
import Input from 'components/form/Input'
import LoadingContainer from 'components/loading-container/LoadingContainer'
import Table from 'components/table/Table'
import TopBar from 'components/top-bar/TopBar'

import AddAstronautModal from 'modals/AddAstronautModal'
import EditAstronautModal from 'modals/EditAstronautModal'

import { IAstronaut } from 'interfaces/IAstronaut'

import useApi from 'hooks/useApi'
import { useModal } from 'hooks/useModal'
import { useStore } from 'hooks/useStore'

const AppLayout: FC = (): JSX.Element => {
  const { store, setStore } = useStore()
  const { showModal } = useModal()

  const { response, loading } = useApi({
    url: '/astronauts',
    method: 'GET',
    autoFetch: true,
  })

  useEffect(() => {
    if (!response) return
    setStore({ astronauts: response.data, astronautsFiltered: response.data })
  }, [response])

  const filterAstronauts = (inputValue: string): void => {
    setStore({
      ...store,
      astronautsFiltered: store.astronauts.filter((astronaut: IAstronaut) => {
        return Object.values(astronaut).some((value: string) => {
          return String(value).toLowerCase().includes(inputValue.toLowerCase())
        })
      }),
    })
  }

  return (
    <LoadingContainer isLoading={loading}>
      <div className="flex flex-col px-4 md:px-24 lg:px-64 xl:px-96">
        <TopBar />

        <BoxWrapper>
          <BoxHeader>
            <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-start md:items-center">
              <div className="inline-flex gap-1 items-start">
                <h2 className="font-semibold text-gray-800">Astronauts</h2>
                <h2>({store.astronautsFiltered.length})</h2>
              </div>
              <Input
                type="text"
                placeholder="Search astronauts..."
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => filterAstronauts(value)}
              />
            </div>
            <Button text="Add" icon={<GoPlusSmall />} onClick={() => showModal(<AddAstronautModal />)} />
          </BoxHeader>
          <BoxContent>
            <div className="w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-20 p-2">
              <div className="p-3 w-full">
                <div className="overflow-x-auto">
                  <Table
                    columns={[
                      { Header: 'First Name', accessor: 'firstName' },
                      { Header: 'Last Name', accessor: 'lastName' },
                      {
                        Header: 'Birthdate',
                        accessor: 'birthDate',
                        preprocess: (value: string) => {
                          const date = new Date(value)
                          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        },
                      },
                      { Header: 'Superpower', accessor: 'superPower' },
                    ]}
                    actions={[
                      {
                        label: 'Edit',
                        onClick: (row: IAstronaut) => {
                          showModal(<EditAstronautModal astronaut={row} />)
                        },
                      },
                    ]}
                    data={store.astronautsFiltered}
                    dataPerPage={5}
                    noDataMessage="No astronauts found"
                    usePagination
                  />
                </div>
              </div>
            </div>
          </BoxContent>
        </BoxWrapper>
      </div>
    </LoadingContainer>
  )
}

export default AppLayout

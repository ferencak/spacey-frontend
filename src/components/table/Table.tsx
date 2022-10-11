import { FC, Fragment, useState } from 'react'

interface ITableColumn {
  Header: string
  accessor: string
  preprocess?: (value: any) => any
}

interface ITableAction {
  label: string
  onClick: (row: any) => void
}

interface ITableProps {
  data: any[]
  columns: ITableColumn[]
  actions?: ITableAction[]
  dataPerPage: number
  usePagination?: boolean
  noDataMessage?: string
}

const Table: FC<ITableProps> = ({
  data,
  columns,
  actions,
  dataPerPage = 5,
  usePagination,
  noDataMessage,
}): JSX.Element => {
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)

  const handleNextPage = (): void => {
    if (currentTablePage === Math.ceil(data.length / dataPerPage)) return
    setCurrentTablePage(currentTablePage + 1)
  }

  const handlePreviousPage = (): void => {
    if (currentTablePage === 1) return
    setCurrentTablePage(currentTablePage - 1)
  }

  return (
    <Fragment>
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 !h-[3rem]">
          <tr>
            {columns.map((column: ITableColumn) => (
              <th key={column.accessor} className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">{column.Header}</div>
              </th>
            ))}
            {actions && (
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Actions</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {data
            .slice((currentTablePage - 1) * dataPerPage, currentTablePage * dataPerPage)
            .map((row: any, index: number) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-50 duration-300">
                {columns.map((column: ITableColumn) => (
                  <td key={column.accessor} className="p-2 whitespace-nowrap capitalize">
                    <div className="text-left">
                      {column.preprocess ? column.preprocess(row[column.accessor]) : row[column.accessor]}
                    </div>
                  </td>
                ))}
                {actions && (
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex gap-1 text-left">
                      {actions.map((action: ITableAction, index: number) => (
                        <button
                          key={index}
                          className="text-blue-500 hover:text-blue-600 duration-300 hover:bg-blue-100 px-2 py-1 rounded"
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-4">{noDataMessage || 'No data to display'}</div>
      )}
      {usePagination && data.length > dataPerPage && (
        <div className="flex w-full items-center justify-between border-t border-gray-200 bg-white py-3">
          <div>
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{(currentTablePage - 1) * dataPerPage + 1}</span> to{' '}
              <span className="font-medium">{currentTablePage * dataPerPage}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div className="flex flex-1 ml-5 justify-between sm:hidden">
            <span
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => handlePreviousPage()}
            >
              Previous
            </span>
            <span
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => handleNextPage()}
            >
              Next
            </span>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
            <div>
              <nav className="isolate inline-flex space-x-1 rounded-md shadow-sm" aria-label="Pagination">
                {Array.from(Array(Math.ceil(data.length / dataPerPage)).keys()).map((page: number) => (
                  <span
                    key={page}
                    onClick={() => setCurrentTablePage(page + 1)}
                    className={`relative inline-flex cursor-pointer items-center border rounded border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 duration-300 ${
                      currentTablePage === page + 1 ? 'bg-blue-50 !text-blue-600 border-blue-600' : ''
                    }`}
                  >
                    {page + 1}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Table

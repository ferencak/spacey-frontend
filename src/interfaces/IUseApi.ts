export interface IUseApiProps {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  headers?: any
  onSuccess?: Function
  onError?: Function
  autoFetch?: boolean
  mock?: boolean
  withToken?: boolean
}

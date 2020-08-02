export interface ApiReqPayload<T> {
  token: string
  value: T
}

export type ApiReqStatus = 'ready' | 'loading' | 'error' | 'success'

import axios from 'axios'

import { ApiReqPayload } from '@/models'

const baseURL = 'http://localhost:8000'

class ApiBase {
  httpClient = axios.create({
    baseURL,
  })

  buildAuthHeaders = <T>(
    payload: ApiReqPayload<T>
  ): { [key: string]: string } => ({
    Authorization: `Bearer ${payload.token}`,
  })
}

export { ApiBase }

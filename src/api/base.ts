import axios from 'axios'

import { ApiReqPayload } from '@/models'

const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000'

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

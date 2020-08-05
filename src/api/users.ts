import { ApiBase } from './base'
import { User, ApiReqPayload, UserCredential, UserLoginSuccess } from '@/models'
import { AxiosResponse } from 'axios'

class ApiUser extends ApiBase {
  async create(payload: ApiReqPayload<User>): Promise<User> {
    const resp: AxiosResponse<User> = await this.httpClient.post(
      '/users/',
      payload.value,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }

  async delete(payload: ApiReqPayload<User>): Promise<void> {
    const resp: AxiosResponse<void> = await this.httpClient.delete(
      `/users/${payload.value.id}/`,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }

  async get(payload: ApiReqPayload<string>): Promise<User> {
    const resp: AxiosResponse<User> = await this.httpClient.get(
      `/users/${payload.value}/`,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }

  async list(payload: ApiReqPayload<undefined>): Promise<User[]> {
    const resp: AxiosResponse<User[]> = await this.httpClient.get('/users/', {
      headers: this.buildAuthHeaders(payload),
    })

    return resp.data
  }

  async login(payload: UserCredential): Promise<UserLoginSuccess> {
    const resp: AxiosResponse<UserLoginSuccess> = await this.httpClient.post(
      '/users/login/',
      payload
    )

    return resp.data
  }

  async update(payload: ApiReqPayload<User>): Promise<User> {
    const resp: AxiosResponse<User> = await this.httpClient.put(
      `/users/${payload.value.id}/`,
      payload.value,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }
}

export { ApiUser }

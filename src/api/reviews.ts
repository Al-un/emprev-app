import { ApiBase } from './base'
import { ApiReqPayload, Review } from '@/models'
import { AxiosResponse } from 'axios'

class ApiReview extends ApiBase {
  async create(payload: ApiReqPayload<Review>): Promise<Review> {
    const resp: AxiosResponse<Review> = await this.httpClient.post(
      '/reviews/',
      payload.value,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }

  async list(payload: ApiReqPayload<string>): Promise<Review[]> {
    const resp: AxiosResponse<Review[]> = await this.httpClient.get(
      `/reviews/${payload.value}`,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }

  async update(payload: ApiReqPayload<Review>): Promise<Review> {
    const review = payload.value

    const resp: AxiosResponse<Review> = await this.httpClient.put(
      `/reviews/${review.reviewerUserId}/${review.id}`,
      review,
      { headers: this.buildAuthHeaders(payload) }
    )

    return resp.data
  }
}

export { ApiReview }

import { ApiUser } from './users'
import { ApiReview } from './reviews'

const api = {
  user: new ApiUser(),
  review: new ApiReview(),
}

export default api

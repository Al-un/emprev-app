/**
 * Most basic definition of a entity data model: it has an ID
 */
export interface Entity {
  id?: string
}

export interface User extends Entity {
  username: string
  isAdmin: boolean
  isDeleted: boolean
  /**
   * Password is only used during user creation and is never sent by
   * the server
   */
  password?: string
}

/**
 * A review is first created by an administrator user. The administrator
 * defines the reviewer employee and reviewed employee as well as the
 * covered period.
 *
 * The reviewer employee then sees the review request on his homepage
 * and can then fill the score and comment fields. Once submitted, those
 * value cannot be changed as-of now.
 */
export interface Review extends Entity {
  reviewerUserId: string
  reviewedUserId: string
  period: string
  score?: number
  comment?: string
  // --- the following fields are generated by the app. An improvement would be
  // having the API generating those fields
  reviewerUser?: {
    id: string
    username: string
  }
  reviewedUser?: {
    id: string
    username: string
  }
}

/**
 * Convenient entity to group review by period.
 *
 * Improvement could be having the API sending the reviews already grouped
 * by periods
 */
export interface ReviewByPeriod {
  period: string
  reviews: Review[]
}

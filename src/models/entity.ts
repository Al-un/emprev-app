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
  password?: string
}

export interface Review extends Entity {
  reviewerUserId: string
  reviewedUserId: string
  period: string
  score?: number
  comment?: string
  reviewerUser?: {
    id: string
    username: string
  }
  reviewedUser?: {
    id: string
    username: string
  }
}

export interface ReviewByPeriod {
  period: string
  reviews: Review[]
}

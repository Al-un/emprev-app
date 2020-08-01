export interface UserCredential {
  username: string
  password: string
}

export interface UserLoginSuccess {
  token: string
}

export interface User {
  id?: string
  username: string
  isAdmin: boolean
  isDeleted: boolean
  password?: string
}

export interface Review {
  id: string
  reviewerUserId: string
  reviewedUserId: string
  period?: string
  score?: number
  comment?: string
}

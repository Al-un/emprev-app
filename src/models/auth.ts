export interface UserCredential {
  username: string
  password: string
}

export interface UserLoginSuccess {
  token: string
}

export interface UserJwt {
  userId: string
  isAdmin: boolean
  // Expiration date
  exp: number
  // Issue date
  iat: number
  // Issuer identifier
  iss: string
  // Basically, username
  sub: string
}

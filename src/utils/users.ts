import store from '@/store'

/**
 * @returns true if the current session is an authenticated session
 */
export const isAuthenticated = (): boolean => {
  return !!store.state.token
}

/**
 * @returns true if the current session is a logged administrator
 */
export const isAdmin = (): boolean => {
  const user = store.state.user
  return user ? user.isAdmin : false
}

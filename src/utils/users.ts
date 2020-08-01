import store from '@/store'

export const isAuthenticated = (): boolean => {
  return !!store.state.token
}

export const isAdmin = (): boolean => {
  const user = store.state.user
  return user ? user.isAdmin : false
}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { UserCredential, UserJwt } from '@/models'
import api from '@/api'

const TOKEN_KEY = 'authToken'

interface UserInfo {
  id: string
  username: string
  isAdmin: boolean
}

interface RootState {
  token?: string
  user?: UserInfo
}

/**
 * @todo move to proper utils?
 */
const decodeUserInfo = (jwt: string): UserInfo => {
  const split = jwt.split('.')
  const encodedUserInfo = split[1]
  const decodedUserInfo = window.atob(encodedUserInfo)
  const userInfo: UserJwt = JSON.parse(decodedUserInfo)

  return {
    id: userInfo.userId,
    username: userInfo.sub,
    isAdmin: userInfo.isAdmin,
  }
}

export default new Vuex.Store<RootState>({
  state: () => {
    const token = localStorage.getItem(TOKEN_KEY) || undefined

    if (!token) {
      return { token: undefined, user: undefined }
    }

    return {
      token,
      user: decodeUserInfo(token),
    }
  },
  mutations: {
    updateToken: (state, token: string) => {
      state.token = token

      if (state.token) {
        // Decode user info
        state.user = decodeUserInfo(state.token)

        // Save token to local store
        localStorage.setItem(TOKEN_KEY, state.token)
      } else {
        state.user = undefined
        localStorage.removeItem(TOKEN_KEY)
      }
    },
  },
  actions: {
    login: async ({ commit }, payload: UserCredential) => {
      // If the login fails, an exception is thrown here
      const successfulLogin = await api.user.login(payload)

      commit('updateToken', successfulLogin.token)
    },

    logout: async ({ commit }) => {
      commit('updateToken', undefined)
    },
  },
  modules: {},
})

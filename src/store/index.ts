import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { UserCredential, User, UserJwt } from '@/models'
import api from '@/api'

interface RootState {
  token?: string
  user?: {
    id: string
    username: string
    isAdmin: boolean
  }
}

export default new Vuex.Store<RootState>({
  state: {
    token: undefined,
    user: undefined,
  },
  mutations: {
    updateToken: (state, token: string) => {
      state.token = token

      if (state.token) {
        const split = state.token.split('.')
        const encodedUserInfo = split[1]
        const decodedUserInfo = window.atob(encodedUserInfo)
        const userInfo: UserJwt = JSON.parse(decodedUserInfo)

        console.log(`UserInfo:`, userInfo)
        state.user = {
          id: userInfo.userId,
          username: userInfo.sub,
          isAdmin: userInfo.isAdmin,
        }
      } else {
        state.user = undefined
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

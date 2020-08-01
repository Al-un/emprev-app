import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { UserCredential } from '@/models'
import api from '@/api'

export default new Vuex.Store({
  state: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI1ZjI0ZjAxZDI1OGIyOTVhMWYzNWE3NjkiLCJleHAiOjE2MDE0NTI5NjksImlhdCI6MTU5NjI2ODk2OSwiaXNzIjoiYWwtdW4uZnIiLCJzdWIiOiJyb290In0.GHBjZ0XVNz_IRmwemf6tlXN035kyo3blWdHJehJ3axs',
    user: {
      id: '123',
      username: 'Prout',
    },
  },
  mutations: {
    updateToken: (state, token: string) => {
      state.token = token

      if (state.token) {
        const split = state.token.split('.')
        const encodedUserInfo = split[1]
        console.log(`UserInfo: ${encodedUserInfo}`)
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

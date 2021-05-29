import Vue from 'vue'
import Vuex from 'vuex'
import { delToken, setToken, user as UserAPI } from '../request'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!window?.ls?.token,
    userInfo: window?.ls?.userInfo || {},
  },

  mutations: {
    init (state) {
      state.isLogin = !!window?.ls?.token
      state.userInfo = window?.ls?.userInfo || {}
    },

    updateState (state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },

    logout (state) {
      delToken()
      window.ls.$del('token', 'userInfo')
      state.userInfo = {}
      state.isLogin = false
      router.push('/login')
    },
  },

  actions: {
    login ({ commit }, loginData) {
      return UserAPI.login(loginData)
        .then(res => {
          if (res.code) throw new Error(res.msg)
          const { data: { token, userInfo } } = res
          setToken(token)
          window.ls.$set({ token, userInfo })
          commit('updateState', { userInfo, isLogin: true })
        })
    },
  },

  modules: {
  },

})

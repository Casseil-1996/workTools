import Vue from 'vue'
import Vuex from 'vuex'
import { delToken, setToken, user as UserAPI } from '../request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!window.ls.token,
    userInfo: window.ls.userInfo || {},
  },

  mutations: {
    login (state, loginData) {
      UserAPI.login(loginData)
        .then(res => {
          if (res.code) return
          const { data: { token, userInfo } } = res
          setToken(token)
          window.ls.$set({ token, userInfo })
          state.userInfo = userInfo
          state.isLogin = true
        })
    },

    loginOut (state) {
      delToken()
      window.ls.$del('token', 'userInfo')
      state.userInfo = {}
      state.isLogin = false
    },
  },

  actions: {
  },

  modules: {
  },
})

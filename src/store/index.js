import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },
    SET_USER(state, newData) {
      const currentData = state.user.data
      state.user.data = {
        ...currentData,
        ...newData,
      }
    },
  },
  actions: {
    fetchFirebaseUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)
      if (user) {
        commit('SET_USER', {
          email: user.email,
          firebaseUiid: user.uid,
        })
      } else {
        commit('SET_USER', null)
      }
    },
  },
  modules: {
  },
})

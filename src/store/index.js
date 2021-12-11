import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      apiData: null,
      firebaseData: null,
      isNew: false,
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
    SET_USER_FIREBASE_DATA(state, newData) {
      const currentData = state.user.data
      state.user.data = {
        ...currentData,
        ...newData,
      }
    },
    SET_IF_USER_IS_NEW(state, value) {
      state.user.isNew = value
    },
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)
      if (user) {
        commit('SET_USER_FIREBASE_DATA', {
          email: user.email,
          firebaseUiid: user.uid,
        })
      } else {
        commit('SET_USER_FIREBASE_DATA', null)
      }
    },
    setIfUserIsNew({ commit }, value) {
      commit('SET_IF_USER_IS_NEW', value)
    },
  },
  modules: {
  },
})

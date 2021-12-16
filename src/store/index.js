import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    },
    fetchingData: false,
  },
  getters: {
    user(state) {
      return state.user
    },
    fetchingData(state) {
      return state.fetchingData
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },
    UPDATE_USER(state, newData) {
      const currentData = state.user.data
      state.user.data = {
        ...currentData,
        ...newData,
      }
    },
    UPDATE_FETCH_STATUS(state, value) {
      state.fetchingData = value
    },
  },
  actions: {
    changeFetchingStatus({ commit }, value) {
      commit('UPDATE_FETCH_STATUS', value)
    },
    updateUser({ commit }, data) {
      commit('SET_LOGGED_IN', data.email !== null)
      if (data) {
        commit('UPDATE_USER', data)
      } else {
        commit('UPDATE_USER', null)
      }
    },
  },
  modules: {
  },
})

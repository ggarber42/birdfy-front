import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import firebase from 'firebase/compat/app'
import App from './App.vue'
import router from './router'
import store from './store'
import firebaseConfig from './firebaseConfig'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.devtools = true

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(async (firebaseData) => {
  const url = 'http://localhost:8080/api/v1/birdfy/usuario/'
  const email = firebaseData && firebaseData.email
  let apiData = {}
  if (email) {
    store.dispatch('changeFetchingStatus', true)
    const res = await axios.get(`${url}${email}`, { validateStatus: false })
    store.dispatch('changeFetchingStatus', false)
    if (res.data.message !== 'notfound') {
      apiData = {
        ...res.data,
      }
    }
  }
  const data = {
    email,
    ...apiData,
  }
  store.dispatch('updateUser', data)
})

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
})

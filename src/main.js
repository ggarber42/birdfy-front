import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import firebase from 'firebase/compat/app'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'xxxxxx',
  authDomain: 'birdfy-auth-handler.firebaseapp.com',
  projectId: 'birdfy-auth-handler',
  storageBucket: 'birdfy-auth-handler.appspot.com',
  messagingSenderId: '788117214849',
  appId: '1:788117214849:web:9311a85f4a7b13927c9f80',
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged((user) => {
  console.log('user', user)
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
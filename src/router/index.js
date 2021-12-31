import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import store from '../store'

import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import SingupApi from '../views/SingupApi.vue'
import SingupFireBase from '../views/SingupFireBase.vue'
import BirdRegister from '../views/BirdRegister.vue'
import BirdEdit from '../views/BirdEdit.vue'
import Main from '../views/Main.vue'

import { routeRequiresAuth, waitFetching } from '../utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: false },
    component: Home,
  },
  {
    path: '/singup',
    name: 'SingupFireBase',
    meta: { requiresAuth: false },
    component: SingupFireBase,
  },
  {
    path: '/singup/complement',
    name: 'SingupApi',
    meta: { requiresAuth: true },
    component: SingupApi,
  },
  {
    path: '/main',
    name: 'Main',
    meta: { requiresAuth: true },
    component: Main,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { requiresAuth: true },
    component: {
      beforeRouteEnter(to, from, next) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            next('/')
          })
      },
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: Dashboard,
  },
  {
    path: '/birdregister',
    name: 'BirdRegister',
    meta: { requiresAuth: true },
    component: BirdRegister,
  },
  {
    path: '/birdedit/:id',
    name: 'BirdEdit',
    meta: { requiresAuth: true },
    component: BirdEdit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isFetching = store.getters.fetchingData
  if (isFetching) {
    await waitFetching()
  }
  const requiresAuth = routeRequiresAuth(to)
  const isAuthenticated = store.getters.user.loggedIn
  if (to.name === 'Home' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

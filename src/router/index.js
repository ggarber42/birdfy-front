import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import store from '../store'

import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SingupApi from '../views/SingupApi.vue'
import SingupFireBase from '../views/SingupFireBase.vue'

import { routeRequiresAuth } from '../utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: false },
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresAuth: false },
    component: Login,
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.user.loggedIn
  const requiresAuth = routeRequiresAuth(to)
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router

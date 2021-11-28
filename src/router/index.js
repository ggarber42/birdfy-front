import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Protected from '../views/Protected.vue'

// eslint-disable-next-line import/order
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

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
    path: '/signup',
    name: 'Signup',
    meta: { requiresAuth: false },
    component: Signup,
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
    path: '/protected',
    name: 'Protected',
    meta: { requiresAuth: true },
    component: Protected,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.user.loggedIn
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (!requiresAuth && isAuthenticated) {
    next('/protected')
  } else {
    next()
  }
})

export default router

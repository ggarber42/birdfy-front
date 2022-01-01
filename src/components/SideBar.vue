<template>
  <slide
    width="250"
    noOverlay
    v-if="isVisible"
  >
    <router-link to="/" v-if="!isLoggedIn">Home</router-link>
    <router-link to="/singup" v-if="!isLoggedIn">Signup</router-link>
    <router-link to="/logout" v-if="isLoggedIn">Logout</router-link>
    <router-link to="/main" v-if="isLoggedIn">Main</router-link>
  </slide>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  name: 'Sidebar',
  components: {
    Slide,
  },
  data() {
    return {
      isVisible: true,
      currentRoute: this.$route,
    }
  },
  methods: {
    isAuthPage() {
      const routeName = this.$route.name
      return routeName === 'Home' || routeName === 'SingupFireBase' || routeName === 'SingupApi'
    },
  },
  computed: {
    isLoggedIn() { return this.$store.getters.user.loggedIn },
  },
  watch: {
    $route() {
      if (this.isAuthPage()) {
        this.isVisible = false
      } else {
        this.isVisible = true
      }
    },
  },
  mounted() {
    if (this.isAuthPage()) {
      this.isVisible = false
    }
  },
}
</script>

<style>
.bm-menu{
  background-color: #2a2d31;
  opacity: .9;
}
.bm-burger-button {
    height: 20px;
    width: 25px;
    top: inherit;
    left: 5vw;
}
.bm-item-list > a {
  color: #fff;
}
.bm-burger-bars {
    background-color: #ffffff;
    width: 40px;
}
</style>

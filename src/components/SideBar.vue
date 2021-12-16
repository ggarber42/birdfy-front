<template>
  <slide width="250" noOverlay>
    <router-link to="/" v-if="!isLoggedIn">Home</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/singup" v-if="!isLoggedIn">Signup</router-link>
    <router-link to="/logout" v-if="isLoggedIn">Logout</router-link>
    <router-link to="/dashboard" v-if="isLoggedIn">Dashboard</router-link>
    <router-link to="/about">About</router-link>
  </slide>
</template>

<script>
import { Slide } from 'vue-burger-menu'

export default {
  name: 'Sidebar',
  components: {
    Slide,
  },
  computed: {
    isLoggedIn() { return this.$store.getters.user.loggedIn },
  },
}
</script>

<style>
.bm-menu{
  background-color: #fff;
  border-right: 1px solid #dedede;
}
.bm-burger-button {
    height: 20px;
    width: 25px;
    top: inherit;
    left: 5vw;
}
</style>

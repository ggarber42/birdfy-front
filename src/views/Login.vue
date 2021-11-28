<template>
  <div>
    <h1>Login</h1>
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  components: { LoginForm },
  name: 'Login',
}
</script>

<style>
.bm-overlay .card{
      background: rgb(178 178 178);
      border-color: rgb(178 178 178) !important;
}
</style>

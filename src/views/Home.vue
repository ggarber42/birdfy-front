<template>
  <b-container class="main">
    <cover />
    <b-row align-h="center">
      <b-card
        bg-variant="dark"
        title="Birdfy"
        sub-title="Aves do Morro do Osso"
        tag="article"
        style="max-width: 25rem"
        class="mb-2"
      >
        <b-row class="mt-3 mb-3">
          <b-form-input
            type="email"
            v-model="email"
            placeholder="E-mail" />
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Senha" />
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-button
            @click="handleSubmit"
            href="#"
            variant="secondary">
            Entrar
          </b-button>
        </b-row>
        <b-row class="mt-5">
          <b-button
            size="sm"
            @click="$router.push('singup')"
            href="#"
            variant="outline-light">
            Não tenho cadastro
          </b-button>
        </b-row>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import Cover from '../components/Cover.vue'

export default {
  name: 'Home',
  components: { Cover },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: 'Dashboard' })
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },

}
</script>

<style scoped>
.main{
  margin: 10vh auto 0;
}
.card{
  opacity: .85;
}
.card-body{
  color: #fff;
  font-weight: 900;
}
.card-subtitle{
  color: #fff;
}
</style>

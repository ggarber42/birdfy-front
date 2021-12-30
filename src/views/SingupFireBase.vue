<template>
  <div>
    <cover />
    <b-container class="main">
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
            Cadastrar
          </b-button>
        </b-row>
        <b-row class="mt-5">
          <b-button
            size="sm"
            @click="$router.push('/')"
            href="#"
            variant="outline-light">
            voltar
          </b-button>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import Cover from '../components/Cover.vue'

export default {
  name: 'SingupFireBase',
  components: { Cover },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('AQUI DEPOIS')
          this.$router.replace({ name: 'SingupApi' })
        })
        .catch((error) => console.error(error))
    },
  },
}
</script>

<style>
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

article.card{
  margin: 0 auto;
}
</style>

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
          <span v-if="showErrorEmail">{{errorMsg.email}}</span>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Senha" />
          <span v-if="showErrorPassword">{{errorMsg.password}}</span>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-button
            @click="handleSubmit"
            href="#"
            variant="secondary">
            Entrar
            <b-spinner small v-if="showSpinner"></b-spinner>
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
    <b-modal content-class="your-class"  v-model="modalShow">
      Senha ou email inválido
    </b-modal>
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
      errorMsg: [],
      showErrorEmail: false,
      showErrorPassword: false,
      showSpinner: false,
      modalShow: false,
    }
  },
  methods: {
    handleSubmit() {
      this.validateEmail(this.email)
      this.validatePassword(this.password)
      if (this.errorMsg.password.length || this.errorMsg.email.length) {
        return
      }
      this.showSpinner = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: 'Dashboard' })
        })
        .catch((data) => {
          this.requestError = data
          this.modalShow = true
        })
        .finally(() => {
          this.showSpinner = false
        })
    },
    validateEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.errorMsg.email = ''
        this.showErrorEmail = false
      } else {
        this.showErrorEmail = true
        this.errorMsg.email = 'Email inválido'
      }
    },
    validatePassword(value) {
      const difference = 6 - value.length
      if (value.length < 6) {
        this.showErrorPassword = true
        this.errorMsg.password = `A senha precisa de 6 caracteres! Falta ${difference}`
      } else {
        this.showErrorPassword = false
        this.errorMsg.password = ''
      }
    },
  },
}
</script>

<style >
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
input + span{
  color: red;
}
.your-class .modal-footer{
  display: none;
}
.your-class button.close{
  background-color: #fff;
  border: none;
  font-size: 1.25rem;
}

.your-class .modal-body{
  color: red;
  text-align: center;
}
</style>

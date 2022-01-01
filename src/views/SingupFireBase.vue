<template>
  <div>
    <b-container class="main">
      <cover />
      <b-card
        bg-variant="dark"
        title="Cadastro"
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
            Cadastrar
            <b-spinner small v-if="showSpinner"></b-spinner>
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
      <b-modal content-class="modal-custom"  v-model="modalShow">
        {{ requestError }}
      </b-modal>
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
      email: '',
      password: '',
      errorMsg: [],
      requestError: '',
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
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace({ name: 'SingupApi' })
        })
        .catch((error) => {
          this.requestError = error
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
        this.errorMsg.password = `A senha precisa de 6 caracteres! Precisa de mais ${difference}`
      } else {
        this.showErrorPassword = false
        this.errorMsg.password = ''
      }
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
.modal-custom .modal-footer{
  display: none;
}
.modal-custom button.close{
  background-color: #fff;
  border: none;
  font-size: 1.25rem;
}

.modal-custom .modal-body{
  color: red;
  text-align: center;
}
</style>

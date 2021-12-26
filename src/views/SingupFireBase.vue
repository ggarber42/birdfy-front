<template>
  <div>
    <h1>Cadastro</h1>
    <b-container>
      <b-form
        @submit.prevent="handleSubmit"
        @reset.prevent="handleReset"
      >
        <b-form-group
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            v-model="email"
            type="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="text-password">Password</label>
          <b-form-input
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary">Submit</b-button>
        <b-button
          type="reset"
          variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export default {
  name: 'SingupFireBase',
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
    handleReset() {
      this.name = ''
      this.email = ''
      this.password = ''
    },
  },
}
</script>

<style>
</style>

<template>
  <div>
    <h1>Complete seu cadastro</h1>
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
            v-model="nome"
            required
            type="text"
            placeholder="Digite o nome"
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
import axios from 'axios'

export default {
  name: 'SignupApi',
  data() {
    return {
      nome: '',
    }
  },
  methods: {
    handleSubmit() {
      const { email } = this.$store.getters.user.data
      const url = 'http://localhost:8080/api/v1/birdfy/usuario'
      axios.post(url, {
        nome: this.nome,
        email,
      })
        .then((response) => {
          console.log(response)
          axios
            .get(`${url}/${email}`)
            .then((res) => {
              console.log(res)
              const apiData = res.data
              this.$store.dispatch('updateUser', apiData)
              this.$router.replace({ name: 'Dashboard' })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
</style>

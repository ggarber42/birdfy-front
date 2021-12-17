<template>
  <div>
    <h1>Cadastre um ave</h1>
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
            type="text"
            placeholder="Enter nome"
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
  name: 'BirdRegister',
  data() {
    return {
      nome: '',
    }
  },
  methods: {
    handleSubmit() {
      const url = 'http://localhost:8080/api/v1/birdfy/ave'
      axios
        .post(url, {
          nome: this.nome,
        })
        .then(() => this.$router.replace({ name: 'Dashboard' }))
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style>

</style>

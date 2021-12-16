<template>
  <h1>Cadastre um ave</h1>
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
      axios.post(url, {
        nome: this.nome,
      })
    },
  },
}
</script>

<style>

</style>

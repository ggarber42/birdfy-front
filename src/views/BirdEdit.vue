<template>
  <div>
    <h1>Detalhe da ave</h1>
    <h3>{{nome}}</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BirdEdit',
  data() {
    return {
      nome: '',
    }
  },
  beforeMount() {
    const birdId = this.$route.params.id
    axios
      .get(`http://localhost:8080/api/v1/birdfy/ave/${birdId}`)
      .then((res) => {
        const data = res.data || {}
        this.nome = data.nome
      })
      .catch((err) => console.error(err))
  },
}
</script>

<style>

</style>

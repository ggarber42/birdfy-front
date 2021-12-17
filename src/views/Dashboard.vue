<template>
  <dir>
    <h1>Dashboard</h1>
    <p>Olá {{nome}} </p>
    <router-link to="/birdregister">
      <b-button variant="primary">
        Cadastrar Ave
      </b-button>
    </router-link>
    <b-table
      striped
      hover
      :fileds="fields"
      :items="birds"></b-table>
  </dir>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      nome: '',
      fields: ['id', 'nome'],
      birds: [],
    }
  },
  mounted() {
    this.nome = this.$store.getters.user.data.nome
    axios
      .get('http://localhost:8080/api/v1/birdfy/ave')
      .then((res) => {
        const dataArray = res.data || []
        dataArray.forEach((data) => {
          this.birds.push({
            id: data.id,
            nome: data.nome,
          })
        })
      })
      .catch((err) => console.error(err))
  },
}
</script>

<style>

</style>

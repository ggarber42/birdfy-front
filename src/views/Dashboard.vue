<template>
  <div>
    <h3>Olá {{nome}} </h3>
    <router-link to="/birdregister">
      <b-button variant="primary">
        Cadastrar Ave
      </b-button>
    </router-link>
    <h4 class="d-flex p-2">Minhas aves</h4>
    <b-table
      hover
      head-variant="dark"
      :items="birds"
      :fields="fields"
      striped responsive="sm">
      <template #cell(---)="row">
        <b-button
          size="sm" @click="editBird(row)"
          class="mr-2">
          Editar
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="deleteBird(row)"
          class="ml-2">
          Deletar
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      nome: '',
      fields: [
        { key: 'nome' },
        { key: '---' },
      ],
      birds: [],
    }
  },
  methods: {
    editBird(row) {
      const { item } = row
      this.$router.push({ name: 'BirdEdit', params: { id: item.id } })
    },
    deleteBird(row) {
      const { item } = row
      axios
        .delete(`http://localhost:8080/api/v1/birdfy/ave/${item.id}`)
        .then(() => {
          axios
            .get('http://localhost:8080/api/v1/birdfy/ave')
            .then((res) => {
              const dataArray = res.data || []
              this.birds = dataArray.map((data) => ({
                id: data.id,
                nome: data.nome,
              }))
            })
            .catch((err) => console.error(err))
        })
        .catch((err) => console.error(err))
    },
  },
  beforeMount() {
    this.nome = this.$store.getters.user.data.nome
    axios
      .get('http://localhost:8080/api/v1/birdfy/ave')
      .then((res) => {
        const dataArray = res.data || []
        this.birds = dataArray.map((data) => ({
          id: data.id,
          nome: data.nome,
        }))
      })
      .catch((err) => console.error(err))
  },
}
</script>

<style>
.btn-danger{
  margin-left: .5em;
}
</style>

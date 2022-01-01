<template>
  <b-container class="main">
    <cover-2 />
    <b-card class="text-center bg-dark">
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
      <router-link to="/birdregister">
        <b-button variant="secondary">
          Cadastrar Ave
        </b-button>
      </router-link>
    </b-card>
  </b-container>

</template>

<script>
import axios from 'axios'
import Cover2 from '../components/Cover2.vue'

export default {
  name: 'Dashboard',
  components: { Cover2 },
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
.main .table{
  border-color: inherit;
  max-height: 50vh;
  overflow-y: scroll;
}
.main .table.table-striped tr td{
  color: #fff;
}
</style>

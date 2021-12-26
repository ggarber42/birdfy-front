<template>
  <div>
    <h1>Dashboard</h1>
    <p>Olá {{nome}} </p>
    <router-link to="/birdregister">
      <b-button variant="primary">
        Cadastrar Ave
      </b-button>
    </router-link>
    <b-table
      hover
      head-variant="dark"
      :items="birds"
      :fields="fields"
      striped responsive="sm">
      <template #cell(actions)="row">
        <b-button
          size="sm" @click="expandAdditionalInfo(row)"
          class="mr-2">
          Editar
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
        {
          key: 'id',
          label: 'ID',
          sortable: true,
        },
        { key: 'nome' },
        { key: 'actions' },
      ],
      birds: [],
    }
  },
  methods: {
    expandAdditionalInfo(row) {
      const { item } = row
      console.log(item.id, item.nome)
      this.$router.push({ name: 'BirdEdit', params: { id: item.id } })
    },
  },
  beforeMount() {
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
tr{
  cursor: pointer;
}
</style>

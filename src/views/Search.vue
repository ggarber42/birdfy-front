<template>
  <b-container class="main">
    <cover-2 />
    <b-card class="text-center bg-dark">
      <h4 class="d-flex p-2">Busca por Texto</h4>
      <b-form-input v-model="term" placeholder="Pesquise aqui..."></b-form-input>
      <b-table
        hover
        head-variant="dark"
        :items="birds"
        striped responsive="sm">
      </b-table>
      <b-button variant="secondary" @click="search">
        Buscar
        <b-spinner small v-if="isSearching"></b-spinner>
      </b-button>
    </b-card>
    <b-modal content-class="modal-custom"  v-model="modalShow">
      Insira um termo
    </b-modal>
  </b-container>

</template>

<script>
import axios from 'axios'
import Cover2 from '../components/Cover2.vue'

export default {
  name: 'Search',
  components: { Cover2 },
  data() {
    return {
      term: '',
      birds: [],
      isSearching: false,
      modalShow: false,
    }
  },
  methods: {
    search() {
      if (!this.term.length) {
        this.modalShow = true
        return
      }
      this.isSearching = true
      axios
        .get(`http://localhost:8080/api/v1/birdfy/busca?search=(nome:${this.term})`)
        .then((res) => {
          const dataArray = res.data || []
          if (dataArray.length === 0) {
            this.birds = []
            this.birds.push({
              id: '---',
              nome: 'Nenhum resultado encontrado',
            })
          } else {
            this.birds = dataArray.map((data) => ({
              id: data.id,
              nome: data.nome,
            }))
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.isSearching = false
          this.terms = ''
        })
    },
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

<template>
  <b-container class="main">
    <cover-2 />
    <b-card class="text-center bg-dark">
      <h4 v-once v-bind="nome">{{ nome }}</h4>
      <b-form
        @submit.prevent="handleSubmit"
        @reset.prevent="handleReset"
      >
        <b-form-group
          class="mb-5"
          label-for="input-1"
        >
          <b-form-input
            v-model="nome"
            type="text"
            placeholder="Nome da ave"
          ></b-form-input>
          <span v-if="showErrorNome">Preencha acima</span>
        </b-form-group>
        <b-form-group
          class="mb-5"
          label-for="input-1"
        >
          <b-form-input
            v-model="especie"
            type="text"
            placeholder="Especie da ave"
          ></b-form-input>
          <span v-if="showErrorEspecie">Preencha acima</span>
        </b-form-group>
        <b-form-group
          class="mb-5"
        >
          <label for="example-datepicker">Data de registro</label>
          <b-form-datepicker
            id="example-datepicker" v-model="dataRegistro"
            class="mb-2"></b-form-datepicker>
          <span v-if="showErrorData">Preencha acima</span>
        </b-form-group>
        <b-button
          type="submit"
          variant="secondary">Editar</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'
import Cover2 from '../components/Cover2.vue'

export default {
  name: 'BirdEdit',
  components: { Cover2 },
  data() {
    return {
      nome: '',
      birdId: '',
      especie: '',
      dataRegistro: '',
      showErrorNome: false,
      showErrorEspecie: false,
      showErrorData: false,
    }
  },
  beforeMount() {
    this.birdId = this.$route.params.id
    axios
      .get(`http://localhost:8080/api/v1/birdfy/ave/${this.birdId}`)
      .then((res) => {
        const data = res.data || {}
        this.nome = data.nome
        this.especie = data.especie
        this.dataRegistro = data.dataRegistro
      })
      .catch((err) => console.error(err))
  },
  methods: {
    handleSubmit() {
      this.validateNome(this.nome)
      this.validateEspecie(this.especie)
      this.validateDataRegistro(this.dataRegistro)
      if (this.showErrorNome || this.showErrorEspecie || this.showErrorData) {
        return
      }
      axios
        .put(`http://localhost:8080/api/v1/birdfy/ave/${this.birdId}`,
          {
            nome: this.nome,
            especie: this.especie,
            dataRegistro: this.dataRegistro,
          })
        .then(() => {
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((err) => console.error(err))
    },
    validateNome(value) {
      if (value.length === 0) {
        this.showErrorNome = true
      } else {
        this.showErrorNome = false
      }
    },
    validateEspecie(value) {
      if (value.length === 0) {
        this.showErrorEspecie = true
      } else {
        this.showErrorEspecie = false
      }
    },
    validateDataRegistro(value) {
      if (value.length === 0) {
        this.showErrorData = true
      } else {
        this.showErrorData = false
      }
    },
  },
}
</script>

<style>

</style>

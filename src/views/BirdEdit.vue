<template>
  <div>
    <h1>Detalhe da ave</h1>
    <h3 v-once v-bind="nome">{{ nome }}</h3>
    <b-container>
      <b-form
        @submit.prevent="handleSubmit"
        @reset.prevent="handleReset"
      >
        <b-form-group
          label="Nome"
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
  name: 'BirdEdit',
  data() {
    return {
      nome: '',
      birdId: '',
    }
  },
  beforeMount() {
    this.birdId = this.$route.params.id
    axios
      .get(`http://localhost:8080/api/v1/birdfy/ave/${this.birdId}`)
      .then((res) => {
        const data = res.data || {}
        this.nome = data.nome
      })
      .catch((err) => console.error(err))
  },
  methods: {
    handleSubmit() {
      axios
        .put(`http://localhost:8080/api/v1/birdfy/ave/${this.birdId}`,
          {
            nome: this.nome,
          })
        .then(() => {
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style>

</style>

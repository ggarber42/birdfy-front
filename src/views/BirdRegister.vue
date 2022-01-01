<template>
  <b-container class="main">
    <cover-2 />
    <b-card class="text-center bg-dark">
      <h4 class="mb-5">Cadastre uma ave</h4>
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
        </b-form-group>
        <b-form-group
          class="mb-5"
        >
          <label for="example-datepicker">Data de registro</label>
          <b-form-datepicker
            id="example-datepicker" v-model="dataRegistro"
            class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-button
          type="submit"
          variant="secondary">Cadastrar</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'
import Cover2 from '../components/Cover2.vue'

export default {
  name: 'BirdRegister',
  components: { Cover2 },
  data() {
    return {
      nome: '',
      especie: '',
      dataRegistro: '',
    }
  },
  methods: {
    handleSubmit() {
      const url = 'http://localhost:8080/api/v1/birdfy/ave'
      axios
        .post(url, {
          nome: this.nome,
          especie: this.especie,
          dataRegistro: this.dataRegistro,
        })
        .then(() => this.$router.replace({ name: 'Dashboard' }))
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style>
form{
  margin: 0 auto;
}
div#example-datepicker__outer_{
  max-width: 500px;
  margin: 0 auto;
}

</style>

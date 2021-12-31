<template>
  <div>
    <b-container class="main">
      <cover />
      <b-card
        bg-variant="dark"
        title="Termine seu cadastro"
        tag="article"
        style="max-width: 25rem"
        class="mb-2"
      >
        <b-row class="mt-3 mb-3">
          <b-form-input
            v-model="nome"
            required
            type="text"
            placeholder="Nome"
          ></b-form-input>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radios-stacked"
              stacked
            ></b-form-radio-group>
          </b-form-group>
        </b-row>
        <b-row class="mt-3 mb-3" v-if="selected === 2">
          <b-form-input
            v-model="instituicao"
            required
            type="text"
            placeholder="Instituição"
          ></b-form-input>
        </b-row>
        <b-row class="mt-3 mb-3" v-if="selected === 2">
          <b-form-input
            v-model="curso"
            required
            type="text"
            placeholder="Curso"
          ></b-form-input>
        </b-row>
        <b-button
          @click="handleSubmit"
          type="submit"
          variant="secondary">Submit</b-button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

import Cover from '../components/Cover.vue'

export default {
  name: 'SignupApi',
  components: { Cover },
  data() {
    return {
      nome: '',
      instituicao: '',
      curso: '',
      selected: 1,
      options: [
        { text: 'Público Geral', value: 1 },
        { text: 'Biólogo(a) ou Naturalista', value: 2 },
      ],
    }
  },
  methods: {
    handleSubmit() {
      const { email } = this.$store.getters.user.data
      const url = 'http://localhost:8080/api/v1/birdfy/usuario'
      const data = {
        nome: this.nome,
        email,
      }
      if (this.selected === 1) {
        data.accountType = 'geral'
      } else {
        data.accountType = 'científico'
        data.curso = this.curso
        data.instituicao = this.instituicao
      }
      axios.post(url, data)
        .then((response) => {
          console.log(response)
          axios
            .get(`${url}/${email}`)
            .then((res) => {
              console.log(res)
              const apiData = res.data
              this.$store.dispatch('updateUser', apiData)
              this.$router.replace({ name: 'Dashboard' })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
.custom-control.custom-radio{
  display: flex;
  align-items: center;
}
input[type*="radio"]{
  margin-left: .25em;
  margin-right: .75em;
}
</style>

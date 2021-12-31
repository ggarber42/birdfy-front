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
          <span v-if="showErrorNome">Preencha acima</span>
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
          <span v-if="showErrorInstituicao">Preencha acima</span>
        </b-row>
        <b-row class="mt-3 mb-3" v-if="selected === 2">
          <b-form-input
            v-model="curso"
            required
            type="text"
            placeholder="Curso"
          ></b-form-input>
          <span v-if="showErrorCurso">Preencha acima</span>
        </b-row>
        <b-button
          @click="handleSubmit"
          type="submit"
          variant="secondary">Submit
          <b-spinner small v-if="showSpinner"></b-spinner>
        </b-button>
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
      showErrorNome: false,
      showErrorInstituicao: false,
      showErrorCurso: false,
      showSpinner: false,
    }
  },
  methods: {
    handleSubmit() {
      this.validateNome(this.nome)
      if (this.selected === 2) {
        this.validateCurso(this.curso)
        this.validateInstituicao(this.instituicao)
      }
      if (!this.nome.length) {
        return
      }
      if (this.selected === 2) {
        if (!this.curso.length || !this.instituicao.length) {
          return
        }
      }
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
        .then(() => {
          axios
            .get(`${url}/${email}`)
            .then((res) => {
              const apiData = res.data
              this.$store.dispatch('updateUser', apiData)
              this.$router.replace({ name: 'Main' })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateNome(value) {
      if (value.length === 0) {
        this.showErrorNome = true
      } else {
        this.showErrorNome = false
      }
    },
    validateCurso(value) {
      if (value.length === 0) {
        this.showErrorCurso = true
      } else {
        this.showErrorCurso = false
      }
    },
    validateInstituicao(value) {
      if (value.length === 0) {
        this.showErrorInstituicao = true
      } else {
        this.showErrorInstituicao = false
      }
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

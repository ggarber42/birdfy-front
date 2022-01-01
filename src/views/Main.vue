<template>
  <b-container class="main">
    <cover-2 />
    <b-card class="text-center bg-dark">
      <h4>Olá, {{nome}}</h4>
      <p style="font-weight: 100;">o que gostaria de fazer?</p>
      <b-row class="mt-5">
        <b-col>
          <b-button variant="outline-light" @click="$router.push('dashboard')">
            Ver minhas aves <b-icon icon="twitter"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col>
          <b-button variant="outline-light" @click="$router.push('search')">
            Busca por texto
            <b-icon icon="binoculars-fill"></b-icon></b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Cover2 from '../components/Cover2.vue'

export default {
  components: { Cover2 },
  data() {
    return {
      nome: '',
    }
  },
  beforeMount() {
    this.nome = this.$store.getters.user.data.nome
  },
}
</script>

<style>
.main.container{
  max-width: 1000px;
}
.main .card-body{
  padding: 3em;
}
</style>

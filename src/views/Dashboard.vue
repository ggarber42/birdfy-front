<template>
  <dir>
    <h1>Dashboard</h1>
    <p>Olá {{nome}} </p>
  </dir>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      nome: '',
    }
  },
  mounted() {
    console.log(this.$store.getters.user)
    this.nome = this.$store.getters.user.data.nome
  },
}
</script>

<style>

</style>

<template>
  <h1>Protected</h1>
</template>

<script>
export default {
  name: 'Protected',
  mounted() {
    console.log(this.$store.getters.user.data.email)
  },
}
</script>

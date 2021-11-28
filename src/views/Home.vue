<template>
  <b-container>
    <h1>Birdfy</h1>
    <h3>aves do Morro do Osso</h3>
    <b-row align-h="center">
      <b-card
        border-variant="light"
        :img-src="imageUrl"
        img-alt="Martim pescador"
        img-top
        tag="article"
        style="max-width: 25rem"
        class="mb-2"
      >
        <b-row class="mt-3 mb-3">
          <b-button
            @click="$router.push('login')"
            href="#"
            variant="primary">
            Login
          </b-button>
        </b-row>
        <b-row>
          <b-button
            @click="$router.push('signup')"
            href="#"
            variant="outline-primary">
            Cadastro
          </b-button>
        </b-row>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80',
    }
  },
}
</script>

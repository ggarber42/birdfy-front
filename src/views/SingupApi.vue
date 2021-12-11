<template>
  <div>
    <h1>Complete seu cadastro</h1>
    <b-container>
      <b-form
        @submit.prevent="handleSubmit"
        @reset.prevent="handleReset"
      >
        <b-form-group
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            v-model="nome"
            type="text"
            placeholder="Digite o nome"
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

export default {
  name: 'SignupApi',
  data() {
    return {
      nome: '',
    }
  },
  methods: {
    handleSubmit() {
      this.$router.replace({ name: 'Dashboard' })
    },
  },
}
</script>

<style>
</style>

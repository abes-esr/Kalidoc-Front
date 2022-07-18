<template>
  <v-container>
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
      <v-radio-group v-model="test">
        <v-radio :label="'Analyse Rapide'" :value="'P1'"></v-radio>
        <v-radio :label="'Analyse Experte'" :value="'P2'"></v-radio>
        <v-radio :label="'Analyse Ciblée'" :value="'P3'"></v-radio>
      </v-radio-group>

    <p>test = {{test}}</p>
  </v-container>
</template>

<script>
export default {
  name: "blocTypeAnalyse",
  data() {
    return {
      test: null
    }
  }
};
</script>

<style scoped>
</style>
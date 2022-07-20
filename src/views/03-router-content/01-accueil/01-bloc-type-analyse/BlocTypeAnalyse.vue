<template>
  <v-container>
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-radio-group v-model="analyseSelected">
      <v-radio :label="'Analyse Rapide'" :value="'P1'"></v-radio>
      <v-radio :label="'Analyse Experte'" :value="'P2'"></v-radio>
      <v-radio :label="'Analyse Ciblée'" :value="'P3'"></v-radio>
    </v-radio-group>
    <v-container fluid v-if="analyseSelected === 'P3'">
      <v-checkbox v-model="choice1" label="Choix 1"></v-checkbox>
      <v-checkbox v-model="choice2" label="Choix 2"></v-checkbox>
      <v-checkbox v-model="choice3" label="Choix 3"></v-checkbox>
      <v-checkbox v-model="choice4" label="Choix 4"></v-checkbox>
    </v-container>

    <p>test = {{ analyseSelected }}</p>
  </v-container>
</template>

<script>
export default {
  name: "blocTypeAnalyse",
  data() {
    return {
      analyseSelected: null,
      choice1: null,
      choice2: null,
      choice3: null,
      choice4: null
    }
  }
};
</script>

<style scoped>
</style>
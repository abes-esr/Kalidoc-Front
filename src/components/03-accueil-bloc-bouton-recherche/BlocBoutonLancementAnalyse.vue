<template>
  <v-container>
    <v-btn depressed color="primary" v-if="dataAreValid">Lancer l'analyse</v-btn>
    <v-btn depressed v-if="!dataAreValid" disabled>Lancer l'analyse</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "BlocBoutonLancementAnalyse",
  data() {
    return {
      dataAreValid: false
    }
  }
};
</script>

<template>
  <v-container>
    <p>{{analyseStore.getPpnList}}</p>
    <v-btn depressed color="primary" v-if="dataAreValid">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="!dataAreValid" disabled>Lancer l'analyse</v-btn>
  </v-container>
</template>

<script>
import { useAnalyseStore } from "@/stores/analyse";

export default {
  setup() {
    const analyseStore = useAnalyseStore();
    let dataAreValid = false;

    return {
      dataAreValid,
      analyseStore
    }
  }
};
</script>

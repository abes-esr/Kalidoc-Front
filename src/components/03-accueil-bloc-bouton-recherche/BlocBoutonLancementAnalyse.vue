<template>
  <v-container>
    <p>{{analyseStore.getPpnList}}</p>
    <v-btn depressed color="primary" v-if="dataAreValid">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="!dataAreValid" disabled>Lancer l'analyse</v-btn>
    <v-btn @click="test">TEST</v-btn>
  </v-container>
</template>

<script>
import { useAnalyseStore } from "@/stores/analyse";

export default {
  setup() {
    const analyseStore = useAnalyseStore();
    let dataAreValid = false;

    function test(){
      console.log('pad');
      analyseStore.setPpnList(['ert','ret']);
    }

    return {
      dataAreValid,
      test,
      analyseStore
    }
  }
};
</script>

<template>
  <v-container>
    <p>{{analyseStore.getPpnList}}</p>
    <v-btn depressed color="primary" v-if="dataAreValid">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="!dataAreValid" disabled>Lancer l'analyse</v-btn>
    <!-- a des fins de tests uniquement -->
    <v-btn @click="test">Aller à la page de résultats</v-btn>
  </v-container>
</template>

<script>
import { useAnalyseStore } from "@/stores/analyse";
import router from '@/router'
export default {
  setup() {
    const analyseStore = useAnalyseStore();
    let dataAreValid = false;

    function test(){
      router.push('/resultats')
    }

    return {
      dataAreValid,
      test,
      analyseStore
    }
  }
};
</script>

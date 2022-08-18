<template>
  <v-container>
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-radio-group v-model="analyseSelected">
      <v-radio :label="'Analyse Rapide'" :value="'P1'"></v-radio>
      <v-radio :label="'Analyse Experte'" :value="'P2'"></v-radio>
      <v-radio :label="'Analyse Ciblée'" :value="'P3'"></v-radio>
    </v-radio-group>
    <v-container fluid v-if="analyseSelected === 'P3'">
      <v-checkbox v-model="choiceP3" value="Choix 1" label="Choix 1"></v-checkbox>
      <v-checkbox v-model="choiceP3" value="Choix 2" label="Choix 2"></v-checkbox>
      <v-checkbox v-model="choiceP3" value="Choix 3" label="Choix 3"></v-checkbox>
      <v-checkbox v-model="choiceP3" value="Choix 4" label="Choix 4"></v-checkbox>
    </v-container>

<!--    todo: supp test -->
    <p>analyse choisie = {{ analyseSelected }}</p>
    <p>choix P3 = {{ choiceP3 }}</p>
    <p>Store = {{ analyseStore.getValidsPpnList }}</p>
<!--    todo: supp test -->

  </v-container>
</template>

<script>
import { useAnalyseStore } from "@/stores/analyse";
import { ref } from 'vue';

export default {
  setup(){
    const analyseStore = useAnalyseStore();
    let analyseSelected = ref('P1');
    let choiceP3 = ref([]);

    return {
      analyseSelected,
      choiceP3,
      analyseStore
    }
  }
};
</script>

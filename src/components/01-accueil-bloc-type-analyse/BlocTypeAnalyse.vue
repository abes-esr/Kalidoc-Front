<template>
  <v-card class="pa-3">
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-divider></v-divider>
    <v-radio-group v-model="analyseSelected" @change="updateAnalyseSelectedInStore">
      <v-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'RAPIDE'" :value="'QUICK'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>Règles essentielles / de base</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'EXPERTE'" :value="'COMPLETE'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>Règles essentielles / avancées</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'CIBLÉE'" :value="'FOCUS'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <!--        todo changer le LOREM-->
        <span>Lorem ipsum lorem ipsum</span>
      </v-tooltip>
    </v-radio-group>
    <v-container fluid v-if="analyseSelected === 'FOCUS'" >
      <v-card-subtitle >> Par type(s) de documents</v-card-subtitle>
      <v-container class="d-flex flew-row">
        <v-checkbox v-model="familleDocumentSet" class="pa-1" @change="updateFamilleDocumentSetInStore" value="Choix 1" label="Choix 1"></v-checkbox>
        <v-checkbox v-model="familleDocumentSet" class="pa-1" @change="updateFamilleDocumentSetInStore" value="Choix 2" label="Choix 2"></v-checkbox>
        <v-checkbox v-model="familleDocumentSet" class="pa-1" @change="updateFamilleDocumentSetInStore" value="Choix 3" label="Choix 3"></v-checkbox>
      </v-container>
      <v-card-subtitle >> Par jeu(x) de règles préconçu(s) </v-card-subtitle>
      <v-checkbox v-model="ruleSet" value="Choix 1" @change="updateRuleSetInStore" label="Choix 1"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 2" @change="updateRuleSetInStore" label="Choix 2"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 3" @change="updateRuleSetInStore" label="Choix 3"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 4" @change="updateRuleSetInStore" label="Choix 4"></v-checkbox>
    </v-container>
<!--    todo: supp test -->
    <p>analyse choisie = {{ analyseSelected }}</p>
    <p>Store analyse choisie = {{ analyseStore.getAnalyseSelected }}</p>
    <p>familleDocumentSet = {{ familleDocumentSet }}</p>
    <p>Store familleDocumentSet = {{ analyseStore.getFamilleDocumentSet }}</p>
    <p>ruleSet = {{ ruleSet }}</p>
    <p>Store familleDocumentSet = {{ analyseStore.getRuleSet }}</p>
    <p>Store = {{ analyseStore.getValidsPpnList }}</p>
<!--    todo: supp test -->
  </v-card>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { ref } from 'vue';

  const analyseStore = useAnalyseStore();
  let analyseSelected = ref();
  let familleDocumentSet = ref([]);
  let ruleSet = ref([]);

  function updateAnalyseSelectedInStore() {
    analyseStore.setAnalyseSelected(analyseSelected.value);
  }
  function updateFamilleDocumentSetInStore() {
    analyseStore.setFamilleDocumentSet(familleDocumentSet.value);
  }
  function updateRuleSetInStore() {
    analyseStore.setRuleSet(ruleSet.value);
  }


</script>

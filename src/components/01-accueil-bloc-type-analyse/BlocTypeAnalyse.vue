<template>
  <v-card class="pa-3">
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-divider></v-divider>
    <v-radio-group v-model="analyseSelected">
      <v-tooltip>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'RAPIDE'" :value="'P1'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>Règles essentielles / de base</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'EXPERTE'" :value="'P2'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>Règles essentielles / avancées</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="'CIBLÉE'" :value="'P3'" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <!--        todo changer le LOREM-->
        <span>Lorem ipsum lorem ipsum</span>
      </v-tooltip>
    </v-radio-group>
    <v-container fluid v-if="analyseSelected === 'P3'">
      <v-card-subtitle >> Par type(s) de documents</v-card-subtitle>
      <v-container class="d-flex flew-row">
        <v-checkbox v-model="choiceP3" class="pa-1" value="Choix 1" label="Choix 1"></v-checkbox>
        <v-checkbox v-model="choiceP3" class="pa-1" value="Choix 2" label="Choix 2"></v-checkbox>
        <v-checkbox v-model="choiceP3" class="pa-1" value="Choix 3" label="Choix 3"></v-checkbox>
      </v-container>
      <v-card-subtitle >> Par jeu(x) de règles préconçu(s) </v-card-subtitle>
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
  </v-card>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { ref } from 'vue';

  const analyseStore = useAnalyseStore();
  let analyseSelected = ref('P1');
  let choiceP3 = ref([]);

</script>

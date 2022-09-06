<template>
  <v-card class="pa-3">
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-divider></v-divider>
    <v-radio-group style="width: 120px" v-model="analyseSelected" @change="updateAnalyseSelectedInStore">
      <v-tooltip right v-for="analyse in analysesList" :key="analyse.value">
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="analyse.label" :value="analyse" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>{{analyse.bulle}}</span>
      </v-tooltip>
    </v-radio-group>
    <v-container v-if="analyseSelected.value === 'FOCUS'" >
      <v-card-subtitle class="pa-0 ma-0">> Par type(s) de documents</v-card-subtitle>
      <v-container class="d-flex flex-wrap pa-0 ma-0">
        <v-checkbox  v-for="familleDoc in familleDocumentList" :key="familleDoc.id" v-model="familleDocumentSetSelected" class="pr-1" @change="updateFamilleDocumentSetInStore" :value="familleDoc.id" :label="familleDoc.libelle"></v-checkbox>
      </v-container>
      <v-card-subtitle class="pa-0 ma-0">> Par jeu(x) de règles préconçu(s) </v-card-subtitle>
      <v-checkbox v-for="ruleset in ruleSetList" :key="ruleset.id" v-model="ruleSetSelected" :value="ruleset.id" @change="updateRuleSetInStore" :label="ruleset.libelle"></v-checkbox>
    </v-container>
  </v-card>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { onMounted, ref } from "vue";
  import axios from "axios";

  const analyseStore = useAnalyseStore();
  const emit = defineEmits(['isSelected'])
  let analysesList = [
    {
      label: 'RAPIDE',
      value: 'QUICK',
      bulle: "Règles essentielles / de base"
    },
    {
      label: 'EXPERTE',
      value: 'COMPLETE',
      bulle: "Règles essentielles / avancées"
    },
    {
      label: 'CIBLÉE',
      value: 'FOCUS',
      bulle: "Règles personnalisées"
    },
  ];
  let familleDocumentList = ref([]);
  let ruleSetList = ref([]);

  let analyseSelected = ref('');
  let familleDocumentSetSelected = ref([]);
  let ruleSetSelected = ref([]);

  onMounted(() => {
    feedFamilleDocumentList()
    feedRuleSetList();
  })

  function feedFamilleDocumentList(){
    axios({
      method: 'get',
      url: process.env.VUE_APP_ROOT_API + 'getFamillesDocuments',
    }).then((response) => {
      response.data.forEach((el) => familleDocumentList.value.push(el));
    }).catch((error) => {
      emitOnEvent(error);
    });
  }

  function feedRuleSetList(){
    axios({
      method: 'get',
      url: process.env.VUE_APP_ROOT_API + 'getTypesAnalyses',
    }).then((response) => {
      response.data.forEach((el) => ruleSetList.value.push(el));
    }).catch((error) => {
      emitOnEvent(error);
    });
  }

  function updateAnalyseSelectedInStore() {
    analyseStore.setAnalyseSelected(analyseSelected.value);
    emitOnEvent();
  }
  function updateFamilleDocumentSetInStore() {
    analyseStore.setFamilleDocumentSet(familleDocumentSetSelected.value);
    emitOnEvent();
  }
  function updateRuleSetInStore() {
    analyseStore.setRuleSet(ruleSetSelected.value);
    emitOnEvent();
  }

  function isSelected() {
    return (analyseSelected.value !== '' && analyseSelected.value !== 'FOCUS') || (analyseSelected.value === 'FOCUS' && (familleDocumentSetSelected.value.length !== 0 || ruleSetSelected.value.length !== 0));
  }

  /** anciene fonction regroupant les valeurs saisies.*/
  function valuesSelected() {
    return {
      analyseType: analyseSelected.value,
      documentType: familleDocumentSetSelected.value,
      ruleSet: ruleSetSelected.value
    }
  }

  function emitOnEvent(){
    emit('isSelected', isSelected());
  }

</script>

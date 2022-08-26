<template>
  <v-card class="pa-3">
    <v-card-title>Sélectionner un type d'analyse</v-card-title>
    <v-divider></v-divider>
    <v-radio-group style="width: 120px" v-model="analyseSelected" @change="emitOnEvent">
      <v-tooltip right v-for="analyse in analysesList" :key="analyse.value">
        <template v-slot:activator="{ on, attrs }">
          <v-radio :label="analyse.label" :value="analyse.value" v-bind="attrs" v-on="on"></v-radio>
        </template>
        <span>{{analyse.bulle}}</span>
      </v-tooltip>
    </v-radio-group>
    <v-container fluid v-if="analyseSelected === 'FOCUS'" >
      <v-card-subtitle >> Par type(s) de documents</v-card-subtitle>
      <v-container class="d-flex flew-row">
        <v-checkbox v-for="familleDoc in familleDocumentList" :key="familleDoc.value" v-model="familleDocumentSetSelected" class="pa-1" @change="emitOnEvent" :value="familleDoc.value" :label="familleDoc.label"></v-checkbox>
      </v-container>
      <v-card-subtitle >> Par jeu(x) de règles préconçu(s) </v-card-subtitle>
      <v-checkbox v-model="ruleSet" value="Choix 1" @change="emitOnEvent" label="Choix 1"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 2" @change="emitOnEvent" label="Choix 2"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 3" @change="emitOnEvent" label="Choix 3"></v-checkbox>
      <v-checkbox v-model="ruleSet" value="Choix 4" @change="emitOnEvent" label="Choix 4"></v-checkbox>
    </v-container>
<!--    todo: supp test -->
    <p>analyse choisie = {{ analyseSelected }}</p>
    <p>Store analyse choisie = {{ analyseStore.getAnalyseSelected }}</p>
    <p>familleDocumentSet = {{ familleDocumentSetSelected }}</p>
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
  const emit= defineEmits(['valuesSelected','isSeleced'])
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
      bulle: "Lorem ipsum lorem ipsum"
    },
  ];

  let familleDocumentList = [
    //Famille AUDIOVISUEL
    {
      label: "Audiovisuel",
      value: "AUDIOVISUEL"
    },
    //FAMILLE CARTE
    {
      label: "Carte",
      value: "CARTE"
    },
//FAMILLE DOCUMENT ELECTRONIQUE
    {
      label: "Doc. Electronique",
      value: "DOCUMENT ELECTRONIQUE"
    },
//FAMILLE ENREGISTREMENT
    {
      label: "Enregistrement",
      value: "ENREGISTREMENT"
    },
//FAMILLE IMAGE
    {
      label: "Image",
      value: "IMAGE"
    },
//FAMILLE MANUSCRIT
    {
      label: "Manuscrit",
      value: "MANUSCRIT"
    },
//FAMILLE MULTIMEDIA
    {
      label: "Multimédia",
      value: "MULTIMEDIA"
    },
//FAMILLE MUSIQUE
    {
      label: "Musique",
      value: "MUSIQUE"
    },
//FAMILLE OBJET
    {
      label: "Objet",
      value: "OBJET"
    },
//FAMILLE PARTITION
    {
      label: "Partition",
      value: "PARTITION"
    },
//FAMILLE RESSOURCE CONTINUE
    {
      label: "Recource continue",
      value: "RESSOURCE CONTINUE"
    },
//FAMILLE MONOGRAPHIE
    {
      label: "Monographie",
      value: "MONOGRAPHIE"
    },
  ];
  let analyseSelected = ref('');
  let familleDocumentSetSelected = ref([]);
  let ruleSet = ref([]);

  function updateAnalyseSelectedInStore() {
    analyseStore.setAnalyseSelected(analyseSelected.value);
  }
  function updateFamilleDocumentSetInStore() {
    analyseStore.setFamilleDocumentSet(familleDocumentSetSelected.value);
  }
  function updateRuleSetInStore() {
    analyseStore.setRuleSet(ruleSet.value);
  }

  function isSelected() {
    return (analyseSelected.value !== '' && analyseSelected.value !== 'FOCUS') || (analyseSelected.value === 'FOCUS' && (familleDocumentSetSelected.value.length !== 0 || ruleSet.value.length !== 0));
  }

  function valuesSelected() {
    return {
      analyseType: analyseSelected.value,
      documentType: familleDocumentSetSelected.value,
      ruleSet: ruleSet.value
    }
  }

  function emitOnEvent(){
    emit('valuesSelected', valuesSelected());
    emit('isSelected', isSelected())
  }

</script>

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
        <v-checkbox  v-for="familleDoc in familleDocumentList" :key="familleDoc.value" v-model="familleDocumentSetSelected" class="pr-1" @change="updateFamilleDocumentSetInStore" :value="familleDoc.value" :label="familleDoc.label"></v-checkbox>
      </v-container>
      <v-card-subtitle class="pa-0 ma-0">> Par jeu(x) de règles préconçu(s) </v-card-subtitle>
      <v-checkbox v-for="ruleset in ruleSetList" :key="ruleset.value" v-model="ruleSetSelected" :value="ruleset.value" @change="updateRuleSetInStore" :label="ruleset.label"></v-checkbox>
    </v-container>
  </v-card>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { ref } from 'vue';

  const analyseStore = useAnalyseStore();
  const emit= defineEmits(['valuesSelected','isSelected'])
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
  let ruleSetList = [
    {
      value: "zone 210/214",
      label: "Zones 210/214 (Publication, production, diffusion)"
    },
    {
      value: "unm 2022",
      label: "Implémentations UNM 2022"
    },
    {
      value: "presence de $6/$7",
      label: "Translitérations (présence de $6/$7)"
    },
    {
      value: "zones de donnees codees",
      label: "Zones de données codées (1XX)"
    },
    {
      value: "zones d'indexation-matiere",
      label: "Zones d'indexation-matière (6XX)"
    },
  ];

  let analyseSelected = ref('');
  let familleDocumentSetSelected = ref([]);
  let ruleSetSelected = ref([]);

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

  function valuesSelected() {
    return {
      analyseType: analyseSelected.value,
      documentType: familleDocumentSetSelected.value,
      ruleSet: ruleSetSelected.value
    }
  }

  function emitOnEvent(){
    emit('valuesSelected', valuesSelected());
    emit('isSelected', isSelected());
  }

</script>

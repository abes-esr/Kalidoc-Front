<template>
  <v-container >
    <v-row class="ma-0 pa-0">
      <v-img class="mr-1" src="@/assets/2inBox.svg" max-height="24px" height="24px" max-width="24px" width="24px" style="margin-top: 3px"></v-img>
      <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Sélectionner un type d'analyse</span>
    </v-row>
    <v-container class="borderSelectAnalyseType">
      <v-radio-group style="width: 120px" v-model="analyseSelected" @change="updateAnalyseSelectedInStore">
        <v-tooltip right v-for="analyse in analysesList" :key="analyse.value">
          <template v-slot:activator="{ on, attrs }">
            <v-radio :label="analyse.label" :value="analyse" v-bind="attrs" v-on="on">sdf</v-radio>
          </template>
          <span>{{analyse.bulle}}</span>
        </v-tooltip>
      </v-radio-group>
      <v-container v-if="analyseSelected.value === 'FOCUS'" >
        <span class="pa-0 ma-0" style="font-size: 0.9em; color : #252C61; font-weight: bold"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par type(s) de documents</span>
        <v-container class="d-flex flex-wrap pa-0 mb-2 pl-8">
          <v-checkbox v-for="familleDoc in familleDocumentList" :key="familleDoc.value" v-model="familleDocumentSetSelected" class="ma-1" style="max-height: 30px" @change="updateFamilleDocumentSetInStore" :value="familleDoc.value" :label="familleDoc.label"></v-checkbox>
        </v-container>
        <span class="pa-0 ma-0" style="font-size: 0.9em; color : #252C61; font-weight: bold;"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par jeu(x) de règles préconçu(s) </span>
        <v-container class="d-flex flex-column pa-0 mb-2 pl-8">
          <v-checkbox v-for="ruleset in ruleSetList" :key="ruleset.value" v-model="ruleSetSelected" :value="ruleset.value" @change="updateRuleSetInStore" :label="ruleset.label" class="ma-1" style="max-height: 30px"></v-checkbox>
        </v-container>
      </v-container>
    </v-container>
  </v-container>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { ref } from 'vue';

  const analyseStore = useAnalyseStore();
  const emit = defineEmits(['isSelected'])
  let analysesList = [
    {
      label: 'RAPIDE',
      value: 'QUICK',
      bulle: "Règles essentielles"
    },
    {
      label: 'EXPERTE',
      value: 'COMPLETE',
      bulle: "Règles essentielles & règles avancées"
    },
    {
      label: 'CIBLÉE',
      value: 'FOCUS',
      bulle: "Règles filtrées par type de document et/ou par jeux de règles préconçus"
    },
  ]; //TODO ws
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
  ]; //TODO ws
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
  ]; //TODO ws

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

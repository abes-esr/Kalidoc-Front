<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-icon color="#252C61">mdi-numeric-2-box</v-icon>
      <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Sélectionner un type d'analyse</span>
    </v-row>
    <v-card flat class="borderSelectAnalyseType">
      <v-radio-group style="width: 120px" v-model="analyseSelected" @change="updateAnalyseSelectedInStore">
        <v-tooltip right v-for="analyse in analysesList" :key="analyse.value">
          <template v-slot:activator="{ on, attrs }">
            <v-radio :data-cy="analyse.value" :label="analyse.label" :value="analyse" v-bind="attrs" v-on="on"></v-radio>
          </template>
          <span>
            {{analyse.bulle}}
            <v-icon v-model="analyse.label" x-small v-if="analyse.label === 'RAPIDE'" color="white">mdi-checkbox-blank-circle</v-icon>
            <v-icon v-model="analyse.label" x-small v-if="analyse.label === 'EXPERTE'" color="white">mdi-checkbox-blank-circle-outline</v-icon>
          </span>
        </v-tooltip>
      </v-radio-group>
      <v-card flat v-if="analyseSelected.value === 'FOCUSED'" >
        <span  v-if="familleDocumentList.length > 0" class="pa-0 ma-0" style="font-size: 0.9em; color : #252C61; font-weight: bold"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par type(s) de documents</span>
        <v-card flat class="d-flex flex-wrap pa-0 mb-2 pl-8">
          <v-checkbox v-for="familleDoc in familleDocumentList" :key="familleDoc.id" :data-cy="familleDoc.id" v-model="familleDocumentSetSelected" class="ma-1" style="max-height: 30px" @change="updateFamilleDocumentSetInStore" :value="familleDoc" :label="familleDoc.libelle"></v-checkbox>
        </v-card>
        <span v-if="ruleSetList.length > 0" class="pa-0 ma-0" style="font-size: 0.9em; color : #252C61; font-weight: bold;"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par jeu(x) de règles préconçu(s) </span>
        <v-card flat class="d-flex flex-column pa-0 mb-2 pl-8">
          <v-checkbox v-for="ruleset in ruleSetList" :key="ruleset.id" :data-cy="ruleset.id" v-model="ruleSetSelected" :value="ruleset" @change="updateRuleSetInStore" :label="ruleset.libelle" class="ma-1" style="max-height: 30px"></v-checkbox>
        </v-card>
      </v-card>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { onMounted, ref } from "vue";
  import QualimarcService from "@/service/QualimarcService";

  // Store
  const analyseStore = useAnalyseStore();

  // Emit
  const emit = defineEmits(['isSelected', 'backendError'])

  // Service
  const serviceApi = QualimarcService ;

  // Data
  const analysesList = [
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
      value: 'FOCUSED',
      bulle: "Règles filtrées par type de document et/ou par jeux de règles préconçus"
    },
  ];
  const familleDocumentList = ref([]);
  const ruleSetList = ref([]);

  // Selected Data
  const analyseSelected = ref('');
  const familleDocumentSetSelected = ref([]);
  const ruleSetSelected = ref([]);

  onMounted(() => {
    feedFamilleDocumentList()
    feedRuleSetList();
  })

  function feedFamilleDocumentList(){
      serviceApi.getFamillesDocuments()
        .then((response) => {
          response.data.forEach((el) => familleDocumentList.value.push(el));
        }).catch((error) => {
          emitOnError(error);
        });
  }

  function feedRuleSetList(){
    serviceApi.getRuleSetList()
      .then((response) => {
      response.data.forEach((el) => ruleSetList.value.push(el));
    }).catch((error) => {
      emitOnError(error);
    });
  }

  function updateAnalyseSelectedInStore() {
    //RAZ de la selection
    familleDocumentSetSelected.value = [];
    analyseStore.setFamilleDocumentSet(familleDocumentSetSelected.value);
    ruleSetSelected.value = [];
    analyseStore.setRuleSet(ruleSetSelected.value);

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
    return ((analyseSelected.value.value !== '' && analyseSelected.value.value !== 'FOCUSED') || (analyseSelected.value.value === 'FOCUSED' && ((familleDocumentSetSelected.value.length > 0) || (ruleSetSelected.value.length > 0))));
  }

  function emitOnEvent(){
    emit('isSelected', isSelected());
  }
  function emitOnError(error){
    emit('backendError', error);
  }

</script>

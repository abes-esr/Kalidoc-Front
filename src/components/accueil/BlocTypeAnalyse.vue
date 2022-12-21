<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-icon color="#252C61">mdi-numeric-2-box</v-icon>
      <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Sélectionner un type d'analyse</span>
    </v-row>
    <v-sheet class="borderSelectAnalyseType">
      <v-radio-group v-model="analyseSelected" @change="updateAnalyseSelectedInStore">
        <v-tooltip right v-for="analyse in analysesList" :key="analyse.id">
          <template v-slot:activator="{ on, attrs }">
            <v-radio :label=" analyse.nbRules ? analyse.libelle + ' (' + analyse.nbRules + ' règles)':  analyse.libelle" :value="analyse" v-bind="attrs" v-on="on"></v-radio>
          </template>
          <span>
            {{ analyse.description }}
            <v-icon v-model="analyse.libelle" x-small v-if="analyse.id === 'QUICK'" color="white">mdi-checkbox-blank-circle</v-icon>
            <v-icon v-model="analyse.libelle" x-small v-if="analyse.id === 'COMPLETE'" color="white">mdi-checkbox-blank-circle-outline</v-icon>
          </span>
        </v-tooltip>
      </v-radio-group>
      <v-sheet v-if="analyseSelected.id === 'FOCUS'" >
        <span  v-if="familleDocumentList.length > 0" class="ml-2" style="font-size: 0.9em; color : #252C61; font-weight: bold"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par règles associées à un ou plusieurs types de documents</span>
        <v-sheet class="d-flex align-content-start flex-wrap pa-0 mb-2 pl-8">
          <v-checkbox
              v-for="familleDoc in familleDocumentList"
              :key="familleDoc.id"
              v-model="familleDocumentSetSelected"
              class="ma-1"
              style="max-height: 30px"
              @change="updateFamilleDocumentSetInStore"
              :value="familleDoc"
              :label=" familleDoc.libelle + ' (' + familleDoc.nbRules + ' règles)'"
          ></v-checkbox>
        </v-sheet>
        <span v-if="ruleSetList.length > 0" class="ml-2" style="font-size: 0.9em; color : #252C61; font-weight: bold;"><v-icon color="#252C61" small>mdi-chevron-right</v-icon>Par jeux de règles thématiques</span>
        <v-card flat class="d-flex flex-column pa-0 mb-2 pl-8">
          <v-checkbox v-for="ruleset in ruleSetList" :key="ruleset.id" v-model="ruleSetSelected" :value="ruleset" @change="updateRuleSetInStore" class="ma-1" style="max-height: 30px">
            <template v-slot:label>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ ruleset.libelle + ' (' + ruleset.nbRules + ' règles) ' }}</span>
                </template>
                {{ ruleset.description }}
              </v-tooltip>
            </template>
          </v-checkbox>
        </v-card>
      </v-sheet>
    </v-sheet>
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
  const analysesList = ref([]);
  const familleDocumentList = ref([]);
  const ruleSetList = ref([]);

  // Selected Data
  const analyseSelected = ref('');
  const familleDocumentSetSelected = ref([]);
  const ruleSetSelected = ref([]);

  onMounted(() => {
    feedAnalyseList()
  })

  function feedAnalyseList(){
    serviceApi.getAnalyses().then((response) => {
      analysesList.value = response.data.analyses;
      familleDocumentList.value = analysesList.value.find(analyse => analyse.id === 'FOCUS').famillesDocument;
      ruleSetList.value = analysesList.value.find(analyse => analyse.id === 'FOCUS').ruleSets;
    }).catch((error) => {
      emit('backendError', error)
    })
  }

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
    return ((analyseSelected.value.id !== '' && analyseSelected.value.id !== 'FOCUS') || (analyseSelected.value.id === 'FOCUS' && ((familleDocumentSetSelected.value.length > 0) || (ruleSetSelected.value.length > 0))));
  }

  function emitOnEvent(){
    emit('isSelected', isSelected());
  }
  function emitOnError(error){
    emit('backendError', error);
  }

</script>

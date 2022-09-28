<template>
  <v-container class="d-flex justify-center mt-0 mb-0 pt-0 pb-0">
    <v-btn @click="checkPpnWithTypeAnalyse" depressed color="#CF4A1A" class="button pr-2 mr-1" :disabled="props.isDisabled">
      <slot></slot>
      <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";
import { useResultatStore } from "@/stores/resultat";
import QualimarcService from "@/service/QualimarcService";

// Store
const analyseStore = useAnalyseStore();
const resultatStore = useResultatStore();

// Props & Emit
const props = defineProps({isDisabled: Boolean});
const emit = defineEmits(['backendError', 'finished']);

// Service
const serviceApi = QualimarcService

function checkPpnWithTypeAnalyse() {

  serviceApi.checkPpnWithTypeAnalyse(analyseStore.getPpnValidsList, analyseStore.getAnalyseSelected.value)
    .then((response) => {
        resultatStore.setResultsListArray(response.data.resultRules);
        resultatStore.setNbPpnTotal(response.data.nbPpnAnalyses);
        resultatStore.setNbPpnInconnus(response.data.nbPpnInconnus);
        resultatStore.setNbPpnErreurs(response.data.npPpnErrones);
        resultatStore.setNbPpnOk(response.data.nbPpnOk);
        emitOnFinished();
      })
    .catch((error) => {
        emitOnError(error);
    });
}

function emitOnError(error){
  emit('backendError', error);
}

function emitOnFinished(){
  emit('finished', true);
}

</script>

<style scoped>
.button {
  color:white;
}
</style>

<template>
    <v-container class="mt-0 mb-0 pt-0 pb-0" style="min-height: 10px">

    <div class="ma-0 pa-0 mb-4" style="position: relative">
      <v-btn @click="checkPpnWithTypeAnalyse" depressed color="#CF4A1A" class="button pr-2 mr-1" :disabled="props.isDisabled" :loading="spinnerActive" style="position: absolute; top: 4px; right: -10px; margin-right: 12px;">
        <slot></slot>
        <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
      </v-btn>
    </div>

  </v-container>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";
import { useResultatStore } from "@/stores/resultat";
import QualimarcService from "@/service/QualimarcService";
import {ref} from "vue";

// Store
const analyseStore = useAnalyseStore();
const resultatStore = useResultatStore();

// Props & Emit
const props = defineProps({isDisabled: Boolean});
const emit = defineEmits(['backendError', 'finished']);

// Service
const serviceApi = QualimarcService

// Spinner
let spinnerActive = ref(false);

function checkPpnWithTypeAnalyse() {
  spinnerActive.value = true;
  serviceApi.checkPpnWithTypeAnalyse(analyseStore.getPpnValidsList, analyseStore.getAnalyseSelected.value, analyseStore.getFamilleDocumentSet, analyseStore.getRuleSet)
    .then((response) => {
        resultatStore.setResultsListArray(response.data.resultRules);
        resultatStore.pushNbPpnTotal(response.data.nbPpnAnalyses);
        resultatStore.pushNbPpnInconnus(response.data.nbPpnInconnus);
        resultatStore.pushNbPpnErreurs(response.data.npPpnErrones);
        resultatStore.pushNbPpnOk(response.data.nbPpnOk);
        spinnerActive.value = false;
        emitOnFinished();
      })
    .catch((error) => {
      spinnerActive.value = false;
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

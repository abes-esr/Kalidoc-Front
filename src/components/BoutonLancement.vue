<template>
  <v-container>
    <v-container>
    <div class="ma-0 pa-0 mb-4 pt-4">
      <v-btn @click="checkPpnWithTypeAnalyse" depressed color="#CF4A1A" class="button" :disabled="props.isDisabled" :loading="spinnerActive">
        <slot></slot>
        <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
      </v-btn>
    </div>
    </v-container>
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
const spinnerActive = ref(false);

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

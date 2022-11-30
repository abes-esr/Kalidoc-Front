<template>
  <v-card flat class="ma-0 pa-0">
    <v-btn @click="checkPpnWithTypeAnalyse" depressed color="#CF4A1A" class="button" :disabled="props.isDisabled" :loading="spinnerActive">
      <slot></slot>
      <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
    </v-btn>
  </v-card>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";
import { useResultatStore } from "@/stores/resultat";
import { useHistoriqueStore } from "@/stores/historique";
import QualimarcService from "@/service/QualimarcService";
import {ref} from "vue";

// Store
const analyseStore = useAnalyseStore();
const resultatStore = useResultatStore();
const historiqueStore = useHistoriqueStore();

// Props & Emit
const props = defineProps({isDisabled: Boolean, isReplay: Boolean});
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
        resultatStore.pushRecapitulatif(
          response.data.nbPpnAnalyses,
          response.data.nbPpnInconnus,
          response.data.nbPpnErrones,
          response.data.nbPpnOk
        );
        if(props.isReplay) {
          console.log("isReplay");
          historiqueStore.pushReplayedResultatToLastHistorique(
            resultatStore.getLastRecapitulatif
          );
        } else {
          console.log("isNotReplay");
          historiqueStore.createNewHistorique(
              {
                ppnValidsList: analyseStore.getPpnValidsList,
                ppnInvalidsList: analyseStore.getPpnInvalidsList,
                analyseSelected : analyseStore.getAnalyseSelected.value,
                familleDocumentSet : analyseStore.getFamilleDocumentSet,
                ruleSet : analyseStore.getRuleSet,
              },
              resultatStore.getLastRecapitulatif
          );
        }


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

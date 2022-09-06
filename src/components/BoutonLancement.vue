<template>
  <v-container class="d-flex justify-center mt-0 mb-0 pt-0 pb-0">
    <v-btn @click="launchRequest" depressed color="#CF4A1A" class="button pr-2 mr-1" :disabled="props.isDisabled">
      <slot></slot>
      <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>

import {useAnalyseStore} from "@/stores/analyse";
import axios from "axios";
import { useResultatStore } from "@/stores/resultat";

const analyseStore = useAnalyseStore(); //Store
const resultatStore = useResultatStore();

const props = defineProps({isDisabled: Boolean});
const emit = defineEmits(['onClick', 'backendError', 'finished']);

function launchRequest() {
  axios({
    method: 'post',
    url: process.env.VUE_APP_ROOT_API + 'check',
    data: {
      ppnList: analyseStore.getPpnValidsList,
      typeAnalyse: analyseStore.getAnalyseSelected.value
    }
  }).then((response) => {
    resultatStore.setResultsListArray(response.data.resultRules);
    resultatStore.setNbPpnTotal(response.data.nbPpnAnalyses);
    resultatStore.setNbPpnInconnus(response.data.nbPpnInconnus);
    resultatStore.setNbPpnErreurs(response.data.npPpnErrones);
    resultatStore.setNbPpnOk(response.data.nbPpnOk);
    emitOnFinished();
  }).catch((error) => {
    emitOnEvent(error);
  });
}

function emitOnEvent(error){
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

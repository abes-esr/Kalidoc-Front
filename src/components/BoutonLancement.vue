<template>
  <v-btn @click="launchRequest" depressed color="#CF4A1A" class="button pr-2 mr-1" :disabled="props.isDisabled">
    <slot></slot>
    <img src="@/assets/arrow.png" class="ml-2" width="22px" height="22px">
  </v-btn>
</template>

<script setup>

import {useAnalyseStore} from "@/stores/analyse";
import axios from "axios";

const analyseStore = useAnalyseStore(); //Store

const props = defineProps({isDisabled: Boolean});
const emit = defineEmits(["onClick"]);
const apiUrl = 'http://localhost:8082/api/v1/';
let json = {"ppnList":["143519379"],"typeAnalyse":"QUICK"};

function launchRequest() {
  console.log("appel axios")

  axios({
    method: 'post',
    url: apiUrl + 'check',
    data: json
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error);
  });

  //todo: Adapter l'appel des setters avec le retour de l'appel axios
  analyseStore.setNbPpnTotal(5);
  analyseStore.setNbPpnTrouves(9);
  analyseStore.setNbPpnErreurs(5);
  analyseStore.setNbPpnOk(4);
}

</script>

<style scoped>
.button {
  color:white;
}
</style>

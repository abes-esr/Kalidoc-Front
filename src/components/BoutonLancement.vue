<template>
  <v-btn @click="launchRequest" depressed color="#CF4A1A" class="button pr-2 mr-1" :disabled="props.isDisabled">
    <slot></slot>
    <img src="@/assets/arrow.png" class="ml-2" width="22px" height="22px">
  </v-btn>
</template>

<script setup>

import {useAnalyseStore} from "@/stores/analyse";

const analyseStore = useAnalyseStore(); //Store

const props = defineProps({isDisabled: Boolean});
const emit = defineEmits(["onClick"]);

function launchRequest() {
  console.log("appel axios")
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
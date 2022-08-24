<template>
  <v-container>
    <p>{{analyseStore.getValidsPpnList.length}}</p>
    <v-btn depressed color="primary" v-if="analyseStore.getValidsPpnList.length !== 0">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="analyseStore.getValidsPpnList.length === 0" disabled>Lancer l'analyse</v-btn>
  </v-container>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";

    const analyseStore = useAnalyseStore(); //Store

    function launchRequest(){}
</script>

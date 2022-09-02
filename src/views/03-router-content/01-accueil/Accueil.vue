<template>
  <v-container>
    <bloc-type-analyse @isSelected="setIsAnalyseSelected"></bloc-type-analyse>
    <bloc-recherche-par-ppn @isPpnListEmpty="setIsPpnListIsEmpty"></bloc-recherche-par-ppn>
    <bloc-recherche-par-fichier-ppn></bloc-recherche-par-fichier-ppn>
    <v-btn @click="launchRequest" depressed color="primary" v-if="!isPpnListIsEmpty && isAnalyseSelected">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="isPpnListIsEmpty || !isAnalyseSelected" disabled>Lancer l'analyse</v-btn>
  </v-container>
</template>

<script setup>
import BlocTypeAnalyse from "@/components/01-accueil-bloc-type-analyse/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParFichierPpn";

import { useAnalyseStore } from "@/stores/analyse";
import { ref } from 'vue';

    const analyseStore = useAnalyseStore(); //Store
    let isAnalyseSelected = ref(false);
    let isPpnListIsEmpty = ref(true);

    /**
     *
     * @param booleanInBlocTypeAnalyseEmited
     */
    function setIsAnalyseSelected(booleanInBlocTypeAnalyseEmited){
      isAnalyseSelected.value = booleanInBlocTypeAnalyseEmited;
    }

    /**
     *
     * @param booleanInBlocRechercheParPpn
     */
    function setIsPpnListIsEmpty(booleanInBlocRechercheParPpn){
      isPpnListIsEmpty.value = booleanInBlocRechercheParPpn;
    }

    function launchRequest(){
      console.log("appel axios")
    }
</script>
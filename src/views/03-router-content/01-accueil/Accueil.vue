<template>
  <v-container>
    <bloc-type-analyse @isSelected="setIsAnalyseSelected" @valuesSelected="setAnalyseSelected"></bloc-type-analyse>
    <bloc-recherche-par-ppn></bloc-recherche-par-ppn>
    <bloc-recherche-par-fichier-ppn></bloc-recherche-par-fichier-ppn>
    <v-btn @click="launchRequest" depressed color="primary" v-if="analyseStore.getValidsPpnList.length !== 0">Lancer l'analyse</v-btn>
    <v-btn depressed color="error" v-if="analyseStore.getValidsPpnList.length === 0" disabled>Lancer l'analyse</v-btn>
  </v-container>
</template>

<script setup>
import BlocTypeAnalyse from "@/components/01-accueil-bloc-type-analyse/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParFichierPpn";

import { useAnalyseStore } from "@/stores/analyse";
import axios from "axios";

    const analyseStore = useAnalyseStore(); //Store
    const apiUrl = 'http://diplotaxis1-dev.v212.abes.fr:11081';
    let ppn = 143519379;
    let isAnalyseSelected = false;
    let analyseSelected = {};

    function setIsAnalyseSelected(payload){
      isAnalyseSelected = payload;
    };

    function setAnalyseSelected(payload){
      analyseSelected = payload;
    };

    function launchRequest(){
      axios.get(apiUrl + '/api/v1/' + ppn)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };
</script>

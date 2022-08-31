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
import axios from "axios";
import { ref } from 'vue';

    const analyseStore = useAnalyseStore(); //Store
    const apiUrl = 'http://diplotaxis1-dev.v212.abes.fr:11081';
    let json = {"ppnList":["143519379"],"typeAnalyse":"QUICK","famillesDocuments":null,"rules":null};
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

      /*
      axios.post(apiUrl + '/api/v1/check' + json)
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
      */

      axios({
        method: 'post',
        url: apiUrl + '/api/v1/check',
        data: json
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error);
      });
    }
</script>

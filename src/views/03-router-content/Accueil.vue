<template>
  <v-container>
    <bloc-type-analyse @isSelected="setIsAnalyseSelected"></bloc-type-analyse>
    <bloc-recherche-par-ppn @isPpnListEmpty="setIsPpnListIsEmpty"></bloc-recherche-par-ppn>
    <bloc-recherche-par-fichier-ppn></bloc-recherche-par-fichier-ppn>
    <bouton-lancement :isDisabled="(isPpnListIsEmpty || !isAnalyseSelected)">Lancer l'analyse</bouton-lancement>
    <!-- a supprimer lorsque appel axios implémenté -->
    <v-btn @click="test">Aller à la page de résultats</v-btn>
  </v-container>
</template>
<script setup>
import BlocTypeAnalyse from "@/components/accueil/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/accueil/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/accueil/BlocRechercheParFichierPpn";
import BoutonLancement from "@/components/BoutonLancement";

import {useAnalyseStore} from "@/stores/analyse";
import {ref} from 'vue';
import router from "@/router";

const analyseStore = useAnalyseStore(); //Store
let isAnalyseSelected = ref(false);
let isPpnListIsEmpty = ref(true);

/**
 *
 * @param booleanInBlocTypeAnalyseEmited
 */
function setIsAnalyseSelected(booleanInBlocTypeAnalyseEmited) {
  isAnalyseSelected.value = booleanInBlocTypeAnalyseEmited;
}

/**
 *
 * @param booleanInBlocRechercheParPpn
 */
function setIsPpnListIsEmpty(booleanInBlocRechercheParPpn) {
  isPpnListIsEmpty.value = booleanInBlocRechercheParPpn;
}

/**
 * A supprimer lorsqu'appel axios implémenté
 */
function test() {
  analyseStore.setNbPpnTotal(10);
  analyseStore.setNbPpnTrouves(9);
  analyseStore.setNbPpnErreurs(5);
  analyseStore.setNbPpnOk(4);
  router.push('/resultats')
}
</script>
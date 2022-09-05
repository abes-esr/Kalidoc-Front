<template>
  <v-container>
    <message-erreur :backendErrorMessage="backendErrorMessage"></message-erreur>
    <bloc-type-analyse @isSelected="setIsAnalyseSelected"></bloc-type-analyse>
    <bloc-recherche-par-ppn @isPpnListEmpty="setIsPpnListIsEmpty"></bloc-recherche-par-ppn>
    <bloc-recherche-par-fichier-ppn></bloc-recherche-par-fichier-ppn>
    <bouton-lancement :isDisabled="(isPpnListIsEmpty || !isAnalyseSelected)" @backendError="setBackendError" @finished="redirect">Lancer l'analyse</bouton-lancement>
  </v-container>
</template>
<script setup>
import BlocTypeAnalyse from "@/components/accueil/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/accueil/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/accueil/BlocRechercheParFichierPpn";
import BoutonLancement from "@/components/BoutonLancement";
import MessageErreur from "@/components/MessageErreur";
import {ref} from 'vue';
import router from "@/router";

let isAnalyseSelected = ref(false);
let isPpnListIsEmpty = ref(true);
let backendErrorMessage = ref(null);

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

function setBackendError(error) {
  backendErrorMessage.value = error;
}

function redirect() {
  console.log('redirection');
  router.push('/resultats');
}
</script>

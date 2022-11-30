<template>
  <v-container fluid>
    <div class="ml-1 mb-2 fontPrimaryColor">Outil d'analyse des notices bibliographiques du Sudoc</div>
    <v-row>
      <v-col class="ma-2 pa-2" style="min-height: 34em;">
        <v-row class="ma-0 pa-0">
          <v-icon color="#252C61">mdi-numeric-1-box</v-icon>
          <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Ajouter des PPN</span>
        </v-row>
        <div class="borderBlocElements">
          <bloc-recherche-par-ppn class="mb-0 pa-0" @isPpnListEmpty="setIsPpnListIsEmpty"></bloc-recherche-par-ppn>
          <bloc-recherche-par-fichier-ppn class="mb-2 pa-0"></bloc-recherche-par-fichier-ppn>
        </div>
      </v-col>
      <v-col class="ma-2 pa-2" style="min-height: 34em">
        <bloc-type-analyse class="mb-2 pa-0" @isSelected="setIsAnalyseSelected" @backendError="setBackendError"></bloc-type-analyse>
        <message-erreur class="mb-2 pa-4" :backendErrorMessage="backendErrorMessage"></message-erreur>
        <bouton-lancement class="mb-2 pa-0" :isDisabled="(isPpnListIsEmpty || !isAnalyseSelected)" @backendError="setBackendError" @finished="redirect">Lancer l'analyse</bouton-lancement>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BlocTypeAnalyse from "@/components/accueil/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/accueil/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/accueil/BlocRechercheParFichierPpn";
import BoutonLancement from "@/components/BoutonLancement";
import MessageErreur from "@/components/MessageErreur";
import {onMounted, ref} from 'vue';
import router from "@/router";
import {useResultatStore} from "@/stores/resultat";
import {useAnalyseStore} from "@/stores/analyse";

const isAnalyseSelected = ref(false);
const isPpnListIsEmpty = ref(true);
const backendErrorMessage = ref(null);

const resultatStore = useResultatStore();
const analyseStore = useAnalyseStore();

onMounted(() => {
  resultatStore.$reset();
  analyseStore.$reset();
});

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
  router.push('/resultats');
}
</script>

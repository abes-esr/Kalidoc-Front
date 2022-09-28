<template>
  <v-container fluid>
    <v-container class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
    <v-icon>mdi-home</v-icon>
    <v-icon size="small">mdi-chevron-right</v-icon>
      <span style="color: grey; text-decoration: none">Interface de vérification</span>
    <v-icon size="small">mdi-chevron-right</v-icon>
    Résultats de l'analyse
    </v-container>
    <v-row cols="12">
      <v-col xs="12" sm="12" md="6" lg="6" xl="6"><BlocAffichageResume @onChangePpn="sendPpnToBlocDetail"></BlocAffichageResume></v-col>
      <v-col xs="12" sm="12" md="6" lg="6" xl="6">
        <bloc-detail-ppn :currentPpn="currentPpn"></bloc-detail-ppn>
        <bloc-recapitulatif class="pl-1 pr-1" style="min-height: 13em" ></bloc-recapitulatif>
        <bouton-lancement style="min-height: 2em" @onClick="refreshRecap">Relancer l'analyse</bouton-lancement>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

import BlocRecapitulatif from "@/components/resultats/BlocRecapitulatif";
import BlocAffichageResume from "@/components/resultats/BlocAffichageResume";
import BoutonLancement from "@/components/BoutonLancement";
import BlocDetailPpn from "@/components/resultats/BlocDetailPpn";

import {ref} from "vue";

let currentPpn = ref('');

function sendPpnToBlocDetail(ppn) {
  currentPpn.value = ppn;
}

function refreshRecap() {

}
</script>
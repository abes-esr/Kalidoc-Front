<template>
  <v-container fluid>
    <v-row>
      <v-col><bloc-rappel-type-analyse></bloc-rappel-type-analyse></v-col>
    </v-row>
    <v-row>
      <v-col><v-card class="secondary" height="150%"></v-card></v-col>
      <v-col>
        <v-card height="75%" class="primary"></v-card>
        <bloc-recapitulatif height="75%"></bloc-recapitulatif>
        <bouton-lancement @onClick="refreshRecap">Relancer l'analyse</bouton-lancement>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
import BlocRecapitulatif from "@/components/resultats/BlocRecapitulatif";
import BoutonLancement from "@/components/BoutonLancement";

function refreshRecap() {

}
</script>
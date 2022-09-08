<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6"><v-card class="secondary" style="min-height: 34em"></v-card></v-col>
      <v-col cols="6">
        <v-card class="primary" style="min-height: 18.7em" ></v-card>
        <bloc-recapitulatif style="min-height: 13em" ></bloc-recapitulatif>
        <bouton-lancement style="min-height: 2em" @onClick="refreshRecap">Relancer l'analyse</bouton-lancement>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

import BlocRecapitulatif from "@/components/resultats/BlocRecapitulatif";
import BoutonLancement from "@/components/BoutonLancement";

function refreshRecap() {

}
</script>
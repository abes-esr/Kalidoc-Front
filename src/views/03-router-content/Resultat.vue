<template>
  <v-container fluid>
    <v-container class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
    <v-icon>mdi-home</v-icon>
    <v-icon size="small">mdi-chevron-right</v-icon>
      <router-link to="/" style="color: grey; text-decoration: none">Interface de vérification</router-link>
    <v-icon size="small">mdi-chevron-right</v-icon>
    Résultats de l'analyse
    </v-container>
<!--    VERSION NAVIGATEUR -->
    <v-row cols="12" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
      <v-col cols="6"><v-card class="secondary" style="min-height: 34em"></v-card></v-col>
      <v-col cols="6">
        <v-card class="primary" style="min-height: 18.7em" ></v-card>
        <bloc-recapitulatif class="pl-1 pr-1" style="min-height: 13em" ></bloc-recapitulatif>
        <bouton-lancement style="min-height: 2em" @onClick="refreshRecap">Relancer l'analyse</bouton-lancement>
      </v-col>
    </v-row>
<!--    VERSION MOBILE && TABLETTE -->
    <v-row cols="12" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
      <v-col cols="12"><v-card class="secondary" style="min-height: 34em"></v-card></v-col>
      <v-col cols="12">
        <v-card class="primary" style="min-height: 18.7em" ></v-card>
        <bloc-recapitulatif class="pl-1 pr-1" style="min-height: 13em" ></bloc-recapitulatif>
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
<template>
  <v-container fluid>
    <v-card flat class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
      <v-icon @click="goToHome()">mdi-home</v-icon>
      <v-icon size="small">mdi-chevron-right</v-icon>
      <span class="v-slider__thumb" style="color: grey; text-decoration: none">
        Historique des analyses
      </span>
    </v-card>
    <BlocHistorique></BlocHistorique>
<!--    emplacement du composant historique   -->
  </v-container>
</template>

<script setup>
import router from "@/router";
import BlocHistorique from "@/components/historique/BlocHistorique";

function goToHome() {
  router.push('/');
}
</script>
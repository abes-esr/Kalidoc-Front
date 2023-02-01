<template>
  <v-container fluid>
    <div class="ma-0 pa-0 mb-2" style="color: #595959; font-size: 0.9em">
      <v-icon @click="goToHome()" color="#595959" aria-label="Retourner à l'interface de vérification" style="vertical-align: bottom">mdi-home</v-icon>
      <v-icon size="small" color="#595959">mdi-chevron-right</v-icon>
      <span @click="goToHome()" class="v-slider__thumb" style="color: #595959; text-decoration: none"> Interface de vérification</span>
      <v-icon size="small" color="#595959">mdi-chevron-right</v-icon>
      Historique des analysess
    </div>
    <BlocHistorique></BlocHistorique>
  </v-container>
</template>

<script setup>
import router from "@/router";
import BlocHistorique from "@/components/historique/BlocHistorique";

function goToHome() {
  router.push('/');
}
</script>

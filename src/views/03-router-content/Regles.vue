<template>
  <v-container fluid>
    <nav class="ma-0 pa-0 mb-2" style="color: #595959; font-size: 0.9em">
      <v-icon @click="goToHome()" aria-label="Retourner à l'interface de vérification" role="img" color="#595959" style="vertical-align: bottom">mdi-home</v-icon>
      <v-icon size="small" color="#595959">mdi-chevron-right</v-icon>
      <span aria-label="Vous êtes sur la page de visualisation des règles" role="img">
        Table générale des règles
      </span>
    </nav>
    <bloc-regles></bloc-regles>
  </v-container>
</template>

<script setup>
import router from "@/router";
import BlocRegles from "@/components/regles/BlocRegles";

function goToHome() {
  router.push('/');
}
</script>

<style>

</style>

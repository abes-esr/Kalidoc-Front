<template>
  <v-container fluid>
    <v-card flat class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
      <v-icon @click="goToHome()">mdi-home</v-icon>
      <v-icon size="small">mdi-chevron-right</v-icon>
      <span class="v-slider__thumb" style="color: grey; text-decoration: none">
        Interface des règles
        <v-icon size="small">mdi-chevron-right</v-icon>
        Table générale des règles
      </span>
    </v-card>
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
<template>
  <v-container fluid>
    <v-container class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
      <v-icon @click="goToHome()">mdi-home</v-icon>
      <v-icon size="small">mdi-chevron-right</v-icon>
      <span class="v-slider__thumb" style="color: grey; text-decoration: none">Interface des règles
            <v-icon size="small">mdi-chevron-right</v-icon>
            Table générale des règles
      </span>
    </v-container>
    <block-regles></block-regles>

    </v-container>

</template>

<script setup>
import router from "@/router";
import BlockRegles from "@/components/regles/BlockRegles";

function goToHome() {
  router.push('/');
}
</script>

<style>

</style>
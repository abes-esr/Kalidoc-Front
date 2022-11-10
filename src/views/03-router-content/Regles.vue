<template>
  <v-container fluid>
    <v-container class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
      <v-icon @click="goToHome()">mdi-home</v-icon>
      <v-icon size="small">mdi-chevron-right</v-icon>
      <span @click="goToHome()" class="v-slider__thumb" style="color: grey; text-decoration: none">Interface des règles</span>
    </v-container>
  </v-container>
</template>

<script setup>
import router from "@/router";


function goToHome() {
  router.push('/');
}
</script>

<style scoped>

</style>
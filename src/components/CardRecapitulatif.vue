<template>
  <v-sheet class="pa-5">
    <v-row class="d-flex justify-space-between align-center">
      <slot></slot>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. total de PPN analysés :</span> <v-btn elevation="0" class="button" x-small color="#0F75BC">{{ resultats.PpnTotal.length }}</v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de PPN avec erreurs :</span> <v-btn elevation="0" class="button" x-small color="#0F75BC">{{ resultats.PpnErreurs.length }}</v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de PPN sans erreurs :</span> <v-btn elevation="0" class="button" x-small color="#0F75BC">{{ resultats.PpnOk.length }}</v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de ppn non trouvés :</span> <v-btn elevation="0" class="button" x-small color="#0F75BC">{{ resultats.PpnInconnus.length }}</v-btn>
    </v-row>
  </v-sheet>
</template>
<script setup>
const props = defineProps({
  // props
  'resultats': {
    type: Object,
    required: true
  }
});
</script>
<style scoped>
.button {
  color:white;
}
</style>
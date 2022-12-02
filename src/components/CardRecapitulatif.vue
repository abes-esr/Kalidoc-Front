<template>
  <v-sheet class="pa-5 mb-1" style="width: 18em">
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

    <!--      REFLEXION SUR UNE AUTRE MANIERE DE CODE LA MISE EN FORME DES ELEMENTS DU CARD RECAPITULATIF     -->
    <!--                        <v-col class="d-flex align-start flex-column ma-0 pa-0 pl-2" style="border-left: 2px solid lightgrey; width: 220px; max-width: 220px">-->
    <!--                          <span>Nb. total de PPN analysés :</span>-->
    <!--                          <span>Nb. de PPN avec erreurs :</span>-->
    <!--                          <span>Nb. de PPN sans erreurs :</span>-->
    <!--                          <span>Nb. de ppn non trouvés :</span>-->
    <!--                        </v-col>-->
    <!--                        <v-col class="d-flex align-start flex-column ma-0 pa-0" style="width: 70px; max-width: 70px">-->
    <!--                          <v-btn class="mb-1" x-small color="blue">{{ result.ppnTotal.length }}</v-btn>-->
    <!--                          <v-btn class="mb-1" x-small color="blue">{{ result.ppnErreurs.length }}</v-btn>-->
    <!--                          <v-btn class="mb-1" x-small color="blue">{{ result.ppnOk.length }}</v-btn>-->
    <!--                          <v-btn class="mb-1" x-small color="blue">{{ result.ppnInconnus.length }}</v-btn>-->
    <!--                        </v-col>-->

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
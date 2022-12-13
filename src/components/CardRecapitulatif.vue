<template>
  <v-sheet class="pa-5 mb-1" style="width: 18em">
    <v-row class="d-flex justify-space-between align-center">
      <slot></slot>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. total de PPN analysés :</span>
      <v-btn :disabled="resultats.PpnTotal.length === 0" elevation="0" class="button" x-small color="#0F75BC">
        <download-csv :delimiter="';'" :data="itemsToExport(resultats.PpnTotal)" name="ppn_analyses.csv">
          {{ resultats.PpnTotal.length }}
        </download-csv>
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de PPN avec erreurs :</span>
      <v-btn :disabled="resultats.PpnErreurs.length === 0" elevation="0" class="button" x-small color="#0F75BC">
        <download-csv :delimiter="';'" :data="itemsToExport(resultats.PpnErreurs)" name="ppn_avec_erreurs.csv">
          {{ resultats.PpnErreurs.length }}
        </download-csv>
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de PPN sans erreurs :</span>
      <v-btn :disabled="resultats.PpnOk.length === 0" elevation="0" class="button" x-small color="#0F75BC">
        <download-csv :delimiter="';'" :data="itemsToExport(resultats.PpnOk)" name="ppn_sans_erreur.csv">
          {{ resultats.PpnOk.length }}
        </download-csv>
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-space-between align-center">
      <span>Nb. de ppn non trouvés :</span>
      <v-btn :disabled="resultats.PpnInconnus.length === 0" elevation="0" class="button" x-small color="#0F75BC">
        <download-csv :delimiter="';'" :data="itemsToExport(resultats.PpnInconnus)" name="ppn_inconnus.csv">
          {{ resultats.PpnInconnus.length }}
        </download-csv>
      </v-btn>
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
    type: [],
    required: true
  }
});

function itemsToExport(items) {
  let itemsToExport = [];
  items.forEach(ppn => {
    itemsToExport.push({'ppn':ppn});
  })
  return itemsToExport;
}
</script>
<style scoped>
.button {
  color:white;
}
</style>
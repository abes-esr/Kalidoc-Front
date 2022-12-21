<template>
  <v-row class="d-flex align-center" style="min-width: 330px">
    <v-col style="color: lightgrey; font-weight: 400; font-size: 1.2em; width: 40px; max-width: 40px"><slot></slot></v-col>
    <v-sheet style="border-left: 2px solid lightgrey; width: 18em" class="pa-5 mb-1" >

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
    </v-sheet>
  </v-row>
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
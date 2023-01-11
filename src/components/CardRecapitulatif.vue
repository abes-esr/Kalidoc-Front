<template>
  <v-row class="d-flex align-center" style="min-width: 330px">
    <v-col style="color: lightgrey; font-weight: 400; font-size: 1.2em; width: 40px; max-width: 40px"><slot></slot></v-col>
    <v-sheet style="border-left: 2px solid lightgrey; width: 18em" class="pa-5 mb-1" >

      <v-row class="d-flex justify-space-between align-center">
        <span>Nb. total de PPN analysés :</span>
        <v-btn :disabled="resultatsToDisplay.PpnTotal.length === 0" elevation="0" class="button" x-small color="#0F75BC">
          <download-csv :delimiter="';'" :data="itemsToExport(resultatsToDisplay.PpnTotal)" name="ppn_analyses.csv">
            {{ resultatsToDisplay.PpnTotal.length }}
          </download-csv>
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-space-between align-center">
        <span>Nb. de PPN avec erreurs :</span>
        <v-btn :disabled="resultatsToDisplay.PpnErreurs.length === 0" elevation="0" class="button" x-small color="#0F75BC">
          <download-csv :delimiter="';'" :data="itemsToExport(resultatsToDisplay.PpnErreurs)" name="ppn_avec_erreurs.csv">
            {{ resultatsToDisplay.PpnErreurs.length }}
          </download-csv>
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-space-between align-center">
        <span>Nb. de PPN sans erreur :</span>
        <v-btn :disabled="resultatsToDisplay.PpnOk.length === 0" elevation="0" class="button" x-small color="#0F75BC">
          <download-csv :delimiter="';'" :data="itemsToExport(resultatsToDisplay.PpnOk)" name="ppn_sans_erreur.csv">
            {{ resultatsToDisplay.PpnOk.length }}
          </download-csv>
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-space-between align-center">
        <span>Nb. de PPN non trouvés :</span>
        <v-btn :disabled="resultatsToDisplay.PpnInconnus.length === 0" elevation="0" class="button" x-small color="#0F75BC">
          <download-csv :delimiter="';'" :data="itemsToExport(resultatsToDisplay.PpnInconnus)" name="ppn_inconnus.csv">
            {{ resultatsToDisplay.PpnInconnus.length }}
          </download-csv>
        </v-btn>
      </v-row>
    </v-sheet>
  </v-row>
</template>
<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  // props
  'resultats': {
    type: [],
    required: true
  }
});

const resultatsToDisplay = ref({
  PpnTotal: [],
  PpnErreurs: [],
  PpnOk: [],
  PpnInconnus: []
});

onMounted(() => {
  resultatsToDisplay.value = props.resultats;
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
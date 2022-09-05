<template>
  <v-container>
    <v-card flat tile class="titleBar">Récapitulatif</v-card>
    <v-card flat style="color:#252C61;">
      <v-card-title class="pb-0" style="font-weight: bold;">Analyse en cours</v-card-title>
      <v-container class="d-flex align-start flex-column pt-0">
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. total de PPN analysés</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              nbPpnTotal
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de PPN avec erreurs</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              nbPpnErreurs
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de PPN sans erreurs</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              nbPpnOk
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de ppn trouvés</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              nbPpnTrouves
            }}
          </v-chip>
        </v-container>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import {useAnalyseStore} from "@/stores/analyse";
import {ref} from 'vue';

const analyseStore = useAnalyseStore();

const nbPpnTotal = ref(getNbPpnTotal());
const nbPpnTrouves = ref(getNbPpnTrouves());
const nbPpnErreurs = ref(getNbPpnErreurs());
const nbPpnOk = ref(getNbPpnOk());

function getNbPpnTotal() {
  return analyseStore.getNbPpnTotal;
}

function getNbPpnTrouves() {
  return analyseStore.getNbPpnTrouves;
}

function getNbPpnErreurs() {
  return analyseStore.getNbPpnErreurs;
}

function getNbPpnOk() {
  return analyseStore.getNbPpnOk;
}


</script>

<style scoped>
.titleBar {
  border-bottom-style: solid;
  border-color: #252C61;
  border-bottom-width:5px;
  font-size: 30px;
  font-weight:bold;
  color: #252C61
}
.numberValue {
  width: 59px;
  opacity: unset;
  justify-content: right;
}
</style>
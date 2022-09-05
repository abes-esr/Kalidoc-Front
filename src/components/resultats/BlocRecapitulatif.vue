<template>
  <v-container>
    <v-card flat tile class="titleBar">Récapitulatif</v-card>
    <v-card flat style="color:#252C61;">
      <v-card-title class="pb-0" style="font-weight: bold;">Analyse en cours</v-card-title>
      <v-container class="d-flex align-start flex-column pt-0">
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. total de PPN analysés</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              getNbPpnTotal()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de PPN avec erreurs</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              getNbPpnErreurs()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de PPN sans erreurs</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              getNbPpnOk()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pb-0"><span>Nb. de ppn non trouvés</span>
          <v-chip class="numberValue" label disabled text-color="white" color="#0F75BC">{{
              getNbPpnInconnus()
            }}
          </v-chip>
        </v-container>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>


import { useResultatStore } from "@/stores/resultat";

const resultatStore = useResultatStore();

function getNbPpnTotal() {
  return resultatStore.getNbPpnTotal;
}

function getNbPpnInconnus() {
  return resultatStore.getNbPpnInconnus;
}

function getNbPpnErreurs() {
  return resultatStore.getNbPpnErreurs;
}

function getNbPpnOk() {
  return resultatStore.getNbPpnOk;
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

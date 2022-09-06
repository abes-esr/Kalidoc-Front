<template>
  <v-container>
    <v-card flat style="color:#252C61;">
      <v-card-title class="d-flex justify-center pt-1 pb-2" style="font-weight: bold; font-size: 1.6em;">Récapitulatif</v-card-title>
      <v-card-subtitle class="d-flex justify-center pt-1 pb-2 mb-0"><bloc-rappel-type-analyse></bloc-rappel-type-analyse></v-card-subtitle>
      <v-container class="d-flex align-start flex-column pt-0 pb-1 mt-0">
        <v-container class="d-flex justify-center pt-0 pb-0 mt-0 mb-2" style="max-width: 350px; border-bottom-style: solid; border-color: #252c61; border-bottom-width:2px;"></v-container>
        <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em"><span>Nb. total de PPN analysés</span>
          <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
              getNbPpnTotal()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em"><span>Nb. de PPN avec erreurs</span>
          <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC" >{{
              getNbPpnErreurs()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em"><span>Nb. de PPN sans erreurs</span>
          <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
              getNbPpnOk()
            }}
          </v-chip>
        </v-container>
        <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em"><span>Nb. de ppn non trouvés</span>
          <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
              getNbPpnInconnus()
            }}
          </v-chip>
        </v-container>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>

import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
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
.numberValue {
  width: 59px;
  opacity: unset;
  justify-content: right;
}
</style>

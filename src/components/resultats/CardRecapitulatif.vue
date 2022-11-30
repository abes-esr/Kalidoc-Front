<template>
  <v-card flat>
    <v-card-text>
      <v-card flat class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Analyse n°{{numeroLancement}}</span>
      </v-card>
      <v-card flat  class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. total de PPN analysés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnTotal(numeroLancement - 1)
          }}
        </v-chip>
      </v-card>
      <v-card flat class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN avec erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnErreurs(numeroLancement - 1)
          }}
        </v-chip>
      </v-card>
      <v-card flat class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN sans erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnOk(numeroLancement - 1)
          }}
        </v-chip>
      </v-card>
      <v-card flat class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de ppn non trouvés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnInconnus(numeroLancement - 1)
          }}
        </v-chip>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script setup>

import {useResultatStore} from "@/stores/resultat";

const props = defineProps({
  // props
  'numeroLancement': {
    type: Number,
    required: true
  }
});

const resultatStore = useResultatStore();

function getNbPpnTotal(numeroLancement) {
  return resultatStore.getRecapitulatif[numeroLancement].nbPpnTotal;
}

function getNbPpnInconnus(numeroLancement) {
  return resultatStore.getRecapitulatif[numeroLancement].nbPpnInconnus;
}

function getNbPpnErreurs(numeroLancement) {
  return resultatStore.getRecapitulatif[numeroLancement].nbPpnErreurs;
}

function getNbPpnOk(numeroLancement) {
  return resultatStore.getRecapitulatif[numeroLancement].nbPpnOk;
}
</script>
<style scoped>
.numberValue {
  width: 59px;
  opacity: unset;
  justify-content: right;
}
</style>
<template>
  <v-card flat>
    <v-card-text>
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Analyse n°{{numeroLancement}}</span>
      </v-container>
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. total de PPN analysés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnTotal(numeroLancement - 1)
          }}
        </v-chip>
      </v-container>
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN avec erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnErreurs(numeroLancement - 1)
          }}
        </v-chip>
      </v-container>
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN sans erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnOk(numeroLancement - 1)
          }}
        </v-chip>
      </v-container>
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de ppn non trouvés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnInconnus(numeroLancement - 1)
          }}
        </v-chip>
      </v-container>
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
  return resultatStore.getNbPpnTotal[numeroLancement];
}

function getNbPpnInconnus(numeroLancement) {
  return resultatStore.getNbPpnInconnus[numeroLancement];
}

function getNbPpnErreurs(numeroLancement) {
  return resultatStore.getNbPpnErreurs[numeroLancement];
}

function getNbPpnOk(numeroLancement) {
  return resultatStore.getNbPpnOk[numeroLancement];
}
</script>
<style scoped>
.numberValue {
  width: 59px;
  opacity: unset;
  justify-content: right;
}
</style>
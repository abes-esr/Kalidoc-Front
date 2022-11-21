<template>
  <v-card flat>
    <v-card-title>
       {{numeroLancement}}
    </v-card-title>
    <v-card-text>
      <!--                    NOMBRE TOTAL DE PPN ANALYSES -->
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. total de PPN analysés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnTotal()
          }}
        </v-chip>
      </v-container>
      <!--                    NOMBRE DE PPN AVEC ERREURS -->
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN avec erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnErreurs()
          }}
        </v-chip>
      </v-container>
      <!--                    NOMBRE DE PPN SANS ERREURS -->
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de PPN sans erreurs</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnOk()
          }}
        </v-chip>
      </v-container>
      <!--                    NOMBRE DE PPN NON TROUVES -->
      <v-container class="d-flex justify-space-between pt-0 pb-1" style="width: 24em">
        <span>Nb. de ppn non trouvés</span>
        <v-chip class="numberValue" small label disabled text-color="white" color="#0F75BC">{{
          getNbPpnInconnus()
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
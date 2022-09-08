<template>
  <v-container>
    <v-card flat>
        <v-container class="ma-0 pa-0">
          <v-card class="ma-0 pa-0" color="white" flat>
            <v-card-title class="d-flex justify-center ma-0 pa-0 pt-1" style="font-weight: bold; font-size: 1.6em;">Récapitulatif</v-card-title>
            <v-card-subtitle class="d-flex justify-center ma-0 pa-0"><bloc-rappel-type-analyse></bloc-rappel-type-analyse></v-card-subtitle>

            <v-tabs v-model="tab" background-color="white" color="black" grow show-arrows>
              <v-tabs-slider color="#252C61"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item" style="font-size: 0.7em;">
                {{ item }}
              </v-tab>
            </v-tabs>

<!--            TODO faire le responsive design du bloc récap-->

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card flat>
                  <v-card-text>
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
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>


      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>

import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
import { useResultatStore } from "@/stores/resultat";
import {ref} from 'vue';

const resultatStore = useResultatStore();
let tab = ref(null);
let items = ref(['Analyse 1', 'Analyse 2', 'Analyse 3', 'Analyse 4', 'Analyse 5']);
let text = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

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

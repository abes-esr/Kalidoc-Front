<template>
  <v-container fluid>
    <v-card flat class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
      <v-icon @click="goToHome()">mdi-home</v-icon>
      <v-icon size="small">mdi-chevron-right</v-icon>
      <span @click="goToHome()" class="v-slider__thumb" style="color: grey; text-decoration: none">Interface de vérification</span>
      <v-icon size="small">mdi-chevron-right</v-icon>
      Résultats de l'analyse
    </v-card>
    <v-row cols="12">
      <v-col xs="12" sm="12" md="12" :lg="focusOn[0]" :xl="focusOn[1]" fluid fill-width>
        <v-layout child-flex>
          <BlocAffichageResume @onChangePpn="sendPpnToBlocResultat" @onChangeItems="sendItemsToBlocResultat" :currentPpn="currentPpn" :nbLancement="nbLancement" :mobileBreakpoint="mobileBreakpoint"></BlocAffichageResume>
        </v-layout>
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="" xl="" class="pl-lg-6" fluid fill-width>
        <div class="d-none d-lg-flex" style="height: 70%; width: 2px; position:absolute; margin: 0 0 0 -1.15em; background-color: #E6E6E6">
          <v-btn fab x-small depressed color="#E6E6E6" style="position:absolute; margin: 0 0 0 -1.55em" @click="resizeBloc">
            <v-icon>{{ iconTimeline }}</v-icon>
          </v-btn>
        </div>
        <v-layout child-flex>
          <bloc-detail-ppn class="ma-0 pa-0 mb-2" @onChangePpn="sendPpnToBlocResultat" :currentPpn="currentPpn" :currentItems="currentItems" ></bloc-detail-ppn>
        </v-layout>
          <div class="ma-0 pa-0" style="position: relative">
            <v-tooltip left>
              <template v-slot:activator="{on}" class="ma-0 pa-0 col-auto">
                <v-btn :disabled="itemsToExport().length === 0" style="position: absolute; top: 4px; right: -10px; margin-right: 12px;" class="button" elevation="0" v-on="on" color="#0F75BC">
                  <download-csv :delimiter="';'" :data="itemsToExport()" name="qualimarc-export.csv">
                    <span style="display: block">TÉLÉCHARGER TOUS</span>
                    LES RESULTATS
                  </download-csv>
                  <v-icon color="white" class="ml-2">mdi-download</v-icon>
                </v-btn>
              </template>
              <span>Télécharger le détail des erreurs trouvées dans tous les ppn de l’analyse en cours</span>
            </v-tooltip>
          </div>
        <v-layout child-flex>
          <bloc-recapitulatif class="ma-0 pa-0 mt-16 mb-4" style="min-height: 13em" :nombre-resultat-analyse="nbLancement"></bloc-recapitulatif>
        </v-layout>
          <v-card
          flat
          class="float-right ma-0 pa-0"
          >
            <bouton-lancement class="ma-0 pa-0"  :is-replay="true" @finished="updateNbLancement">Relancer l'analyse</bouton-lancement>
          </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BlocRecapitulatif from "@/components/resultats/BlocRecapitulatif";
import BlocAffichageResume from "@/components/resultats/BlocAffichageResume";
import BoutonLancement from "@/components/BoutonLancement";
import BlocDetailPpn from "@/components/resultats/BlocDetailPpn";

import {ref} from "vue";
import { useResultatStore } from "@/stores/resultat";
import router from "@/router";

const resultatStore = useResultatStore();

const currentPpn = ref('');
const currentItems = ref([]);
const nbLancement = ref(0);
const mobileBreakpoint = ref(200);

const iconTimeline = ref('mdi-arrow-left');
const focusOn = ref([4, 4]);

function sendPpnToBlocResultat(ppn) {
  currentPpn.value = ppn;
}

function sendItemsToBlocResultat(items) {
  currentItems.value = items;
}

function itemsToExport() {
  let itemsToExport = [];
  resultatStore.getResultsList.forEach(result => {
    if (result.detailerreurs){
      result.detailerreurs.forEach(messageErreur => {
        let zoneunm2 = (messageErreur.zones[1]) ? messageErreur.zones[1] : "";
        let autresZones = "";
        for (let i = 2;i<messageErreur.zones.length;i++) {
          autresZones += messageErreur.zones[i]
          if (i !== (messageErreur.zones.length - 1)) autresZones += " | ";
        }
        let priority;
        if (messageErreur.priority === "P1"){
          priority = "Règle essentielle"
        } else if (messageErreur.priority === "P2"){
          priority = "Règle avancée"
        }
        itemsToExport.push({
          'ppn': result.ppn,
          'type de document': result.typeDocument,
          'zone/sous-zone 1': messageErreur.zones[0],
          'zone/sous-zone 2': zoneunm2,
          'autres zones/sous-zones':autresZones,
          'message d\'erreur': messageErreur.message,
          'type d\'erreur': priority,
          'date derniere modification de la notice': result.dateModification,
          'RCR dernier modificateur de la notice': result.rcr
        });
      });
    }
  });
  return itemsToExport;
}

function goToHome() {
  router.push('/');
}

function updateNbLancement() {
  nbLancement.value = resultatStore.getRecapitulatif.length;
}

function resizeBloc() {
  if(iconTimeline.value === 'mdi-arrow-left'){
    focusOn.value = [3, 2];
    mobileBreakpoint.value = 4000;
    iconTimeline.value = 'mdi-arrow-right';
  }else{
    focusOn.value = [4, 4];
    mobileBreakpoint.value = 200;
    iconTimeline.value = 'mdi-arrow-left';
  }
}

</script>

<style scoped>
.v-slider__thumb{
  cursor:pointer;
  height:42px;
  width:42px;
}
.button {
  color:white;
}
</style>
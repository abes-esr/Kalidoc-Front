<template>
  <v-container fluid>
    <v-container class="ma-0 pa-0 mb-2" style="color: grey; font-size: 0.9em">
    <v-icon>mdi-home</v-icon>
    <v-icon size="small">mdi-chevron-right</v-icon>
      <span style="color: grey; text-decoration: none">Interface de vérification</span>
    <v-icon size="small">mdi-chevron-right</v-icon>
    Résultats de l'analyse
    </v-container>
    <v-row cols="12">
      <v-col xs="12" sm="12" md="5" lg="5" xl="5">
        <BlocAffichageResume @onChangePpn="sendPpnToBlocResultat" @onChangeItems="sendItemsToBlocResultat" :currentPpn="currentPpn"></BlocAffichageResume>
      </v-col>
      <v-col xs="12" sm="12" md="7" lg="7" xl="7">
        <v-tooltip top open-delay="700">
          <template v-slot:activator="{on}">
            <v-btn  v-on="on" outlined><download-csv :delimiter="','" :data="itemsToExport()" name="qualimarc-export.csv" :fields="['ppn','zones et sous zones','type de document','message d\'erreur','type d\'erreur','date création/dernière modification de la notice','RCR créateur/dernier modificateur de la notice']"> Exporter </download-csv></v-btn>
          </template>
          <span>Exporter la sélection au format CSV</span>
        </v-tooltip>
        <bloc-detail-ppn @onChangePpn="sendPpnToBlocResultat" :currentPpn="currentPpn" :currentItems="currentItems" ></bloc-detail-ppn>
        <bloc-recapitulatif class="pl-1 pr-1" style="min-height: 13em" ></bloc-recapitulatif>
        <bouton-lancement style="min-height: 2em">Relancer l'analyse</bouton-lancement>
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

const resultatStore = useResultatStore();

let currentPpn = ref('');
let currentItems = ref([]);

function sendPpnToBlocResultat(ppn) {
  currentPpn.value = ppn;
}

function sendItemsToBlocResultat(items) {
  currentItems.value = items;
}

function itemsToExport() {
  let itemsToExport = [];
  console.log(resultatStore.getResultsList)
  resultatStore.getResultsList.forEach(result => {
    if (result.detailerreurs){
      result.detailerreurs.forEach(messageErreur => {
        itemsToExport.push({
          ppn: result.ppn,
          zonesEtSousZones: messageErreur.zoneunm1 + " " + messageErreur.zoneunm2,
          typeDocument: result.typeDocument,
          messageErreur: messageErreur.message,
          typeErreur: messageErreur.priority,
          dateCreation: result.dateCreation,
          rcr: result.rcr
        });
      });
    }
  });
  return itemsToExport;
}
</script>
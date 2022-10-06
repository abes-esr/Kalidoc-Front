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
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn :disabled="itemsToExport().length === 0" style="float: right" class="button mr-1" v-on="on" color="#0F75BC">
              <download-csv :delimiter="';'" :data="itemsToExport()" name="qualimarc-export.csv" :fields="['ppn','type de document','zone/sous-zone 1','zone/sous-zone 2','message d\'erreur','type d\'erreur','date derniere modification de la notice','RCR dernier modificateur de la notice']">
                TELECHARGER TOUS<br/>
                LES RESULTATS
              </download-csv>
              <v-icon color="white" class="ml-2">mdi-download</v-icon>
            </v-btn>
          </template>
          <span>Télécharger le détail des erreurs trouvées dans tous les ppn de l’analyse en cours</span>
        </v-tooltip>
        <bloc-detail-ppn @onChangePpn="sendPpnToBlocResultat" :currentPpn="currentPpn" :currentItems="currentItems" ></bloc-detail-ppn>
        <v-spacer v-if="!currentPpn" class="pa-4"></v-spacer>
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
  resultatStore.getResultsList.forEach(result => {
    if (result.detailerreurs){
      result.detailerreurs.forEach(messageErreur => {
        let zoneunm2 = (messageErreur.zoneunm2) ?  " " + messageErreur.zoneunm2 : "";
        itemsToExport.push({
          'ppn': result.ppn,
          'type de document': result.typeDocument,
          'zone/sous-zone 1': "\"" + messageErreur.zoneunm1 + "\"",
          'zone/sous-zone 2': "\"" + zoneunm2 + "\"", //todo: si rien alors rien
          'message d\'erreur': messageErreur.message,
          'type d\'erreur': messageErreur.priority,
          'date creation/derniere modification de la notice': result.dateModification,
          'RCR createur/dernier modificateur de la notice': result.rcr
        });
      });
    }
  });
  return itemsToExport;
}
</script>
<style scoped>
.button {
  color:white;
}
</style>
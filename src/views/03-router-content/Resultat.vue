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
          <template v-slot:activator="{on}" class="ma-0 pa-0 col-auto">
            <div class="ma-0 pa-0" style="position: relative">
              <v-btn :disabled="itemsToExport().length === 0" style="position: absolute; top: -10px; right: -10px; margin-right: 12px; margin-bottom: 20px" class="button" v-on="on" color="#0F75BC">
                <download-csv :delimiter="';'" :data="itemsToExport()" name="qualimarc-export.csv" :fields="['ppn','zones et sous zones','type de document','message d\'erreur','type d\'erreur','date creation/derniere modification de la notice','RCR createur/dernier modificateur de la notice']">
                  TELECHARGER TOUS<br/>
                  LES RESULTATS
                </download-csv>
                <v-icon color="white" class="ml-2">mdi-download</v-icon>
              </v-btn>
            </div>
          </template>
          <span>Télécharger le détail de chaque erreur trouvées dans les ppn de l’analyse en cours </span>
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
          'zones et sous zones': "\"" + messageErreur.zoneunm1 + zoneunm2 + "\"",
          'type de document': result.typeDocument,
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
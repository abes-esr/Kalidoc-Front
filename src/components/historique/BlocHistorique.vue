<template>
  <v-container align-items="center" style="min-width: 90%">

    <v-row class="mb-2 px-4" justify="space-between">
      <!--      TITRE     -->
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Historique des analyses</span>
      <!--      BOUTON ENREGISTRER LES ANALYSES      -->
      <v-btn class="mx-0" depressed @click="" color="#0F75BC" small>
        <span style="color: white">Enregistrer l'historique</span>
        <v-icon small color="white" class="ml-2">mdi-download</v-icon>
      </v-btn>
    </v-row>
    <div class="ma-0 pa-0" style="border-top: 4px solid #252c61">
      <v-row class="mt-1" justify="space-around">
        <v-alert v-if="historiqueList.length !== 0" class="mt-4" border="left" colored-border dense type="info" elevation="2" icon="mdi-information">
          L’historique n’est valable que pour la durée de la session.
        </v-alert>
        <v-alert v-else class="mt-4" border="left" colored-border dense type="warning" elevation="2" icon="mdi-alert">
          <span style="display: block">L’historique est vide.</span>
          <span style="font-style: italic; font-weight: 300; font-size: 0.9em; color: grey">L’historique n’est valable que pour la durée de la session.</span>
        </v-alert>
      </v-row>

      <v-timeline v-if="historiqueList.length !== 0" align-top dense clipped style="width: 100%">
        <!--      TRAITEMENT PAR ANALYSE      -->
        <v-timeline-item v-for="historique in historiqueList.slice().reverse()" :key="historiqueList.indexOf(historique)" color="lightgrey">
          <!--      AFFICHAGE DU NUMERO DE L'ANALYSE DANS LA PUCE     -->
          <template v-slot:icon>
            <span style="color: #cf491b; font-weight: 400; font-size: 1.2em">{{ historiqueList.indexOf(historique) +1 }}</span>
          </template>
          <v-expansion-panels multiple>
            <v-expansion-panel class="mb-4">
              <v-expansion-panel-header>
                <v-row justify="space-around">
                  <!--      AFFICHAGE DE LA DATE      -->
                  <span class="mt-1">Analyse du {{ historique.date.toLocaleString() }} <span style="font-style: italic; color: dimgrey">- Type d'analyse : {{ getAnalyseType(historique.analyse.analyseSelected) }}</span></span>
                  <!--      AFFICHAGE DU BOUTON      -->
                  <v-btn @click="relanceAnalyse(historiqueList.indexOf(historique))" depressed color="#CF4A1A" class="button" max-width="220" height="26">
                    <span style="color: white">Relancer l'analyse</span>
                    <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-list-item class="mt-2" style="overflow-x: scroll; overflow-y: hidden">
                  <!--      TRAITEMENT PAR RESULTAT     -->
                  <v-col v-for="result in historique.resultats.slice().reverse()" :key="historique.resultats.indexOf(result)" class="mr-10">
                    <v-row class="d-flex align-center" style="min-width: 330px">
                      <!--      AFFICHAGE DU NUMERO DU RESULTAT      -->
                      <v-col style="color: lightgrey; font-weight: 400; font-size: 1.2em; width: 40px; max-width: 40px">{{ historique.resultats.indexOf(result) +1 }}</v-col>
                      <card-recapitulatif :resultats="result" style="border-left: 2px solid lightgrey; "></card-recapitulatif>
                    </v-row>
                  </v-col>
                </v-list-item>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import CardRecapitulatif from "@/components/CardRecapitulatif";
import {useHistoriqueStore} from "@/stores/historique";
import router from "@/router";

const historiqueStore = useHistoriqueStore();
const historiqueList = ref(historiqueStore.getHistorique);

function getAnalyseType(analyse) {
  if (analyse === "QUICK") {
    return "rapide";
  } else if (analyse === "COMPLETE") {
    return "experte";
  } else if (analyse === "FOCUSED") {
    return "ciblée";
  }
}

function relanceAnalyse(currentAnalyse) {
  router.push("/?numeroAnalyse="+currentAnalyse);
}

</script>
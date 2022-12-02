<template>
  <v-container align-items="center">

    <v-row class="mb-2 px-4" justify="space-between">
      <!--      TITRE     -->
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Table générale des règles</span>
      <!--      BOUTON ENREGISTRER LES ANALYSES      -->
      <v-btn class="mx-0" depressed @click="" color="blue" small>
        <span style="color: white">Enregistrer les analyses</span>
        <v-icon color="white" small>mdi-download</v-icon>
      </v-btn>
    </v-row>
    <div class="ma-0 pa-0" style="border-top: 4px solid #252c61">
      <v-row class="mt-1" justify="space-around">
        <v-alert class="mt-4" border="left" colored-border dense type="warning" elevation="2" icon="mdi-alert">
          L’historique n’est valable que pour la durée de la session.
        </v-alert>
      </v-row>

      <!--      TIMELINE      -->
      <v-timeline align-top dense clipped style="width: 100%">

        <!--      TRAITEMENT PAR ANALYSE      -->
        <v-timeline-item v-for="analyse in analyseList.slice().reverse()" color="lightgrey">
          <!--      AFFICHAGE DU NUMERO DE L'ANALYSE DANS LA PUCE     -->
          <template v-slot:icon>
            <span style="color: #cf491b; font-weight: 400; font-size: 1.2em">{{ analyseList.indexOf(analyse) +1 }}</span>
          </template>
          <!--      EXPANSION PANEL      -->
          <v-expansion-panels popout multiple>
            <v-expansion-panel class="mb-4">
              <!--      EXPANSION PANEL HEADER      -->
              <v-expansion-panel-header>
                <v-row justify="space-around">
                  <!--      AFFICHAGE DE LA DATE      -->
                  <span class="mt-1">Analyse du {{ analyse.date }}</span>
                  <!--      AFFICHAGE DU BOUTON      -->
                  <v-btn @click="" depressed color="#CF4A1A" class="button" max-width="220" height="26">
                    Relancer l'analyse
                    <v-icon color="white" class="ml-2">mdi-arrow-right-thin-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </v-expansion-panel-header>
              <!--      EXPANSION PANEL CONTENT      -->
              <v-expansion-panel-content>
                <v-divider></v-divider>
                  <v-list-item class="mt-2" style="overflow-x: scroll; overflow-y: hidden">
                    <!--      TRAITEMENT PAR RESULTAT     -->
                    <v-col v-for="result in analyse.resultats.slice().reverse()">
                      <v-row class="d-flex align-center" style="min-width: 330px">
                        <!--      AFFICHAGE DU NUMERO DU RESULTAT      -->
                        <v-col style="color: lightgrey; font-weight: 400; font-size: 1.2em; width: 40px; max-width: 40px">{{ analyse.resultats.indexOf(result) +1 }}</v-col>
                        <v-col class="d-flex align-start flex-column ma-0 pa-0 pl-2" style="border-left: 2px solid lightgrey; width: 220px; max-width: 220px">
                          <span>Nb. total de PPN analysés :</span>
                          <span>Nb. de PPN avec erreurs :</span>
                          <span>Nb. de PPN sans erreurs :</span>
                          <span>Nb. de ppn non trouvés :</span>
                        </v-col>
                        <v-col class="d-flex align-start flex-column ma-0 pa-0" style="width: 70px; max-width: 70px">
                          <v-btn class="mb-1" x-small color="blue">{{ result.nbPpnTotal.length }}</v-btn>
                          <v-btn class="mb-1" x-small color="blue">{{ result.nbPpnErreurs.length }}</v-btn>
                          <v-btn class="mb-1" x-small color="blue">{{ result.nbPpnOk.length }}</v-btn>
                          <v-btn class="mb-1" x-small color="blue">{{ result.nbPpnInconnus.length }}</v-btn>
                        </v-col>
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

let analyseList = [
  {
    date: "2022/12/01 13h12",
    analyse: {
      ppnValidsList: [],
      ppnInvalidsList: [],
      analyseSelected: [],
      familleDocumentSet: [],
      ruleSet: []
    },
    resultats : [
      {
        nbPpnTotal: [1],
        nbPpnInconnus: [1],
        nbPpnErreurs: [1],
        nbPpnOk: [1],
      },
      {
        nbPpnTotal: [2,2],
        nbPpnInconnus: [2,2],
        nbPpnErreurs: [2,2],
        nbPpnOk: [2,2],
      },
      {
        nbPpnTotal: [3,3,3],
        nbPpnInconnus: [3,3,3],
        nbPpnErreurs: [3,3,3],
        nbPpnOk: [3,3,3],
      },
      {
        nbPpnTotal: [4,4,4,4],
        nbPpnInconnus: [4,4,4,4],
        nbPpnErreurs: [4,4,4,4],
        nbPpnOk: [4,4,4,4],
      }
    ],
  },
  {
    date: "2022/12/01 15h32",
    analyse: {
      ppnValidsList: [],
      ppnInvalidsList: [],
      analyseSelected: [],
      familleDocumentSet: [],
      ruleSet: []
    },
    resultats : [
      {
        nbPpnTotal: [1],
        nbPpnInconnus: [1],
        nbPpnErreurs: [1],
        nbPpnOk: [1],
      },
      {
        nbPpnTotal: [2,2],
        nbPpnInconnus: [2,2],
        nbPpnErreurs: [2,2],
        nbPpnOk: [2,2],
      },
      {
        nbPpnTotal: [3,3,3],
        nbPpnInconnus: [3,3,3],
        nbPpnErreurs: [3,3,3],
        nbPpnOk: [3,3,3],
      }
    ],
  },
  {
    date: "2022/12/01 16h51",
    analyse: {
      ppnValidsList: [],
      ppnInvalidsList: [],
      analyseSelected: [],
      familleDocumentSet: [],
      ruleSet: []
    },
    resultats : [
      {
        nbPpnTotal: [1],
        nbPpnInconnus: [1],
        nbPpnErreurs: [1],
        nbPpnOk: [1],
      },
      {
        nbPpnTotal: [2,2],
        nbPpnInconnus: [2,2],
        nbPpnErreurs: [2,2],
        nbPpnOk: [2,2],
      }
    ],
  }
];

</script>

<style>

</style>
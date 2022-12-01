<template>
  <v-container align-items="center">
    <v-row class="mb-2 px-4" justify="space-between">
      <!--            TITRE-->
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Table générale des règles</span>
      <!--            BOUTON EFFACER LES FILTRES-->
      <v-btn class="mx-0" depressed @click="" color="blue" small>
        <span style="color: white">Enregistrer les analyses</span>
        <v-icon color="white" small>mdi-download</v-icon>
      </v-btn>
    </v-row>
    <v-row class="ma-0 pa-0" justify="center" style="border-top: 4px solid #252c61">
      <v-alert class="mt-4" border="left" colored-border dense type="warning" elevation="2" icon="mdi-alert">
        L’historique n’est valable que pour la durée de la session.
      </v-alert>
      <v-timeline align-top dense clipped style="width: 100%">

        <v-timeline-item v-for="result in resultats" color="lightgrey" icon="mdi-numeric-4" icon-color="#cf491b">
          <v-expansion-panels popout multiple>
            <v-expansion-panel class="mb-4">
              <v-expansion-panel-header>Analyse du {{ date }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="10">
                    <v-row>
                      <v-col cols="3">
                        Nb. total de PPN analysés : <br>
                        Nb. de PPN avec erreurs : <br>
                        Nb. de PPN sans erreurs : <br>
                        Nb. de ppn non trouvés : <br>
                      </v-col>
                      <v-col>
                        <v-btn x-small color="blue">0</v-btn><br>
                        <v-btn x-small color="blue">0</v-btn><br>
                        <v-btn x-small color="blue">0</v-btn><br>
                        <v-btn x-small color="blue">0</v-btn><br>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-timeline-item>

      </v-timeline>

    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from "vue";

let date = "2022/12/01";
let analyse = {
  ppnValidsList: [],
  ppnInvalidsList: [],
  analyseSelected: [],
  familleDocumentSet: [],
  ruleSet: []
};
const resultats = ref([
      {
        nbPpnTotal: 0,
        nbPpnInconnus: 0,
        nbPpnErreurs: 0,
        nbPpnOk: 0,
      },
      {
        nbPpnTotal: 0,
        nbPpnInconnus: 0,
        nbPpnErreurs:0,
        nbPpnOk:0,
      }
    ]);

</script>

<style>

</style>
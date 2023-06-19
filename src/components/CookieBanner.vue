<template>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" fab elevation="2" v-bind="attrs" v-on="on" style="position: fixed; bottom: 10px; left: 10px; z-index: 10">
          <span style="font-size: 0.6em">Cookies</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Gestion des cookies
        </v-card-title>
        <v-card-text>En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies ou autres traceurs. <a href="https://abes.fr/pages-donnees-personnelles/qualimarc.sudoc.html" target="_blank">Cliquez ici pour en savoir plus</a>

          <v-sheet class="d-flex align-content-space-around mt-4" elevation="2" height="40">
              <v-sheet class="pa-2">PIWIK : </v-sheet>
              <v-sheet class="pa-2">Logiciel libre et open source de mesure de statistiques web</v-sheet>
            <v-sheet class="pa-2 ml-auto" >
              <v-switch class="pa-0 ma-0" v-model="selectedCookies" color="green darken-1" label="Piwik" value="piwik"></v-switch>
            </v-sheet>
          </v-sheet>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="selectedCookiesValidation('none')">
            Refuser tous
          </v-btn>
          <v-btn color="grey darken-1" text @click="selectedCookiesValidation('all')">
            Accepter tous
          </v-btn>
          <v-btn color="green darken-1" text @click="selectedCookiesValidation('selected')">
            Accepter la sélection
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script setup>
import { ref } from "vue";

const dialog = ref(true);
const selectedCookies = ref(['piwik']);

function selectedCookiesValidation(param) {
  this.dialog = false;
  if(param === 'selected'){
    this.$matomo.rememberConsentGiven();
    this.$matomo.rememberCookieConsentGiven();
  } else if (param === 'none') {
    selectedCookies.value = new Array(0);
  } else if (param === 'all') {
    selectedCookies.value = ['piwik'];
    this.$matomo.rememberConsentGiven();
    this.$matomo.rememberCookieConsentGiven();
  }
}

</script>

<style>

</style>

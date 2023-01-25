<template>
  <v-hover v-slot="{ hover }" close-delay="300">
    <div>
      <v-btn @mouseenter="displayStatus" fab :x-small="!$vuetify.breakpoint.mdAndUp" :small="$vuetify.breakpoint.mdAndUp" depressed color="white" aria-label="Status de l'application Qualimarc">
        <!--      Balise div servant à créer les aria-label et role pour l'accessibilité de l'application     -->
        <div aria-label="Status de l'application Qualimarc" role="img">
          <v-icon large :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'">mdi-gauge</v-icon>
        </div>
      </v-btn>
      <v-card v-if="hover" elevation="12" style="position: absolute; margin-left: -360px; margin-top: 20px; z-index: 10; border-radius: 5px!important;" width="400">
        <v-card-title class="justify-center pt-1" style="background-color: #252C61; color: white">STATUTS</v-card-title>
        <v-card-text style="background-color: white;color: black">
          <v-row class="d-flex justify-space-between pa-2">
            <span> Base Xml </span>
            <!--      Balise div servant à créer les aria-label et role pour l'accessibilité de l'application     -->
            <div :aria-label="(applicationStatus.statutBaseQualimarc)" role="img">
              <v-icon :color="(applicationStatus.statutBaseXml === 'OK') ? 'green' : 'red'">{{ (applicationStatus.statutBaseXml === "OK") ? 'mdi-checkbox-marked-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
            </div>
          </v-row>
          <v-row class="d-flex justify-space-between pa-2">
            <span>Base Qualimarc</span>
            <!--      Balise div servant à créer les aria-label et role pour l'accessibilité de l'application     -->
            <div :aria-label="(applicationStatus.statutBaseQualimarc)" role="img">
              <v-icon  :color="(applicationStatus.statutBaseQualimarc === 'OK') ? 'green' : 'red'">{{ (applicationStatus.statutBaseQualimarc === "OK")  ? 'mdi-checkbox-marked-circle-outline' : 'mdi-close-circle-outline'}}</v-icon>
            </div>
          </v-row>
          <v-row class="d-flex justify-space-between pa-2">
            <span>Dernière synchro CBS<->Base XML</span>
            <span>{{applicationStatus.dateDerniereSynchronisation}}</span>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-hover>
</template>

<script setup>
import { ref } from "vue";
import StatutsService from "@/service/StatutsService";

const service = StatutsService;
const emit = defineEmits(['backendError']);
const applicationStatus = ref({});

function displayStatus() {
  service.getStatusApplication().then((response) => {
    console.log("response", response);
    applicationStatus.value = response.data;
  }).catch((error) => {
    emitOnError(error);
  });
}

function emitOnError(error){
  emit('backendError', error);
}
</script>

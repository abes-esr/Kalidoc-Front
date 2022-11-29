<template>
  <v-container class="borderAddPpnBottom">
    <v-card flat class="d-flex justify-center py-5" style="margin-top: -70px;">
      <v-icon class="mr-3" color="black">mdi-chevron-double-up</v-icon>
      <span style="font-weight: 700">OU</span>
      <v-icon class="ml-3" color="black">mdi-chevron-double-down</v-icon>
    </v-card>
    <v-file-input filled class="px-3" label="Cliquez ici pour charger un fichier .csv ou .txt contenant des PPN" prepend-icon="" append-outer-icon="mdi-file-download-outline" show-size type="file" aria-label="Dépôt du fichier" truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierLoaded" @change="isAllowToSend" ref="fileInput"></v-file-input>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const fichierLoaded = ref([]);
const rules = ref([(value) => !value || ((value.type === undefined) || (value.type === 'text/csv') || (value.type === 'application/vnd.ms-excel') || (value.type === 'text/plain')) || 'Le fichier chargé n\'est pas dans un format autorisé (.txt ou .csv)']);
const isFichierPresent = ref(false);

function isAllowToSend() {
  isFichierPresent.value = (fichierLoaded.value !== null) && (fichierLoaded.value.type === 'text/csv') || (fichierLoaded.value.type === 'application/vnd.ms-excel') || (fichierLoaded.value.type === 'text/plain');
}
</script>
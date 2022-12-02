<template>
  <v-container>
    <v-card flat class="d-flex justify-center py-5" style="margin-top: -70px;">
      <v-icon class="mr-3" color="black">mdi-chevron-double-up</v-icon>
      <span style="font-weight: 700">OU</span>
      <v-icon class="ml-3" color="black">mdi-chevron-double-down</v-icon>
    </v-card>
    <v-file-input filled class="px-3" label="Cliquez ici pour charger un fichier .csv ou .txt contenant des PPN" prepend-icon="" append-outer-icon="mdi-file-download-outline" show-size type="file" aria-label="Dépôt du fichier" truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierLoaded" @change="isAllowToSend" ref="fileInput"></v-file-input>
      </v-container>
    <v-container>
      <v-file-input filled label="Cliquez ici pour charger un fichier .csv ou .txt contenant des PPN" prepend-icon="" append-outer-icon="mdi-file-download-outline" show-size type="file" aria-label="Dépôt du fichier" truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierLoaded" @change="isAllowToSend" ref="fileInput"></v-file-input>
      <v-btn @click="display"></v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
function parseFile(path) {
  let file = path.files[0].value;
  fileReader.readAsText(file);
  fileReader.onload = function() {
    alert(fileReader.result);
  };
  fileReader.onerror = function() {
    alert(fileReader.error);
  }
}

import { ref } from 'vue';

const fichierLoaded = ref([]);
const rules = ref([(value) => !value || ((value.type === undefined) || (value.type === 'text/csv') || (value.type === 'application/vnd.ms-excel') || (value.type === 'text/plain')) || 'Le fichier chargé n\'est pas dans un format autorisé (.txt ou .csv)']);
const isFichierPresent = ref(false);
const fichierLoaded = ref(null);
const rules = [(value) => !value || ((value.type === undefined) || (value.type === 'text/csv') || (value.type === 'application/vnd.ms-excel') || (value.type === 'text/plain')) || 'Le fichier chargé n\'est pas dans un format autorisé (.txt ou .csv)'];
let isFichierPresent = false;
let fileReader = new FileReader();
let arrayOfPpnResultFromFile = [];

function isAllowToSend() {
  isFichierPresent.value = (fichierLoaded.value !== null) && (fichierLoaded.value.type === 'text/csv') || (fichierLoaded.value.type === 'application/vnd.ms-excel') || (fichierLoaded.value.type === 'text/plain');
  fileReader.readAsText(fichierLoaded.value);
  fileReader.onload = function() {
    let fileContentArray = fileReader.result.split(/\r?\n/);
    for(let line = 0; line < fileContentArray.length-1; line++){
      arrayOfPpnResultFromFile.push(fileContentArray[line]); //!asynchrone ok à la sortie de la fonction
    }
  };
  console.log(arrayOfPpnResultFromFile)
  isFichierPresent = (fichierLoaded.value !== null) && (fichierLoaded.value.type === 'text/csv') || (fichierLoaded.value.type === 'application/vnd.ms-excel') || (fichierLoaded.value.type === 'text/plain');
}

function display() {
  console.log(arrayOfPpnResultFromFile);
}

</script>
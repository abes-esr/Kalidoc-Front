<template>
  <v-container>
    <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Fichier de Ppn</span>
    <v-container class="borderAddPpn">
      <v-file-input label="Cliquez ici pour charger un fichier .csv ou .txt contenant des Ppn" prepend-icon="" append-outer-icon="mdi-paperclip" show-size type="file" aria-label="Dépôt du fichier" truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierCharge" @change="autorisationEnvoi" ref="fileInput"></v-file-input>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

  let name = ref("BlocRechercheParFichierPpn");
  let fichierPresent = ref(false);
  let fichierCharge = ref([]);
  let rules = ref([(value) => !value || ((value.type === undefined) || (value.type === 'text/csv') || (value.type === 'application/vnd.ms-excel') || (value.type === 'text/plain')) || 'Le fichier chargé n\'est pas dans un format autorisé (.txt ou .csv)']);

  function autorisationEnvoi() {
    if (fichierCharge !== null) {
      fichierPresent = (fichierCharge.type === 'text/csv') || (fichierCharge.type === 'application/vnd.ms-excel') || (fichierCharge.type === 'text/plain');
    } else {
      fichierPresent = false;
    }
  }
</script>
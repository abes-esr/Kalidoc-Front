<template>
  <v-container class="borderAddPpnBottom">
    <v-container class="d-flex justify-center" style="margin-top: -70px;"><v-img class="mr-3" src="@/assets/arrowUp.svg" max-width="20px"></v-img><span style="font-weight: 700">OU</span><v-img class="ml-3" src="@/assets/arrowDown.svg" max-width="20px"></v-img></v-container>
    <v-container>
      <v-file-input filled label="Cliquez ici pour charger un fichier .csv ou .txt contenant des PPN" prepend-icon="" append-outer-icon="mdi-download" show-size type="file" aria-label="Dépôt du fichier" truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierCharge" @change="autorisationEnvoi" ref="fileInput"></v-file-input>
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
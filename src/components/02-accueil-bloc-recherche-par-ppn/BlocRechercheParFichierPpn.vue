<template>
  <v-container>
    <v-card-title>Fichier de Ppn</v-card-title>
    <v-file-input label="Cliquez ici pour charger un fichier .csv ou .txt contenant des Ppn" show-size type="file" aria-label="Dépôt du fichier" outlined dense truncate-length=75 for="files" accept=".csv,.txt" :rules="rules" v-model="fichierCharge" @change="autorisationEnvoi" ref="fileInput"></v-file-input>
  </v-container>
</template>

<script>
export default {
  name: "BlocRechercheParFichierPpn",
  data() {
    return {
      fichierPresent: false,
      fichierCharge: [],
      rules: [
        (value) => !value || ((value.type === undefined) || (value.type === 'text/csv') || (value.type === 'application/vnd.ms-excel') || (value.type === 'text/plain')) || 'Le fichier chargé n\'est pas dans un format autorisé (.txt ou .csv)',
      ],
    }
  },
  methods: {
    autorisationEnvoi() {
      if (this.fichierCharge !== null) {
        this.fichierPresent = (this.fichierCharge.type === 'text/csv') || (this.fichierCharge.type === 'application/vnd.ms-excel') || (this.fichierCharge.type === 'text/plain');
      } else {
        this.fichierPresent = false;
      }
    },
  }
};
</script>

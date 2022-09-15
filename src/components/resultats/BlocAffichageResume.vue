<template>
  <v-card>
    <v-card-title>Liste des PPN avec erreurs</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
    >
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue"
let headers = ref([
  { text: "Afficher/Masque", value: "masquer"},
  { text: "PPN", value: "ppn"},
  { text: "Type", value: "type"},
  { text: "Nd. erreurs", value: "nberreurs"}
])
let items = ref([
  {
    masquer : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquer : true,
    ppn : "222222222",
    type: "doc",
    nberreurs: 2
  },
  {
    masquer : false,
    ppn : "333333333",
    type: "peri",
    nberreurs: 102
  },
  {
    masquer : false,
    ppn : "444444444",
    type: "media",
    nberreurs: 1
  }
])
</script>
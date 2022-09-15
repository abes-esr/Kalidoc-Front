<template>
  <v-card>
    <v-card-title>Liste des PPN avec erreurs</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [5,10,20,30,-1]
      }"
    >
      <template v-slot:item.masquee="{ item }">
        <v-simple-checkbox
          v-model="item.masquee"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue"
let headers = ref([
  { text: "Aff/Masq.", value: "masquee"},
  { text: "PPN", value: "ppn"},
  { text: "Type PPN", value: "type"},
  { text: "Nd. erreurs", value: "nberreurs"}
]);

// Donnée d'exemple pour remplire le tableau
let items = ref([
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "222222222",
    type: "doc",
    nberreurs: 2
  },
  {
    masquee : false,
    ppn : "333333333",
    type: "peri",
    nberreurs: 102
  },
  {
    masquee : false,
    ppn : "444444444",
    type: "media",
    nberreurs: 1
  }
]);

</script>
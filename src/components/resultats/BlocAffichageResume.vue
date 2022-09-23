<template>
  <v-card>
    <v-card-title>Liste des PPN avec erreurs</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :loading="loading"
      loading-text="Chargement..."
      :items="items"
      :item-class="classItemMasked"
      :footer-props="{
        itemsPerPageOptions: [5,10,20,30,-1]
      }"
      dense
    >
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{headers}">
        <span style='color: white;'>{{ header.text }}</span>
      </template>

      <template v-slot:item.affiche="{ item }">
        <v-checkbox
            v-model="item.affiche"
            on-icon="mdi-eye"
            off-icon="mdi-eye-off-outline"
            color="#CF4A1A"
            dense
        ></v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue"

let headers = ref([
  { text: "Aff/Masq.", value: "affiche", class: "headerTableClass"},
  { text: "PPN", value: "ppn", class: "headerTableClass"},
  { text: "Type PPN", value: "type", class: "headerTableClass"},
  { text: "Nd. erreurs", value: "nberreurs", class: "headerTableClass"}
]);
let loading = ref(false);
// Donnée d'exemple pour remplire le tableau
let items = ref([
  {
    affiche : true,
    ppn : "111113111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "114511111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111116111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    affiche : true,
    ppn : "222222222",
    type: "doc",
    nberreurs: 2
  },
  {
    affiche : false,
    ppn : "333333333",
    type: "peri",
    nberreurs: 102
  },
  {
    affiche : false,
    ppn : "444444444",
    type: "media",
    nberreurs: 1
  }
]);


/**
 * Fonction qui renvoi un style de class pour griser les items masquées
 * @param item
 * @return {string}
 */
function classItemMasked(item){
  return item.affiche ? '' : 'masked'
}
</script>
<style>
.masked{
  color: grey;
  background-color: whitesmoke;
}

.headerTableClass{
  color: white;
  background-color: #676C91;
}
</style>
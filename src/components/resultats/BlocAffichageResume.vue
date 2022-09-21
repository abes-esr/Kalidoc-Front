<template>
  <v-card>
    <v-card-title>Liste des PPN avec erreurs</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :item-class="classItemMasked"
      :footer-props="{
        itemsPerPageOptions: [5,10,20,30,-1]
      }"
      dense
    >
      <template v-slot:item.affiche="{ item }">
        <v-checkbox
            v-model="item.affiche"
            on-icon="mdi-eye"
            off-icon="mdi-eye-off-outline"
            dense
        ></v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue"


let headers = ref([
  { text: "Aff/Masq.", value: "affiche"},
  { text: "PPN", value: "ppn"},
  { text: "Type PPN", value: "type"},
  { text: "Nd. erreurs", value: "nberreurs"}
]);

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
}

</style>
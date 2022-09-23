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
import { ref, onMounted } from "vue"
import { useResultatStore } from "@/stores/resultat";

const resultatStore = useResultatStore();

let headers = ref([
  { text: "Aff/Masq.", value: "affiche", class: "headerTableClass"},
  { text: "PPN", value: "ppn", class: "headerTableClass"},
  { text: "Type de documents", value: "typeDocument", class: "headerTableClass"},
  { text: "Nb. erreurs", value: "nberreurs", class: "headerTableClass"}
]);
let loading = ref(false);
let items = ref([]);

onMounted(() => {
  feedItems()
})

/**
 * fonction permetant de recuperer les ppns du store
 */
function feedItems(){
  loading.value = true;
  items.value = [];
  resultatStore.getResultsList.forEach((el) => {
    items.value.push( {
      affiche: true,
      ppn: el.ppn,
      typeDocument: el.typeDocument,
      nberreurs: el.messages.length
    })
  });
  loading.value = false;
}

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

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
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
        <span style='color: white;'>{{ header.text }} <v-icon color="white" small >mdi-sort</v-icon></span>
      </template>
      <template v-slot:item.affiche="{ item }">
        <v-simple-checkbox
            v-model="item.affiche"
            on-icon="mdi-eye"
            off-icon="mdi-eye-off-outline"
            color="#CF4A1A"
            dense
        ></v-simple-checkbox>
      </template>
      <template v-slot:body.append>
        <tr>
          <td colspan="4">
            <v-container class="d-flex flex-row-reverse ">
              <table>
                <tr>
                  <td>Rechercher les PPN dans WinIBW</td><td><bouton-winibw :isDisabled="items.length == 0" :ppnList="ppnList" @onClick="displayPopup"></bouton-winibw></td>
                </tr>
              </table>
            </v-container>
          </td>
        </tr>
      </template>
    </v-data-table>

    <PopupRequestWinibw :winibwRequest="winibwRequest" :dialog="dialog" @onClose="setDialog"></PopupRequestWinibw>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useResultatStore } from "@/stores/resultat";
import BoutonWinibw from "@/components/BoutonWinibw";
import PopupRequestWinibw from "@/components/resultats/PopupRequestWinibw";

const resultatStore = useResultatStore();

let headers = ref([
  { text: "Aff/Masq.", value: "affiche", class: "headerTableClass"},
  { text: "PPN", value: "ppn", class: "headerTableClass"},
  { text: "Type de document", value: "typeDocument", class: "headerTableClass"},
  { text: "Nb. erreurs", value: "nberreurs", class: "headerTableClass"}
]);
let loading = ref(false);
let items = ref([]);
let ppnList = ref([]);
let winibwRequest = ref('null');
let dialog = ref(false);
let listType = ref([]);
let searchType = ref('null');

onMounted(() => {
  feedItems();
  feedPpnList();
  feedListType();
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
 * Fonction permettant de récupérer les PPN pour la création de la requête WINIBW
 */
function feedPpnList() {
  items.value.forEach(item => {
    ppnList.value.push(item.ppn);
  });
}

/**
 * Fonction permettant d'afficher une popup contenant la requête WinIBW
 */
function displayPopup(request) {
  winibwRequest.value = request;
  dialog.value = true;
}

/**
 * Fonction permettant de récupérer l'état d'ouverture de la popup de requête Winibw
 */
function setDialog(onClose) {
  dialog.value = onClose;
}

/**
 * Fonction qui renvoi un style de class pour griser les items masquées
 * @param item
 * @return {string}
 */
function classItemMasked(item){
  return item.affiche ? 'showed' : 'masked'
}
</script>
<style>
.masked{
  color: lightgrey;
  background-color: whitesmoke;
}
.showed{
  color: #252C61;
  font-weight: bold;
}

.headerTableClass{
  color: white;
  background-color: #676C91;
}
</style>

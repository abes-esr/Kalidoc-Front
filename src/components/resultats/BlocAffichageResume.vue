<template>

  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Liste des PPN avec erreurs</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">

    <v-data-table
        v-model="model"
        :headers="headers"
        :loading="loading"
        loading-text="Chargement..."
        :items="filterPpnByType()"
        :item-class="classItemMasked"
        @click:row="sendCurrentPpnToParent"
        @current-items="sendItemsToParent"
        single-select
        item-key="ppn"
        :footer-props="{
          itemsPerPageOptions: [5,10,20,30,-1]
        }"
        dense
    >
      <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
          <v-menu offset-y v-if="header.value === 'typeDocument'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="bouton-simple" x-small v-bind="attrs" v-on="on" style="text-decoration: none;">
                <v-icon small color="white">
                  mdi-filter
                </v-icon>
              </v-btn>
            </template>
            <div style='background-color:white;color: black;' class="pl-4 pr-8">
              <v-btn class="d-block" plain v-for="type in selectType" :key="type.id" @click="eventTypeChoice(type)">
                {{ type }}
              </v-btn>
            </div>
          </v-menu>
        <span style='color: white;'>
          {{ header.text }}
          <v-icon color="white" small >mdi-sort</v-icon></span>
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
          <td colspan="2">
            <table>
              <tr>
                <td>
                  <v-checkbox color="#CF4A1A" input-value="1" on-icon="mdi-eye" off-icon="mdi-eye-off-outline" @change="toggleMask"/>
                </td>
                <td>Masquer/démasquer tout</td>
              </tr>
            </table>
          </td>
          <td colspan="2" >
            <v-container class="d-flex flex-row-reverse">
              <table>
                <tr>
                  <td>Générer la requête pour WinIBW</td><td><bouton-winibw :isDisabled="isWinibwButtonDisabled()" :ppnList="getPpnList()" @onClick="displayPopup"></bouton-winibw></td>
                </tr>
              </table>
            </v-container>
          </td>
        </tr>
      </template>
    </v-data-table>

    <PopupRequestWinibw :winibwRequest="winibwRequest" :dialog="dialog" @onClose="setDialog"></PopupRequestWinibw>

    </v-container>
  </v-container>

</template>

<script setup>
import {ref, onMounted, watchEffect} from "vue"
import { useResultatStore } from "@/stores/resultat";
import BoutonWinibw from "@/components/BoutonWinibw";
import PopupRequestWinibw from "@/components/resultats/PopupRequestWinibw";
import QualimarcService from "@/service/QualimarcService";

const resultatStore = useResultatStore();
const serviceApi = QualimarcService;

const emit = defineEmits(['onChangePpn','onChangeItems']);
const props = defineProps({currentPpn: String})

let headers = ref([
  { text: "Aff/Masq.", value: "affiche", class: "headerTableClass"},
  { text: "PPN", value: "ppn", class: "headerTableClass"},
  { text: "Type de document", value: "typeDocument", class: "headerTableClass"},
  { text: "Nb. erreurs", value: "nberreurs", class: "headerTableClass"}
]);
let loading = ref(false);
let items = ref([]);
let winibwRequest = ref('null');
let dialog = ref(false);
let selectType = ref([]);
let type = ref(null);
let ppnFiltered = [];
let model = ref([]);

onMounted(() => {
  feedItems();
  feedTypeList();
})

watchEffect(() => {
  if(props.currentPpn){
    updateItemSelected(props.currentPpn)
  }
})
/**
 * fonction permetant de recuperer les ppns du store
 */
function feedItems(){
  loading.value = true;
  items.value = [];
  resultatStore.getResultsList.forEach((el) => {
    if(el.detailerreurs)
      items.value.push( {
        affiche: true,
        ppn: el.ppn,
        typeDocument: el.typeDocument,
        nberreurs: el.detailerreurs.length
      })
  });
  loading.value = false;
}

/**
 * Fonction permettant de récupérer les PPN pour la création de la requête WINIBW
 */
function getPpnList() {
  let ppnList = [];
  let listItems = (ppnFiltered.length === 0 || type.value === null) ? items.value : ppnFiltered;
  listItems.forEach(item => {
    ppnList.push(item.ppn);
  });
  return ppnList;
}

/**
 * Fonction permettant d'initialiser les listes de types de documents affichés dans le filtre
 */
function feedTypeList() {
  selectType.value.push("Tous");
  serviceApi.getFamillesDocuments()
      .then((response) => {
        response.data.forEach((el) => selectType.value.push(el.libelle));
      }).catch((error) => {
        //TODO : emit erreur si impossible de récupérer les types via appel axios
    //emitOnError(error);
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
 * Fonction permettant de savoir si le bouton de génération de la requête winibw est désactivé
 */
function isWinibwButtonDisabled() {
  return filterPpnByType().length === 0;
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

/**
 * Fonction renvoyant le ppn de la ligne sélectionné vers le composant parent
 */
function sendCurrentPpnToParent(item, row) {
  row.select(!row.isSelected);
  emit("onChangePpn", item.ppn);
}

function sendItemsToParent(items) {
  emit("onChangeItems", items);
}

function eventTypeChoice(element) {
  type.value = (element === "Tous") ? null : element;
  return filterPpnByType();
}

function filterPpnByType(){
    if (type.value !== null) {
      ppnFiltered = items.value.filter(item => {
          return item.typeDocument === type.value;
      });
      return ppnFiltered;
    }
    return items.value;
}

function updateItemSelected(ppn){
  let itemByType = filterPpnByType()
  model.value = [];
  model.value.push(itemByType[itemByType.map(item => item.ppn).indexOf(ppn)]);
}

/**
 * Fonction qui permet d'afficher ou de masquer toutes les lignes
 * @param value
 */
function toggleMask(value) {
  items.value.forEach(item => {
    item.affiche = value;
  })

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

.theme--light.v-data-table tbody tr.v-data-table__selected {
  background: #DADCE7 !important;
}
.theme--dark.v-data-table tbody tr.v-data-table__selected {
  background: #DADCE7 !important;
}
.theme--dark.v-data-table tbody tr.v-data-table__selected:hover {
  background: #DADCE7 !important;
}
.theme--light.v-data-table tbody tr.v-data-table__selected:hover {
  background: #DADCE7 !important;
}
</style>

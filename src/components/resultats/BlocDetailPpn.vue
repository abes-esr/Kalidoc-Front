<template>
  <v-container class="pa-0">
    <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Détail des erreurs par PPN</span>
    <v-container v-if="itemsPpnParent.length > 0 && itemsPpnParent[page-1]" class="pa-0 ma-0 borderErrorDetailPerPpn">
      <img v-if="coverLink !== ''" :src="coverLink" alt="Première de couverture non trouvée" class="borderPicturePpnErrorDetail">
      <v-sheet v-else rounded style="position:absolute;" class="borderPicturePpnErrorDetail pa-2 rounded-circle" :color="iconTypeDocument.color"><v-icon color="white">{{ iconTypeDocument.img }}</v-icon></v-sheet>
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle" style="background-color: #676C91; color: white">{{ itemsPpnParent[page-1].titre }} / {{ itemsPpnParent[page-1].auteur }}</div>
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle fontPrimaryColor" style="font-size: 0.92em">PPN {{ itemsPpnParent[page-1].ppn }}</div>
      <v-data-table id="bgColorGrey"
                    fixed-header
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="desc"
                    :headers="headers"
                    :items="itemsPpnParent[page-1].itemsDetailPpn"
                    :item-class="classItemPriority"
                    :items-per-page="itemsPpnParent[page-1].itemsDetailPpn.length"
                    :height="itemsPpnParent[page-1].itemsDetailPpn.length > 10 ? '40vh' : 'auto'"
                    hide-default-footer
                    dense
                    class="elevation-0"
      >
        <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
          <!--  Configuration de la colonne Règles  -->
          <span style='color: #252C61; font-weight: 500' v-if="header.value === 'priority'">
            <v-icon x-small color="#252C61">mdi-checkbox-blank-circle</v-icon>
            {{ header.text.split('|')[0] }}
            <v-icon color="grey" small >mdi-sort</v-icon>
            <br>
            <v-icon x-small color="#6d7085" class="pr-1">mdi-checkbox-blank-circle-outline</v-icon>
            <span style="font-weight: 500; color: #6d7085">{{ header.text.split('|')[1] }}</span>
          </span>
          <span style="color: grey; font-weight: 600" v-else>
              {{ header.text }}
            <v-icon color="grey" small >mdi-sort</v-icon>
          </span>
        </template>

        <!--  Icone dans la colonne Règles  -->
        <template v-slot:item.priority="{ item }">
          <v-container class="ma-0 pa-0 d-flex justify-center">
            <v-icon v-model="item.priority" small v-if="item.priority === 'essentielle'" color="#252C61">mdi-checkbox-blank-circle</v-icon>
            <v-icon v-model="item.priority" small v-if="item.priority === 'avancée'" color="#6d7085">mdi-checkbox-blank-circle-outline</v-icon>
          </v-container>
        </template>
      </v-data-table>
      <v-pagination
          v-model="page"
          :length="itemsPpnParent.length"
          :total-visible="12"
          @input="sendCurrentPpnToParent(itemsPpnParent[page-1].ppn)"
      ></v-pagination>
    </v-container>
    <v-container v-else class="pa-0  borderErrorDetailPerPpn">
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle" style="background-color: #676C91;"></div>
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle fontPrimaryColor"><b>Cliquer sur un ppn de la liste du bloc de gauche pour afficher les détails des erreurs</b></div>
    </v-container>
  </v-container>
</template>

<script setup>
import {ref, onUpdated, watchEffect } from "vue";
import { useResultatStore } from "@/stores/resultat";
import CoverService from "@/service/CoverService";

const props = defineProps({currentPpn: String,currentItems: Array});
const emit = defineEmits(['backendError','onChangePpn']);

const resultatStore = useResultatStore();
const service = CoverService;

const page = ref(1);
const coverLink = ref('');
const iconTypeDocument = ref({color:"black",img:"mdi-help"});
const itemsPpnParent = ref([]);
let sortBy = "zone1";
let desc = false;
const headers = [
  {text: "Zone UNM1", value: "zone1", width: 133},
  {text: "Zone UNM2", value: "zone2", width: 133},
  {text: "Message d'erreur", value: "message",  width: 351},
  {text: "Règle essentielle|Règle avancée", value: "priority", width: 170}
];


/**
 * Fonction qui permet de vérifier un changement de valeur du ppn courant
 */
watchEffect(() => {
  if(props.currentPpn){
    itemsPpnParent.value = [];
    coverLink.value = '';
    resultatStore.getResultsList
        .filter(e => props.currentItems
            .filter(el => el.ppn === e.ppn).length > 0)
        .forEach(result => {
          let temp = [];
          result.detailerreurs.forEach((erreur)=> {temp.push({
              zone1: erreur.zones[0],
              zone2: erreur.zones[1],
              priority: getPriority(erreur.priority),
              message: erreur.message
            });
          })
          itemsPpnParent.value[props.currentItems.map(item => item.ppn).indexOf(result.ppn)] = {
            titre: result.titre,
            auteur: result.auteur,
            ppn: result.ppn,
            itemsDetailPpn: temp,
          }
        });
    page.value = itemsPpnParent.value.map(item => item.ppn).indexOf(props.currentPpn) + 1;
  }
})

/**
 * Fonction qui modifie la class de l'item sélectionné en fonction de sa priorité
 * @param item
 * @returns {essentielle: boolean, avancee: boolean}
 */
function classItemPriority(item){
  return {
    essentielle: item.priority === 'essentielle',
    avancee: item.priority === 'avancée',
  }
}

onUpdated(() => {
  feedCover();
})

function feedCover() {
  const detailCurrentPpn = resultatStore.getResultsList.filter(result => result.ppn === props.currentPpn);
  let ocn;
  let isbn;
  let typeDocument;
  if (detailCurrentPpn.length > 0) {
    ocn = detailCurrentPpn[0].ocn;
    isbn = detailCurrentPpn[0].isbn;
    typeDocument = detailCurrentPpn[0].typeDocument;
  }
  if (ocn !== '' && ocn !== undefined && ocn !== null) {
    service.getCoverByOcn(ocn).then((response) => {
      coverLink.value = response.data.items[0].volumeInfo.imageLinks.thumbnail;
      if (coverLink.value === '') {
        getCoverByIsbn(isbn);
      }
    }).catch((error) => {
      emitOnError(error);
    });
  } else {
    getCoverByIsbn(isbn);
  }
  if (coverLink.value === '') {
    //pas de réponse du ws GB, on affiche une image correspondant au type de document de la notice
    getIconTypeDocument(typeDocument);
  }
}

function getCoverByIsbn(isbn) {
  //pas de retour avec OCN, on tente avec ISBN
  if (isbn !== '' && isbn !== undefined && isbn !== null) {
    service.getCoverByIsbn(isbn).then((response) => {
      if (response.data.items)
        coverLink.value = response.data.items[0].volumeInfo.imageLinks.thumbnail;
    }).catch((error) => {
      emitOnError(error);
    });
  }
}

function getIconTypeDocument(typeDocument) {
  switch (typeDocument) {
    case "Monographie":
      iconTypeDocument.value.img="mdi-bookshelf";
      iconTypeDocument.value.color="green";
      break;
    case "Doc Elec":
      iconTypeDocument.value.img="mdi-mouse-variant";
      iconTypeDocument.value.color="orange";
      break;
    case "Enregistrement":
      iconTypeDocument.value.img="mdi-volume-high";
      iconTypeDocument.value.color="pink";
      break;
    case "Image":
      iconTypeDocument.value.img="mdi-camera";
      iconTypeDocument.value.color="orange";
      break;
    case "Manuscrit":
      iconTypeDocument.value.img="mdi-script-outline";
      iconTypeDocument.value.color="brown";
      break;
    case "Multimédia":
      iconTypeDocument.value.img="mdi-movie-play-outline";
      iconTypeDocument.value.color="purple";
      break;
    case "Objet":
      iconTypeDocument.value.img="mdi-cube";
      iconTypeDocument.value.color="cyan";
      break;
    case "Musique":
      iconTypeDocument.value.img="mdi-album";
      iconTypeDocument.value.color="orange";
      break;
    case "Partition":
      iconTypeDocument.value.img="mdi-music";
      iconTypeDocument.value.color="red";
      break;
    case "Ressource continue":
      iconTypeDocument.value.img="mdi-newspaper-variant-outline";
      iconTypeDocument.value.color="grey";
      break;
    case "Audiovisuel":
      iconTypeDocument.value.img="mdi-video-vintage";
      iconTypeDocument.value.color="purple";
      break;
    case "Carte":
      iconTypeDocument.value.img="mdi-web";
      iconTypeDocument.value.color="blue";
      break;
    case "Thèse":
      iconTypeDocument.value.img="mdi-school";
      iconTypeDocument.value.color="black";
      break;
    case "Partie composante":
      iconTypeDocument.value.img="mdi-card-search-outline";
      iconTypeDocument.value.color="blue";
      break;
    default:
      iconTypeDocument.value.img="mdi-help";
      iconTypeDocument.value.color="black";
  }
}

function emitOnError(error){
  emit('backendError', error);
}

function sendCurrentPpnToParent(currentPpn) {
  emit('onChangePpn', currentPpn);
}

function getPriority(priority){
  if (priority === "P1") {
    return "essentielle"
  } else if (priority === "P2") {
    return "avancée"
  }
}
</script>

<style>

.essentielle{
  font-weight: 400;
  color: #252C61;
}

.avancee{
  font-weight: 400;
  color: #6d7085;
}
</style>
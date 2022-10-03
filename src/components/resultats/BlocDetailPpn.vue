<template>

  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Détail des erreurs par PPN</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <img v-if="coverLink !== ''" :src="coverLink" alt="Première de couverture non trouvée" class="borderPicturePpnErrorDetail">
      <v-btn v-else style="position:absolute;" class="borderPicturePpnErrorDetail" fab small depressed :color="iconTypeDocument.color"><v-icon color="white">{{ iconTypeDocument.img }}</v-icon></v-btn>

      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle" style="background-color: #676C91; color: white">{{ itemsPpnParent[page-1].titre }} / {{ itemsPpnParent[page-1].auteur }}</div>
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle fontPrimaryColor">Détail des erreurs pour {{ itemsPpnParent[page-1].ppn }}</div>
      <div>
        <v-data-table
            :headers="headers"
            :items="itemsPpnParent[page-1].itemsDetailPpn"
            :items-per-page="itemsPerPage"
            hide-default-footer
            dense
            class="elevation-0"
        ></v-data-table>
      </div>
    </v-container>
    <div class="text-center pt-2">
      <v-pagination
          v-model="page"
          :length="itemsPpnParent.length"
          @input="sendCurrentPpnToParent(itemsPpnParent[page-1].ppn)"
      ></v-pagination>
    </div>
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

  let page = ref(1);
  let itemsPerPage = ref(5);
  let coverLink = ref('');
  let iconTypeDocument = ref({color:"black",img:"mdi-help"});
  let itemsPpnParent = ref([]);

  let headers = ref([
    {text: "Zone UNM1", value: "zone1", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Zone UNM2", value: "zone2", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Message d'erreur (Régle essentielle / Règle avancée)", value: "message", class: "dataTableHeaderDetailErrorPerPpn"}
  ]);


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
                zone1: erreur.zoneunm1,
                zone2: erreur.zoneunm2,
                message: erreur.message
              });
            })
            itemsPpnParent.value.push({
              titre: result.titre,
              auteur: result.auteur,
              ppn: result.ppn,
              itemsDetailPpn: temp,
            })
          });
      page.value = itemsPpnParent.value.map(item => item.ppn).indexOf(props.currentPpn) + 1;
    }
  })

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
        iconTypeDocument.value.img="mdi-script-outlin";
        iconTypeDocument.value.color="brown";
        break;
      case "Multimédia":
        iconTypeDocument.value.img="mdi-multimedia";
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
      case "Thèse soutenance":
        iconTypeDocument.value.img="mdi-school";
        iconTypeDocument.value.color="black";
        break;
      case "Thèse reproduction":
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
</script>

<style scoped>

</style>
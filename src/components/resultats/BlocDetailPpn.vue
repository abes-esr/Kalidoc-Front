<template>

  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Détail des erreurs par PPN</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <img src="@/assets/card-off-outline.svg" alt="Première de couverture non trouvée" class="borderPicturePpnErrorDetail">
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle" style="background-color: #676C91; color: white">{{ titre }} / {{ auteur }}</div>
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle fontPrimaryColor">Détail des erreurs pour {{ currentPpn }}</div>
      <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            dense
            class="elevation-0"
        ></v-data-table>
      </div>
    </v-container>
    <div class="text-center pt-2">
<!--      <v-pagination-->
<!--          v-model="page"-->
<!--          :length="pageCount"-->
<!--      ></v-pagination>-->
    </div>
  </v-container>

</template>

<script setup>
  import {ref, watchEffect } from "vue";
  import { useResultatStore } from "@/stores/resultat";

  const props = defineProps({currentPpn: String});
  const resultatStore = useResultatStore();

  let page = ref(1);
  let pageCount = ref(0);
  let itemsPerPage = ref(5);
  let titre = ref();
  let auteur = ref();

  let headers = ref([
    {text: "Zone UNM1", value: "zone1", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Zone UNM2", value: "zone2", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Message d'erreur (Régle essentielle / Règle avancée)", value: "message", class: "dataTableHeaderDetailErrorPerPpn"}
  ]);
  let items = ref([])

  /**
   * Fonction qui permet de vérifier un changement de valeur du ppn courant
   */
  watchEffect(() => {
    if(props.currentPpn){
      resultatStore.getResultsList.forEach((result) => {
        if(result.ppn === props.currentPpn) {
          titre.value = result.titre;
          auteur.value = result.auteur;
          items.value = [];
          result.detailerreurs.forEach((erreur)=> {
            items.value.push({
              zone1: erreur.zoneunm1,
              zone2: erreur.zoneunm2,
              message: erreur.message
            })
          })
        }
      });
    }
  })

</script>

<style scoped>

</style>
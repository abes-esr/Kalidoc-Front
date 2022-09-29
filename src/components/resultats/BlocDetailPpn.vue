<template>

  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Détail des erreurs par PPN</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <img src="@/assets/card-off-outline.svg" alt="Première de couverture non trouvée" class="borderPicturePpnErrorDetail">
      <div class="mb-2 pt-1 text-justify detailErrorPpnSubtitle" style="background-color: #676C91; color: white">{TitreDuLivre} / {Auteur}</div>
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
  import {ref} from "vue";

  const props = defineProps({currentPpn: String, errorsDetails: []});

  let page = ref(1);
  let pageCount = ref(0);
  let itemsPerPage = ref(5);

  let headers = ref([
    {text: "Zone UNM1", value: "zone1", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Zone UNM2", value: "zone2", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Message d'erreur (Régle essentielle / Règle avancée)", value: "message", class: "dataTableHeaderDetailErrorPerPpn"}
  ]);
  // TODO trouver comment nourrir la liste items à partir de errorsDetails
  let items = ref([
    // {zone1: "606", zone2: "", message: "Zone 606 : absence de liens $3"},
    // {zone1: "700$b", zone2: "", message: "Zone 700 : 700$b contient un terme générique à compléter"},
  ])

</script>

<style scoped>

</style>
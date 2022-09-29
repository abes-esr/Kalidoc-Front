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
            :page.sync="page1"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            dense
            class="elevation-0"
        ></v-data-table>
      </div>
    </v-container>

    <div class="text-center pt-2">
      <v-pagination
          v-model="page"
          :length="pageCount"
      ></v-pagination>
    </div>
  </v-container>

</template>

<script setup>
  import {ref} from "vue";
  import { useResultatStore } from "@/stores/resultat";

  const props = defineProps({currentPpn: String});
  const resultatStore = useResultatStore();

  let page = ref(1);
  let pageCount = ref(0);
  let itemsPerPage = ref(5);
  let resultsList = ref([]);

  let headers = ref([
    {text: "Zone UNM1", value: "zone1", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Zone UNM2", value: "zone2", class: "dataTableHeaderDetailErrorPerPpn"},
    {text: "Message d'erreur (Régle essentielle / Règle avancée)", value: "message", class: "dataTableHeaderDetailErrorPerPpn"}
  ]);
  let items = ref([
    {zone1: "210", zone2: "", message: "Zone 210 : doit être remplacée par zone 214"},
    {zone1: "606", zone2: "", message: "Zone 606 : absence de liens $3"},
    {zone1: "700$b", zone2: "", message: "Zone 700 : 700$b contient un terme générique à compléter"},
    {zone1: "", zone2: "210", message: "Zone 210 : doit être remplacée par zone 214"},
    {zone1: "", zone2: "606", message: "Zone 606 : absence de liens $3"},
    {zone1: "", zone2: "700$b", message: "Zone 700 : 700$b contient un terme générique à compléter"},
  ])

</script>

<style scoped>

</style>
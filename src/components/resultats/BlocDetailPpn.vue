<template>

  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Détail des erreurs par PPN</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <img src="@/assets/abesLogo130.svg" style="border: solid 1px black; position: absolute; margin-top: 5px; margin-left: 5px; width: 60px; height: 80px; max-width: 60px; max-height: 80px">
      <div class="mb-5 text-justify" style="font-size: 1.2em; padding-left: 76px; height: 30px; color: white; background-color: #676C91">Titre du livre / Auteur</div>
      <div class="mb-5 text-justify fontPrimaryColor" style="font-size: small; padding-left: 76px">Détail des erreurs pour [PPN 03]</div>
      <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="page"
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

  const props = defineProps({currentPpn: String});

  let page = ref(1);
  let pageCount = ref(0);
  let itemsPerPage = ref(5);

  let headers = ref([
    {text: "", value: "blank", class: "header"},
    {text: "Zone UNM1", value: "zone1", class: "header"},
    {text: "Zone UNM2", value: "zone2", class: "header"},
    {text: "Message d'erreur (Régle essentielle / Règle avancée)", value: "message", class: "header"}
  ]);
  let items = ref([
    {blank: "", zone1: "210", zone2: "", message: "Zone 210 : doit être remplacée par zone 214"},
    {blank: "", zone1: "606", zone2: "", message: "Zone 606 : absence de liens $3"},
    {blank: "", zone1: "700$b", zone2: "", message: "Zone 700 : 700$b contient un terme générique à compléter"},
    {blank: "", zone1: "", zone2: "210", message: "Zone 210 : doit être remplacée par zone 214"},
    {blank: "", zone1: "", zone2: "606", message: "Zone 606 : absence de liens $3"},
    {blank: "", zone1: "", zone2: "700$b", message: "Zone 700 : 700$b contient un terme générique à compléter"},
  ])

</script>

<style scoped>
.header{
  color: white;
  background-color: #e6e6e6;
}
</style>
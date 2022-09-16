<template>
  <v-card>
    <v-card-title>Liste des PPN avec erreurs</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :footer-props="{
        itemsPerPageOptions: [5,10,20,30,-1]
      }"
      dense
    >
            <template v-slot:item.masquee="{ item }">
<!--              <v-icon v-if="item.masquee" @click="item.masquee = !item.masquee" small>  mdi-eye </v-icon>-->
<!--              <v-icon v-if="!item.masquee"  @click="item.masquee = !item.masquee" small>  mdi-eye-off-outline </v-icon>-->
              <v-checkbox
                  v-model="item.masquee"
                  on-icon="mdi-eye"
                  off-icon="mdi-eye-off-outline"
                  dense
              ></v-checkbox>
            </template>
      <template v-slot:item.ppn="{ item }"  >
        <p>{{item.ppn}}</p>
      </template>
      <template v-slot:item.type="{ item }" class="primary" :disabled="item.masquee">
        {{item.type}}
      </template>
      <template v-slot:item.nberreurs="{ item }" :disabled="item.masquee">
        {{item.nberreurs}}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue"


let headers = ref([
  { text: "Aff/Masq.", value: "masquee"},
  { text: "PPN", value: "ppn"},
  { text: "Type PPN", value: "type"},
  { text: "Nd. erreurs", value: "nberreurs"}
]);

// Donnée d'exemple pour remplire le tableau
let items = ref([
  {
    masquee : true,
    ppn : "111113111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "114511111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111116111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "111111111",
    type: "doc",
    nberreurs: 1
  },
  {
    masquee : true,
    ppn : "222222222",
    type: "doc",
    nberreurs: 2
  },
  {
    masquee : false,
    ppn : "333333333",
    type: "peri",
    nberreurs: 102
  },
  {
    masquee : false,
    ppn : "444444444",
    type: "media",
    nberreurs: 1
  }
]);

</script>
<template>
  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Récapitulatif</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <span style="color: grey; font-weight: 400; font-size: 0.9em;"><bloc-rappel-type-analyse></bloc-rappel-type-analyse></span>

      <v-carousel
          hide-delimiters
          :continuous="false"
      >
        <v-carousel-item
            v-for="(i) in getNumberSlides()"
            :key="i"
        >
          <v-row>
            <v-col>
              <CardRecapitulatif :numero-lancement="i"/>
            </v-col>
            <v-col v-if="isItemsSizeGreaterThanOneAndLesserThanSize(i)">
              <CardRecapitulatif :numero-lancement="i+1"/>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-btn @click="test()">test</v-btn>
  </v-container>
</template>

<script setup>
import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
import CardRecapitulatif from "@/components/resultats/CardRecapitulatif";
import {ref} from 'vue';

let items = ref();

items.value = ["1"]


function test() {
  items.value.push("2");
}

function getNumberSlides() {
  console.log(items.value.length);
  return items.value.length === 1 ? 1 : items.value.length - 1;
}

function isItemsSizeGreaterThanOneAndLesserThanSize(i) {
  return (items.value.length > 1) && (i < items.value.length);
}

</script>


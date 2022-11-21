<template>
  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Récapitulatif</span>
    </v-row>
    <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
      <span style="color: grey; font-weight: 400; font-size: 0.9em;"><bloc-rappel-type-analyse></bloc-rappel-type-analyse></span>

      <v-carousel
          v-model="page"
          hide-delimiters
          :continuous="false"
          height="auto"
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
    <v-btn @click="test()">test {{items.length}}</v-btn>
  </v-container>
</template>

<script setup>
import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
import CardRecapitulatif from "@/components/resultats/CardRecapitulatif";
import {ref} from 'vue';

const items = ref(["1"]);
const page = ref(0);


function test() {
  items.value.push("2");
  console.log(items.value.length);
  goLastSlide();
}

function getNumberSlides() {
  return items.value.length === 1 ? 1 : items.value.length - 1;
}

function goLastSlide() {
  page.value = (items.value.length > 2) ? items.value.length - 2 : 0;
}

function isItemsSizeGreaterThanOneAndLesserThanSize(i) {
  return (items.value.length > 1) && (i < items.value.length);
}

</script>


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
            v-for="i in getNumberSlides()"
            :key="i"
        >
          <v-row>
            <v-col>
              <CardRecapitulatif :numero-lancement="i"/>
            </v-col>
            <v-col v-if="isSecondCardHasToBeDisplayed(i)">
              <CardRecapitulatif :numero-lancement="i+1"/>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-container>
</template>

<script setup>
import BlocRappelTypeAnalyse from "@/components/resultats/BlocRappelTypeAnalyse";
import CardRecapitulatif from "@/components/resultats/CardRecapitulatif";
import {ref, watchEffect} from 'vue';

const page = ref(0);
const props = defineProps({
  // props
  'nombreResultatAnalyse': {
    type: Number,
    required: true
  }
});

watchEffect(() => {
  if (props.nombreResultatAnalyse) {
    goToLastSlide();
  }
})

function getNumberSlides() {
  return props.nombreResultatAnalyse <= 2 ? 1 : props.nombreResultatAnalyse - 1;
}

function goToLastSlide() {
  page.value = (props.nombreResultatAnalyse > 2) ? props.nombreResultatAnalyse - 2 : 0;
}

function isSecondCardHasToBeDisplayed(i) {
  return (props.nombreResultatAnalyse > 1) && (i < props.nombreResultatAnalyse);
}

</script>


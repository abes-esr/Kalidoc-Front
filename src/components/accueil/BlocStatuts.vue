<template>
  <v-hover v-slot="{ hover }" close-delay="300">
    <div>
      <v-btn fab small depressed color="white">
        <v-icon>mdi-gauge</v-icon>
      </v-btn>
      <v-card v-if="hover" elevation="12" style="position: absolute; margin-left: -360px; margin-top: 20px; z-index: 10; border-radius: 5px!important;" width="400">
        <v-card-title class="justify-center pt-1" style="background-color: #252C61; color: white"><span>STATUS</span></v-card-title>
        <v-card-text style="background-color: white;color: black">
          <v-row><v-col cols="12">Base Xml</v-col><v-col cols="6">{{applicationStatus.statutBaseXml}}</v-col></v-row>
          <v-row><v-col cols="12">Base Qualimarc</v-col><v-col cols="6">{{applicationStatus.statutBaseQualimarc}}</v-col></v-row>
          <v-row><v-col cols="12">Dernière synchro CBS<->Base XML</v-col><v-col cols="6">{{applicationStatus.dateDerniereSynchronisation}}</v-col></v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-hover>
</template>

<script setup>
import {ref} from "vue";
import StatutsService from "@/service/StatutsService";

const service = StatutsService;
const emit = defineEmits(['backendError']);
const overlay = ref(false);
const applicationStatus = ref({});



function displayStatus() {
  console.log("appel ws");
  service.getStatusApplication().then((response) => {
    applicationStatus.value = response.data;
  }).catch((error) => {
    emitOnError(error);
  });
}

function emitOnError(error){
  emit('backendError', error);
}
</script>

<style scoped>

</style>
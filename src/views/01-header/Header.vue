<template>
   <v-container class="pa-0 titleBar" fluid>
      <v-row class="titleBarRow" align="center" justify="start" no-gutters>
         <v-col cols="auto" class="mr-auto" id="titleBarCols">
            <a><img src="@/assets/logo200.png" class="titleBarLogo" @click="$router.push({path: '/'})" style="max-width: 100%; max-height: 100%" alt="logo periscope" /></a>
         </v-col>
        <v-col cols="auto" class="mr-auto" id="titleBarCols">
          <v-btn text color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>
          <v-btn text color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des règles</v-btn>
          <v-btn text color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>
        </v-col>
        <v-col md="auto"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance"><v-icon color="white" large>mdi-chat-outline</v-icon></a></v-col>
        <v-col md="auto" id="titleBarCols"><a href="https://documentation.abes.fr/aideperiscope/" target="_blank" title="Assistance"><v-icon color="white" large>mdi-help</v-icon></a></v-col>
      </v-row>
   </v-container>
</template>

<script setup>
import { ref } from 'vue';

let isSelected = ref("");

function setSelectedButton(){

}
</script>

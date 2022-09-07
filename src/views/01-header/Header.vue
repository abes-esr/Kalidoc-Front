<template>
   <v-container absolute padless class="pa-0 titleBar" fluid>
     <v-row class="pr-4 pb-4 pl-12" justify="center" align="baseline" no-gutters v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
       <v-col cols="2">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <a><img src="@/assets/QMlogo200.png" class="titleBarNormalSizeLogo" @click="$router.push({path: '/'})" alt="logo Qualimarc" style="position: relative; bottom: -14px"/></a>
         </v-row>
       </v-col>
       <v-col cols="8" class="pl-6">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des règles</v-btn>
           <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>
         </v-row>
       </v-col>
       <v-col cols="2">
         <v-row justify="center" no-gutters>
           <v-col class="ml-2 mr-0 pr-0"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance">
             <v-btn fab small color="white">
               <v-icon color="#252c61">mdi-forum-outline</v-icon>
             </v-btn>
           </a></v-col>
           <v-col class="ma-0 pl-0" id="titleBarCols"><a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Assistance">
             <v-btn fab small color="white">
               <v-icon color="#252c61">mdi-help</v-icon>
             </v-btn>
           </a></v-col>
         </v-row>
       </v-col>
     </v-row>

     <v-row class="pa-2" justify="center" no-gutters v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
       <v-col cols="2" class="pl-8">
          <a><img src="@/assets/QMIcon.png" class="titleBarNormalSizeLogo" @click="$router.push({path: '/'})" style="height: 50px" alt="logo Qualimarc" /></a>
       </v-col>
       <v-col cols="7">
         <v-row class="ma-0 pa-0" justify="center">
           <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" small @click="" v-if="">Interface de vérification</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" small @click="" v-if="">Interface des Règles</v-btn>
           <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" small @click="" v-if="">Historique</v-btn>
         </v-row>
       </v-col>
       <v-col cols="3">
         <v-row justify="center" no-gutters>
           <v-col class="ml-2 mr-0 pr-0"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance">
             <v-btn fab x-small color="white">
               <v-icon color="#252c61">mdi-forum-outline</v-icon>
             </v-btn>
           </a></v-col>
           <v-col class="ma-0 pl-0" id="titleBarCols"><a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Assistance">
             <v-btn fab x-small color="white">
               <v-icon color="#252c61">mdi-help</v-icon>
             </v-btn>
           </a></v-col>
         </v-row>
       </v-col>
     </v-row>
   </v-container>
</template>

<script setup>
import { ref } from 'vue';

let isSelected = ref("");

function setSelectedButton(){

}
</script>

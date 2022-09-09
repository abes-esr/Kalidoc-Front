<template>
   <v-container absolute padless class="pa-0" fluid>

<!--     HEADER NAVIGATEUR-->
     <v-row class="pr-4 pb-4 pl-12 bgColorPrimary" justify="center" align="baseline" no-gutters v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
       <v-col cols="2">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <a><img src="@/assets/QMLogo.svg" class="titleBarLogo" @click="$router.push({path: '/'})" alt="logo Qualimarc"/></a>
         </v-row>
       </v-col>
       <v-col cols="8" class="pl-6">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <v-btn text tile color="white" value="interfaceVerification" @click="activeBtn = 'btn1'" :class="{titleBarButtonSelected: activeBtn === 'btn1' }" to="/" v-if="">Interface de vérification</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" @click="activeBtn = 'btn2'" :class="{titleBarButtonSelected: activeBtn === 'btn2' }" to="/resultats" v-if="">Interface des règles</v-btn>
           <v-btn text tile color="white" value="historique" @click="activeBtn = 'btn3'" :class="{titleBarButtonSelected: activeBtn === 'btn3' }" v-if="">Historique</v-btn>
         </v-row>
       </v-col>
       <v-col cols="2">
         <v-row justify="center" no-gutters>
           <v-col class="ml-2 mr-0 pr-0"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance">
             <v-btn fab small depressed color="white">
               <v-img src="@/assets/chatBubbles.svg" max-height="34px" max-width="34px"></v-img>
             </v-btn>
           </a></v-col>
           <v-col class="ma-0 pl-0  pl-2 pr-2"><a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Assistance">
             <v-btn fab small depressed color="white">
               <v-img src="@/assets/questionMark.svg" max-height="34px" max-width="34px"></v-img>
             </v-btn>
           </a></v-col>
         </v-row>
       </v-col>
     </v-row>

<!--     HEADER MOBILE && TABLETTE-->
     <v-row class="pa-2 bgColorPrimary" justify="center" no-gutters v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
       <v-col cols="2" class="mb-0 pa-0 pl-8">
          <a><img src="@/assets/QMLogoIconBlue.svg" @click="$router.push({path: '/'})" style="height: 60px; margin-bottom: -9px; margin-top: -2px" alt="logo Qualimarc" /></a>
       </v-col>
       <v-col cols="7">
         <v-row class="ma-0 pa-0" justify="center">
           <v-btn text tile color="white" value="interfaceVerification" small @click="activeBtn = 'btn1'" :class="{titleBarButtonSelected: activeBtn === 'btn1' }" to="/" v-if="">Vérification</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" small @click="activeBtn = 'btn2'" :class="{titleBarButtonSelected: activeBtn === 'btn2' }" to="/resultats" v-if="">Règles</v-btn>
           <v-btn text tile color="white" value="historique" small @click="activeBtn = 'btn3'" :class="{titleBarButtonSelected: activeBtn === 'btn3' }" v-if="">Historique</v-btn>
         </v-row>
       </v-col>
       <v-col cols="3">
         <v-row class="ma-0 pa-0">
           <v-col class="ml-2 mr-0 pr-0">
            <a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance">
             <v-btn fab x-small color="white">
               <v-img src="@/assets/chatBubbles.svg" max-height="24px" max-width="24px"></v-img>
             </v-btn>
            </a>
           </v-col>
           <v-col class="ma-0 pl-0 pl-2 pr-2">
            <a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Assistance">
             <v-btn fab x-small color="white">
               <v-img src="@/assets/questionMark.svg" max-height="24px" max-width="24px"></v-img>
             </v-btn>
            </a>
           </v-col>
         </v-row>
       </v-col>
     </v-row>
   </v-container>
</template>

<script setup>
import { ref } from 'vue';

let activeBtn = ref("btn1");

</script>

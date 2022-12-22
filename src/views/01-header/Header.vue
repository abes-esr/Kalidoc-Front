<template>
   <v-container absolute padless class="pa-0" fluid>
     <v-row :class="($vuetify.breakpoint.mdAndUp) ? 'pr-4 pb-4 pl-12 bgColorPrimary' : 'pa-2 bgColorPrimary'" justify="center" :align="($vuetify.breakpoint.mdAndUp) ? 'baseline' : null" no-gutters>
       <v-col cols="2">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <a @click="$router.push({path: '/'})" >
             <img v-if="($vuetify.breakpoint.mdAndUp)" src="@/assets/QMLogo.svg" class="titleBarLogo" alt="logo Qualimarc"/>
             <img v-else src="@/assets/QMLogoIconBlue.svg" style="height: 60px; margin-bottom: -9px; margin-top: -2px" alt="logo Qualimarc" />
           </a>
         </v-row>
       </v-col>
       <v-col :cols="($vuetify.breakpoint.mdAndUp) ? '8' : '7'" :class="($vuetify.breakpoint.mdAndUp) ? 'pl-6' : null">
         <v-row :class=" ($vuetify.breakpoint.mdAndUp) ? 'ma-0 pa-0 pl-2' : 'ma-0 pa-0'" justify="center">
           <v-btn text tile color="white" value="interfaceVerification" :class="{titleBarButtonSelected: (route.path === '/') || (route.path === '/resultats') }" to="/">{{ ($vuetify.breakpoint.mdAndUp) ? 'Interface de vérification' : 'Vérification' }}</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" :class="{titleBarButtonSelected: route.path === '/regles' }" to="/regles"> {{($vuetify.breakpoint.mdAndUp) ? 'Interface des règles' : 'Règles' }}</v-btn>
           <v-btn text tile color="white" value="historique" :class="{titleBarButtonSelected: route.path === '/historiques' }" to="/historiques" >Historique</v-btn>
         </v-row>
       </v-col>
       <v-col :cols=" ($vuetify.breakpoint.mdAndUp) ? '2' : '3'">
         <v-row :class="($vuetify.breakpoint.mdAndUp) ? null : 'ma-0 pa-0'" :justify="($vuetify.breakpoint.mdAndUp) ? 'center' : null" :no-gutters="$vuetify.breakpoint.mdAndUp">
           <v-col class="ml-2 mr-0 pr-0">
             <a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Poser une question sur Abesstp">
               <v-btn fab :x-small="!$vuetify.breakpoint.mdAndUp" :small="$vuetify.breakpoint.mdAndUp" :depressed="$vuetify.breakpoint.mdAndUp" color="white">
                 <v-img src="@/assets/chatBubbles.svg" :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'"></v-img>
               </v-btn>
             </a>
           </v-col>
           <v-col class="ma-0 px-2">
             <a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Consulter le manuel utilisateur QualiMarc">
               <v-btn fab :x-small="!$vuetify.breakpoint.mdAndUp" :small="$vuetify.breakpoint.mdAndUp" :depressed="$vuetify.breakpoint.mdAndUp" color="white">
                 <v-img src="@/assets/questionMark.svg" :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'"></v-img>
               </v-btn>
             </a>
           </v-col>
           <v-col class="ml-0 mr-2 pr-2">
             <bloc-statuts></bloc-statuts>
           </v-col>
         </v-row>
       </v-col>
      </v-row>
   </v-container>

</template>

<script setup>
import { useRoute } from "vue-router/composables"
import BlocStatuts from "@/components/accueil/BlocStatuts";

const route = useRoute();
</script>

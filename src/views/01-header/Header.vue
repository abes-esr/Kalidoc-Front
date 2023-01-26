<template>
  <header absolute padless class="pa-0" fluid>
    <nav>
     <v-row :class="($vuetify.breakpoint.mdAndUp) ? 'pr-4 pb-4 pl-12 bgColorPrimary' : 'pa-2 bgColorPrimary'" justify="center" :align="($vuetify.breakpoint.mdAndUp) ? 'end' : 'start'" no-gutters>
       <v-col cols="2" :style="($vuetify.breakpoint.mdAndUp) ? null : 'margin-bottom: -10px'">
         <a @click="$router.push({path: '/'})">
           <img v-if="($vuetify.breakpoint.mdAndUp)" src="@/assets/QMLogo.svg" class="titleBarLogo" alt="logo Qualimarc"/>
           <img v-else src="@/assets/QMLogoIconBlue.svg" style="height: 50px; margin-bottom: -9px; margin-top: -8px" alt="logo Qualimarc"/>
         </a>
       </v-col>
       <v-col :cols="($vuetify.breakpoint.mdAndUp) ? '8' : '7'" :class="($vuetify.breakpoint.mdAndUp) ? 'pl-8' : null">
         <v-row class="ma-0 pa-0" justify="center" role="toolbar" aria-label="Navigation interne" aria-controls="navInterne">
           <v-btn text tile color="white" value="interfaceVerification" :class="{titleBarButtonSelected: (route.path === '/') || (route.path === '/resultats') }" to="/" aria-pressed="false" tabindex="1">{{ ($vuetify.breakpoint.mdAndUp) ? 'Interface de vérification' : 'Vérification' }}</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" :class="{titleBarButtonSelected: route.path === '/regles' }" to="/regles" aria-pressed="false" tabindex="2"> {{($vuetify.breakpoint.mdAndUp) ? 'Interface des règles' : 'Règles' }}</v-btn>
           <v-btn text tile color="white" value="historique" :class="{titleBarButtonSelected: route.path === '/historiques' }" to="/historiques" aria-pressed="false" tabindex="3">Historique</v-btn>
         </v-row>
       </v-col>
       <v-col :cols="($vuetify.breakpoint.mdAndUp) ? '2' : '3'">
         <v-row :class="($vuetify.breakpoint.mdAndUp) ? 'justify-center' : 'ma-0 pa-0 justify-end'" :no-gutters="$vuetify.breakpoint.mdAndUp" aria-label="Navigation externe" aria-controls="navExterne">
           <v-btn :style="($vuetify.breakpoint.mdAndUp) ? 'margin-right: 10px' : 'margin-right: 3px'" fab :x-small="!$vuetify.breakpoint.mdAndUp" :small="$vuetify.breakpoint.mdAndUp" :depressed="$vuetify.breakpoint.mdAndUp" color="white" href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" >
             <v-img src="@/assets/chatBubbles.svg" :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" alt="Poser une question sur Abes STP"></v-img>
           </v-btn>
           <v-btn :style="($vuetify.breakpoint.mdAndUp) ? 'margin-right: 10px' : 'margin-right: 3px'" fab :x-small="!$vuetify.breakpoint.mdAndUp" :small="$vuetify.breakpoint.mdAndUp" :depressed="$vuetify.breakpoint.mdAndUp" color="white" href="https://documentation.abes.fr/aidequalimarc/index.html" target="_blank" aria-pressed="false" tabindex="5">
             <v-img src="@/assets/questionMark.svg" :max-height="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" :max-width="($vuetify.breakpoint.mdAndUp) ? '34px' : '24px'" alt="Consulter le manuel utilisateur QualiMarc"></v-img>
           </v-btn>
           <bloc-statuts aria-pressed="false" tabindex="6"></bloc-statuts>
         </v-row>
       </v-col>
      </v-row>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router/composables"
import BlocStatuts from "@/components/accueil/BlocStatuts";

const route = useRoute();
</script>

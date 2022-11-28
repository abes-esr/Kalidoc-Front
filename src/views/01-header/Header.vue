<template>
   <v-container absolute padless class="pa-0" fluid>
     <v-row :class="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'pr-4 pb-4 pl-12 bgColorPrimary' : 'pa-2 bgColorPrimary'" justify="center" :align="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'baseline' : null" no-gutters>
       <v-col cols="2">
         <v-row class="ma-0 pa-0 pl-2" justify="center">
           <a><img src="@/assets/QMLogo.svg" class="titleBarLogo" @click="$router.push({path: '/'})" alt="logo Qualimarc"/></a>
         </v-row>
       </v-col>
       <v-col :cols="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '8' : '7'" :class="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'pl-6' : null">
         <v-row :class=" (!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'ma-0 pa-0 pl-2' : 'ma-0 pa-0'" justify="center">
           <p>{{ routerPath }}</p>
           <v-btn text tile color="white" value="interfaceVerification" :class="{titleBarButtonSelected: (route.path === '/') || (route.path === '/resultats') }" to="/">{{ (!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'Interface de vérification' : 'Vérification' }}</v-btn>
           <v-btn text tile color="white" value="interfaceRegles" :class="{titleBarButtonSelected: route.path === '/regles' }" to="/regles"> {{( !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'Interface des règles' : 'Règles' }}</v-btn>
           <v-btn text tile color="white" value="historique" :class="{titleBarButtonSelected: route.path === '/historiques' }" to="/historiques" >Historique</v-btn>
         </v-row>
       </v-col>
       <v-col :cols=" (!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '2' : '3'">
         <v-row :class="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? null : 'ma-0 pa-0'" :justify="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? 'center' : null" :no-gutters="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)">
           <v-col class="ml-2 mr-0 pr-0">
             <a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance">
               <v-btn fab small depressed color="white">
                 <v-img src="@/assets/chatBubbles.svg" :max-height="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '34px' : '24px'" :max-width="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '34px' : '24px'"></v-img>
               </v-btn>
             </a>
           </v-col>
           <v-col class="ma-0 px-2">
             <a href="https://documentation.abes.fr/sudoc/" target="_blank" title="Assistance">
               <v-btn fab :x-small="!(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)" :small="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)" :depressed="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)" color="white">
                 <v-img src="@/assets/questionMark.svg" :max-height="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '34px' : '24px'" :max-width="(!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm) ? '34px' : '24px'"></v-img>
               </v-btn>
             </a>
           </v-col>
         </v-row>
       </v-col>
      </v-row>
   </v-container>
</template>

<script setup>
import {onUpdated, ref, onMounted, watchEffect} from 'vue';
import router from '../../router/index'
import { useRoute } from 'vue-router'

const activeBtn = ref("btn1");
const routerPath = ref(router.currentRoute.path);
const route = useRoute();

watchEffect(() => {
  console.log(route.path)
  routerPath.value = route.path;
});

onUpdated(() => {
  currentRouteName();
})

onMounted(() => {
  currentRouteName();
})

function currentRouteName() {
  if (router.currentRoute.path != null && router.currentRoute.path === "/") {
    activeBtn.value = "btn1";
  } else if (router.currentRoute.path != null && router.currentRoute.path === "/resultats"){
    activeBtn.value = "btn1";
  } else if (router.currentRoute.path != null && router.currentRoute.path === "/regles"){
    activeBtn.value = "btn2";
  } else if (router.currentRoute.path != null && router.currentRoute.path === "/historique"){
    activeBtn.value = "btn3";
  }
}

</script>

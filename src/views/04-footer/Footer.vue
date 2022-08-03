<template>
   <v-footer padless app color="#0f75bc">
      <v-row align="center" style="background-color: #0f75bc; color: white; font-size: 1em">
         <v-col cols="auto" class="mr-auto" lg="8" style='text-align: start; padding-left: 2em; padding-right: 2em' v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.sm">
            <span>
               Description de à quoi sert l'application. "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </span>
         </v-col>
         <v-col md="auto" style='text-align: start; padding-left: 2em'>
            <div><a href="https://documentation.abes.fr/sudoc/" style="color: white">Sudoc</a></div>
            <div><a href="https://documentation.abes.fr/aideperiscope/" style="color: white">Documentation</a></div>
            <div><a href="https://stp.abes.fr/node/3?origine=sudocpro" style="color: white">ABESstp</a></div>
         </v-col>
         <v-col cols="auto" style="padding-right: 2em; padding-left: 2em">
            <span style='padding-right: 1em'><a href="https://abes.fr/"><img src="@/assets/abes.png" alt="logo abes"/></a></span>
            <span><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/MESRI_logo.svg" alt="logo mesri"/></a></span>
         </v-col>
      </v-row>
      <v-row align='center' style="background-color: #2c2968; color: white; font-size: 1em">
         <v-col cols="auto" class="mr-auto" style='text-align: start; padding-left: 2em'>
            <span>Application, servant à cela — {{ new Date().getFullYear() }} </span>
         </v-col>
         <v-col cols="auto" style='text-align: start; padding-left: 2em; padding-right: 2em'>
            <span>
               <!--<a href="" style="color: white">Données personnelles</a> |-->
               <a href="https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html" style="color: white">C.G.U.</a>
               |
               <a href="https://abes.fr/pages-mentions-legales/periscope.sudoc.html" style="color: white">Mentions légales</a>
               |
               <a href="https://abes.fr/pages-accessibilite/periscope.html" style="color: white">Accessibilité</a>
               <!--<a href="https://status-all.abes.fr/" style="color: white">Disponibilité actuelle de l'application</a> |-->
            </span>
         </v-col>
      </v-row>
   </v-footer>
</template>

<script>

export default {
}
</script>

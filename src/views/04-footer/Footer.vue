<template>
   <v-footer absolute padless height="200" color="#e6e6e6">
      <v-row class="footerTopRow" align="center" justify="start" no-gutters>
        <v-col cols="auto" lg="8" id="footerDescription" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <span>
              <b>Qualimarc</b><br> Description complète de l'utilité de l'application. "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            </span>
        </v-col>
         <v-col id="footerAbesLinks">
           <v-icon>mdi-open-in-new</v-icon>
            <div><a href="https://documentation.abes.fr/aideperiscope/" id="linkBlack">Documentation</a></div>
            <div><a href="https://stp.abes.fr/node/3?origine=sudocpro" id="linkBlack">Assistance</a></div>
         </v-col>
         <v-col id="footerLogo">
            <span><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/MESRLogo.svg" width="128px" alt="logo mesri"/></a></span>
            <span style='padding-right: 1em'><a href="https://abes.fr/"><img src="@/assets/abesLogo130.svg" width="100px" alt="logo abes"/></a></span>
         </v-col>
      </v-row>
      <v-row class="footerBottomRow">
         <v-col cols="auto" class="mr-auto">
            <span>Application, servant à cela — {{ new Date().getFullYear() }} </span>
         </v-col>
         <v-col cols="auto">
            <span>
               <!--<a href="" style="color: white">Données personnelles</a> |-->
               <a href="https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html" id="linkWhite">C.G.U.</a>
               |
               <a href="https://abes.fr/mentions-legales/" id="linkWhite">Mentions légales</a>
               |
               <a href="https://abes.fr/accessibilite/" id="linkWhite">Accessibilité</a>
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

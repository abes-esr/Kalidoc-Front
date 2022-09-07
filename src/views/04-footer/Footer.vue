<template>
   <v-footer absolute padless min-height="200" color="#e6e6e6" fluid>

<!--     FOOTER GRIS-->
      <v-row class="footerTopRow" align="start" justify="start" no-gutters>
<!--        DESCRIPTION NAVIGATEUR-->
        <v-col cols="6" id="footerDescription" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
          <div style="font-size: 1em; font-weight: 700">Qualimarc</div>
          <div style="font-size: 0.8em; text-align: justify">Description complète de l'utilité de l'application. "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris."
          </div>
        </v-col>
<!--        ACCES DIRECT NAVIGATEUR-->
        <v-col cols="auto" id="footerAbesLinks" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
          <v-row class="ma-0 pa-0">
            <v-icon color="#252C61">mdi-open-in-new</v-icon>
            <span class="fontPrimaryColor" style="font-size: 1em; font-weight: 700; margin-left: 5px">Accès direct</span>
          </v-row>
         <v-container>
           <span class="pa-0 ma-0" style="font-size: 0.8em;">
             <v-icon color="#cf491b" small>mdi-chevron-right</v-icon>
             <a href="https://documentation.abes.fr/sudoc/" id="linkBlue">Documentation</a>
           </span><br>
           <span class="pa-0 ma-0" style="font-size: 0.8em;">
             <v-icon color="#cf491b" small>mdi-chevron-right</v-icon>
             <a href="https://stp.abes.fr/node/3?origine=sudocpro" id="linkBlue">Assistance</a>
           </span>
         </v-container>
        </v-col>
<!--        ACCES DIRECT MOBILE && TABLETTE-->
        <v-col cols="auto" class="pl-4 pt-2" id="footerAbesLinks" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
          <v-row class="ma-0">
            <v-icon color="#252C61">mdi-open-in-new</v-icon>
            <span style="color: #252C61; font-size: 1em; font-weight: 500; margin-left: 2px">Accès direct</span>
          </v-row>
          <v-container class="pa-0 pl-2">
           <span style="font-size: 0.8em;">
             <v-icon color="#cf491b" small>mdi-chevron-right</v-icon>
             <a href="https://documentation.abes.fr/sudoc/" id="linkBlue">Documentation</a>
           </span><br>
            <span style="font-size: 0.8em;">
             <v-icon color="#cf491b" small>mdi-chevron-right</v-icon>
             <a href="https://stp.abes.fr/node/3?origine=sudocpro" id="linkBlue">Assistance</a>
           </span>
          </v-container>
        </v-col>
<!--        LOGOS NAVIGATEUR-->
        <v-col cols="auto" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
          <span><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/MESRLogo.svg" height="108px" alt="logo Ministère de l'Enseignement supérieur et de la recherche"/></a></span>
          <span style='padding-right: 1em'><a href="https://abes.fr/"><img src="@/assets/abesLogo130.svg" height="100px" alt="logo Abes"/></a></span>
        </v-col>
<!--        LOGOS MOBILE && TABLETTE-->
        <v-col cols="auto" align-self="end" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
          <span><a href="https://www.enseignementsup-recherche.gouv.fr/fr"><img src="@/assets/MESRLogo.svg" height="74px" alt="logo Ministère de l'Enseignement supérieur et de la recherche"/></a></span>
          <span style='padding-right: 1em'><a href="https://abes.fr/"><img src="@/assets/abesLogo130.svg" height="70px" alt="logo Abes"/></a></span>
        </v-col>
      </v-row>

<!--     FOOTER NOIR-->
      <v-row class="footerBottomRow">
         <v-col cols="6" class="mr-auto">
            <span>QUALIMARC — {{ new Date().getFullYear() }} </span>
         </v-col>
         <v-col cols="auto">
           <a href="" id="linkWhite">Données personnelles</a> |
           <a href="https://abes.fr/pages-cgu/conditions-generales-utilisation-sites-abes.html" id="linkWhite">C.G.U.</a> |
           <a href="https://abes.fr/mentions-legales/" id="linkWhite">Mentions légales</a> |
           <a href="https://abes.fr/accessibilite/" id="linkWhite">Accessibilité</a>
         </v-col>
      </v-row>

   </v-footer>
</template>

<script>
export default {
}
</script>

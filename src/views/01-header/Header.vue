<template>
   <v-container absolute padless style="min-height:120px" class="pa-0 titleBar" fluid>

<!--     <v-row-->
<!--         class="mb-6"-->
<!--         justify="center"-->
<!--         no-gutters-->
<!--     >-->
<!--       <v-col lg="2">-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           1 of 3-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--       <v-col md="auto">-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           Variable width content-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--       <v-col lg="2">-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           3 of 3-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--     </v-row>-->
<!--     <v-row no-gutters>-->
<!--       <v-col>-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           1 of 3-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--       <v-col md="auto">-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           Variable width content-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--       <v-col lg="2">-->
<!--         <v-card-->
<!--             class="pa-2"-->
<!--             outlined-->
<!--             tile-->
<!--         >-->
<!--           3 of 3-->
<!--         </v-card>-->
<!--       </v-col>-->
<!--     </v-row>-->

<!--     <v-row class="titleBarRow" align="center" justify="start" no-gutters>-->
<!--       <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">-->
<!--         <a><img src="@/assets/logo200.png" class="titleBarLogo" @click="$router.push({path: '/'})" style="max-width: 100%; max-height: 100%" alt="logo Qualimarc" /></a>-->
<!--       </v-col>-->
<!--       &lt;!&ndash;        <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">&ndash;&gt;-->
<!--       &lt;!&ndash;          <a><img src="@/assets/logo200.png" class="titleBarLogo" @click="$router.push({path: '/'})" style="max-width: 50%; max-height: 50%" alt="logo Qualimarc" /></a>&ndash;&gt;-->
<!--       &lt;!&ndash;        </v-col>&ndash;&gt;-->
<!--       <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">-->
<!--         <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>-->
<!--         <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des règles</v-btn>-->
<!--         <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>-->
<!--       </v-col>-->
<!--       <v-row  no-gutters cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">-->
<!--         <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>-->
<!--         <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des Règles</v-btn>-->
<!--         <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>-->
<!--       </v-row>-->
<!--       <v-row  no-gutters cols="auto" class="mr-auto">-->
<!--         <v-col md="auto"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance"><v-icon color="white" large>mdi-chat-outline</v-icon></a></v-col>-->
<!--         <v-col md="auto" id="titleBarCols"><a href="https://documentation.abes.fr/aideperiscope/" target="_blank" title="Assistance"><v-icon color="white" large>mdi-help</v-icon></a></v-col>-->
<!--       </v-row>-->
<!--     </v-row>-->

      <v-row class="titleBarRow" align="center" justify="start" no-gutters>
         <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
            <a><img src="@/assets/logo200.png" class="titleBarLogo" @click="$router.push({path: '/'})" style="max-width: 100%; max-height: 100%" alt="logo Qualimarc" /></a>
         </v-col>
<!--        <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">-->
<!--          <a><img src="@/assets/logo200.png" class="titleBarLogo" @click="$router.push({path: '/'})" style="max-width: 50%; max-height: 50%" alt="logo Qualimarc" /></a>-->
<!--        </v-col>-->
        <v-col cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
          <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>
          <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des règles</v-btn>
          <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>
        </v-col>
        <v-row  no-gutters cols="auto" class="mr-auto" id="titleBarCols" v-if="!$vuetify.breakpoint.md && !$vuetify.breakpoint.lg && !$vuetify.breakpoint.xl">
          <v-btn text tile color="white" value="interfaceVerification" class="titleBarButtonSelected" @click="" v-if="">Interface de vérification</v-btn>
          <v-btn text tile color="white" value="interfaceRegles" class="titleBarButtonInactive" @click="" v-if="">Interface des Règles</v-btn>
          <v-btn text tile color="white" value="historique" class="titleBarButtonInactive" @click="" v-if="">Historique</v-btn>
        </v-row>
        <v-row  no-gutters cols="auto" class="mr-auto">
          <v-col md="auto"><a href="https://stp.abes.fr/node/3?origine=sudocpro" target="_blank" title="Assistance"><v-icon color="white" large>mdi-chat-outline</v-icon></a></v-col>
          <v-col md="auto" id="titleBarCols"><a href="https://documentation.abes.fr/aideperiscope/" target="_blank" title="Assistance"><v-icon color="white" large>mdi-help</v-icon></a></v-col>
        </v-row>
      </v-row>
   </v-container>
</template>

<script setup>
import { ref } from 'vue';

let isSelected = ref("");

function setSelectedButton(){

}
</script>

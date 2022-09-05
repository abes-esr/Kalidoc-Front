<template>
  <v-container fluid>
    <v-row>
      <v-col><bloc-rappel-type-analyse></bloc-rappel-type-analyse></v-col>
    </v-row>
    <v-row>
      <v-col><v-card class="secondary" height="200%"></v-card></v-col>
      <v-col>
        <v-card height="100%" class="primary"></v-card>
        <bloc-recapitulatif height="100%"></bloc-recapitulatif>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import BlocRappelTypeAnalyse from "@/components/04-resultats-bloc-rappel-type-analyse/BlocRappelTypeAnalyse";
import BlocRecapitulatif from "@/components/03-resultats-bloc-recapitulatif/BlocRecapitulatif";
export default {
  name: 'resultat',
  components: {
    BlocRecapitulatif,
    BlocRappelTypeAnalyse
  }
}
</script>
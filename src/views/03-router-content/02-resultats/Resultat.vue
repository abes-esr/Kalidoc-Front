<template>
  <v-container>
    <bloc-rappel-type-analyse></bloc-rappel-type-analyse>
    <bloc-recapitulatif></bloc-recapitulatif>
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
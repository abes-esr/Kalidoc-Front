<template>
  <v-container>
    <bloc-rappel-type-analyse></bloc-rappel-type-analyse>
  </v-container>
</template>
<script>

import BlocRappelTypeAnalyse from "@/components/04-resultats-bloc-rappel-type-analyse/BlocRappelTypeAnalyse";
export default {
  name: 'resultat',
  components: {
    BlocRappelTypeAnalyse
  }
}
</script>
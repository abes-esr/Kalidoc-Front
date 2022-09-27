<template>
  <v-card>
    <v-card-title>Détail des erreurs par PPN</v-card-title>
    <span v-if="props.currentPpn !== ''">PPN : {{ props.currentPpn }}</span>
    <span v-else>Veuillez sélectionner un PPN dans le tableau de résumé</span>
  </v-card>
</template>

<script setup>
  const props = defineProps({currentPpn: String});

</script>

<style scoped>

</style>
<template>
  <v-alert v-if="backendErrorMessage !== null" border="left" colored-border type="error" elevation="0">
    {{ backendErrorMessage.response.data.debugMessage }} (erreur {{backendErrorMessage.response.status}})
  </v-alert>
</template>

<script setup>

const props = defineProps({backendErrorMessage: Object});

</script>

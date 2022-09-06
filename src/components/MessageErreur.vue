<template>
  <v-alert v-if="backendErrorMessage !== null" border="left" colored-border type="error" elevation="0">
  {{ backendErrorMessage.message }}
  </v-alert>
</template>

<script setup>

const props = defineProps({backendErrorMessage: Object});

</script>

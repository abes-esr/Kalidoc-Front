<template>
  <v-alert v-if="backendErrorMessage !== null " border="left" colored-border type="error" elevation="2">
    {{ backendErrorMessage.response.data.message }} (erreur : {{backendErrorMessage.response.status}})
    {{ message }}
  </v-alert>
  <v-alert v-else-if="message !== null" border="left" colored-border type="error" elevation="2">
    {{ message }}
  </v-alert>
</template>

<script setup>

//todo: retravailler le composant pour qu'il puisse afficher un message d'erreur générique
const props = defineProps({backendErrorMessage: Object, message: String});

</script>

<template>
  <v-alert v-if="message !== null" border="left" colored-border type="error" elevation="2">
      {{ message }}
  </v-alert>
</template>

<script setup>

import {ref, watchEffect} from "vue";

const props = defineProps({
  backendErrorMessage: { type: undefined},
});
const message = ref(null);

watchEffect(() => {
  if (props.backendErrorMessage !== null) {
    const type = typeof (props.backendErrorMessage);
    if(type === 'string') {
      if (props.backendErrorMessage !== "") {
        message.value = props.backendErrorMessage;
      } else {
        message.value = null;
      }
    }
    if(type === 'object') {
      console.log(props.backendErrorMessage);
      message.value = props.backendErrorMessage.response.data.message + '(' + props.backendErrorMessage.response.status + ")";
    }
  }
});

</script>

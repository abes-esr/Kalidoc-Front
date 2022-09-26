<template>
  <v-container class="d-flex justify-center mt-0 mb-0 pt-0 pb-0">
    <v-btn @click="emitOnClick" depressed color="#CF4A1A" class="button" :disabled="props.isDisabled">
      <v-icon color="white" class="ml-2">mdi-cog-refresh</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
const props = defineProps({isDisabled: Boolean, ppnList: []});
const emit = defineEmits(['onClick']);

function generateWinibwRequest() {
  let request = 'che';
  props.ppnList.forEach((ppn, index) => {
    if (index == 0)
      request += ' ppn ' + ppn;
    else
      request += ' OU ppn ' + ppn;
  });
  return request;
}

function emitOnClick() {
  emit('onClick', generateWinibwRequest());
}
</script>

<style scoped>

</style>
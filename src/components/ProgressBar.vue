<template>
  <v-overlay
    v-model="loading"
    class="d-flex flex-column"
  >
    <v-sheet min-width="50em" style="background-color: white">
      <v-sheet class="d-flex justify-center" style="background-color: #252C61">
        <span class="text-h5">Analyse en cours</span>
      </v-sheet>
      <v-progress-linear
          :value="count"
          height="25"
          color="primary"
          rounded

          class="my-9"
      >
        Progression de l'analyse : {{count}}
      </v-progress-linear>
      <v-btn @click="stop">stop</v-btn>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import QualimarcService from "@/service/QualimarcService";

const props = defineProps({loading: Boolean});
const emit = defineEmits(['finished','stop']);

const serviceApi = QualimarcService;

const loadin = ref(true);
const count = ref('0%')

watchEffect(() => {
  console.log("props.loading", props.loading)
  if (props.loading !== false) {
    runProgress();
  }
})

function stop(){
  count.value = '0%';
  emit('stop', false);
}

function runProgress(){
  const interval = setInterval(() => {
    serviceApi.getStatus().then((response) => {
      count.value = response.data;
      console.log(count.value);
      if(props.loading === false){
        clearInterval(interval);
      }
      if(count.value === '100%') {
        clearInterval(interval)
        count.value = '0%';
        emit('finished')
      }
    });
  }, 500)
  return () => clearInterval(interval)
}
</script>

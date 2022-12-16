<template>
  <v-overlay
    v-model="isLoading"
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

const props = defineProps({isLoading: Boolean});
const emit = defineEmits(['finished','stop']);

const serviceApi = QualimarcService;

const count = ref('0%');

watchEffect(() => {
  console.log("props.isLoading", props.isLoading) //todo sup
  if (props.isLoading) {
    runProgress();
  }
})

function runProgress(){
  const interval = setInterval(() => {
    // cas de réussite
    if(count.value === '100%' && !props.isLoading) {
      clearInterval(interval)
      finish()
    }

    // cas ou l'analyse est stoppée
    if(!props.isLoading) {
      clearInterval(interval)
      stop();
    }

    //cas ou l'analyse n'est pas finie
    if(count.value !== '100%') {
      serviceApi.getStatus().then((response) => {
        count.value = response.data; // set la valeur de la barre de progression
        console.log(count.value);
      });
    }
  }, 500)
  return () => clearInterval(interval)
}

function stop(){
  count.value = '0%';
  emit('stop', true);
}

function finish(){
  count.value = '0%';
  emit('finished');
}
</script>

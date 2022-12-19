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
      <v-btn @click="cancel()">Annuler</v-btn>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import QualimarcService from "@/service/QualimarcService";

const props = defineProps({isLoading: Boolean});
const emit = defineEmits(['finished','cancel','error']);

const serviceApi = QualimarcService;

const count = ref('0%');
const isCanceled = ref(false);

watchEffect(() => {
  if (props.isLoading) {
    runProgress();
  }
})

/**
 * Permet de faire plusieurs appel au service pour simuler un chargement
 *
 */
function runProgress(){
  count.value = '0%';
  isCanceled.value = false;
  const interval = setInterval(() => {
    // cas de réussite
    if((count.value === '100%') && !props.isLoading ) {
      clearInterval(interval);
      finish();
    }

    // cas ou l'analyse est stoppée
    if( isCanceled.value ) {
      clearInterval(interval)
    }

    // cas ou le back arrive à envoyer un pourcentage au dessus de 100% (c'est déjà arrivé)
    if(count.value.replace('%', '') > 100) {
      console.log('erreur'); //TODO: afficher un message d'erreur
    }

    //cas ou l'analyse n'est pas finie
    if(count.value !== '100%') {
      serviceApi.getStatus().then((response) => {
        count.value = response.data; // set la valeur de la barre de progression
      });
    }
  }, 500)
  return () => clearInterval(interval)
}

function cancel(){
  isCanceled.value = true;
  serviceApi.cancel();
  emit('cancel', true);
}

function finish(){
  emit('finished');
}
</script>

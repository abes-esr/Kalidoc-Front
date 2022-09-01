<template>
  <div>
    <span>Type d'analyse choisi : {{ typeAnalyse.label }}</span>
  </div>
</template>

<script setup>
  import { useAnalyseStore } from "@/stores/analyse";
  import { ref } from 'vue';

  const analyseStore = useAnalyseStore();
  const typeAnalyse = ref(getTypeAnalyse())
  function getTypeAnalyse() {
    console.log(JSON.stringify(analyseStore));
    return analyseStore.getAnalyseSelected;
  }
</script>

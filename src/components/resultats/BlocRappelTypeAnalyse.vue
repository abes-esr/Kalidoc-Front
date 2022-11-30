<template>
  <span>Type d'analyse choisi : {{ analyseStore.getAnalyseSelected.label }}</span>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";

const analyseStore = useAnalyseStore();
</script>

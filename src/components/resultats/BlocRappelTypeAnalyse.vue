<template>
  <span>Type d'analyse choisi : {{ analyseStore.getAnalyseSelected.libelle}}</span>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";

const analyseStore = useAnalyseStore();
</script>

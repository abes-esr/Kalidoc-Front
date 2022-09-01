<template>
  <v-container>
    <bloc-type-analyse></bloc-type-analyse>
    <bloc-recherche-par-ppn></bloc-recherche-par-ppn>
    <bloc-recherche-par-fichier-ppn></bloc-recherche-par-fichier-ppn>
    <bloc-bouton-lancement-analyse></bloc-bouton-lancement-analyse>
  </v-container>
</template>

<script>
import BlocTypeAnalyse from "@/components/01-accueil-bloc-type-analyse/BlocTypeAnalyse";
import BlocRechercheParPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParPpn";
import BlocRechercheParFichierPpn from "@/components/02-accueil-bloc-recherche-par-ppn/BlocRechercheParFichierPpn";
import BlocBoutonLancementAnalyse from "@/components/03-accueil-bloc-bouton-recherche/BlocBoutonLancementAnalyse";
export default {
  name: "accueil",
  data () {
    return {
      isAnalyseSelected: "hi",
      analyseSelected: "hi"
    }
  },
  methods: {
    setIsAnalyseSelected(payload){
      this.isAnalyseSelected = payload;
    },
    setAnalyseSelected(payload){
      this.analyseSelected = payload;
    },

  },
  components: {
    BlocTypeAnalyse,
    BlocRechercheParPpn,
    BlocRechercheParFichierPpn,
    BlocBoutonLancementAnalyse
  }
};
</script>

<template>
  <v-container fluid>
    <div class="ma-0 pa-0 mb-2" style="color: #595959; font-size: 0.9em">
      <nav aria-label="fil d'Ariane" class="filAriane">
        <ul>
          <li>
            <span @click="$router.push({path: '/'})" class="v-slider__thumb">Accueil</span>
          </li>
          <li>
            <span @click="$router.push({path: '/'})" class="v-slider__thumb">Interface d'analyse</span>
          </li>
          <li>
            <div aria-current="page">Historique des analyses</div>
          </li>
        </ul>
      </nav>
    </div>
    <BlocHistorique></BlocHistorique>
  </v-container>
</template>

<script setup>
import router from "@/router";
import BlocHistorique from "@/components/historique/BlocHistorique.vue";

function goToHome() {
  router.push('/');
}
</script>

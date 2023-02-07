<template>
  <v-container fluid>
    <div class="ma-0 pa-0 mb-2" style="color: #595959; font-size: 0.9em">
      <nav aria-label="fil d'Ariane" class="filAriane">
        <ul>
          <li>
            <span @click="$router.push({path: '/'})" class="v-slider__thumb">Accueil</span>
          </li>
          <li>
            <span @click="$router.push({path: '/'})" class="v-slider__thumb">Interface de vérification</span>
          </li>
          <li>
            <div aria-current="page">Table générale des règles</div>
          </li>
        </ul>
      </nav>
    </div>
    <bloc-regles></bloc-regles>
  </v-container>
</template>

<script setup>
import BlocRegles from "@/components/regles/BlocRegles";
</script>

<style>

</style>

<template>
  <v-app>
    <Header></Header>
    <main style='padding-bottom: 220px'>
      <router-view />
      <CookieBanner />
    </main>
    <Footer></Footer>
  </v-app>
</template>

<script setup>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import CookieBanner from "@/components/CookieBanner";
</script>

<style>
@import './style/style.css';
</style>

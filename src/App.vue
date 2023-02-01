<template>
  <v-app>
    <Header></Header>
    <main style='padding-bottom: 220px'>
      <router-view />
    </main>
    <Footer></Footer>
  </v-app>
</template>

<script setup>
import Header from "@/views/01-header/Header";
import Footer from "@/views/04-footer/Footer";
</script>

<style>
@import './style/style.css';
</style>

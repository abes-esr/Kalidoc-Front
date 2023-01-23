<template>
  <v-app>
    <v-main>
      <Header></Header>
      <main>
        <router-view />
      </main>
      <div style='padding-bottom: 220px'></div>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "@/views/01-header/Header";
import Footer from "@/views/04-footer/Footer";
</script>

<style>
@import './style/style.css';
</style>

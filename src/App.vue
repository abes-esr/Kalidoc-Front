<template>
  <v-app>
    <v-main>
      <Header></Header>
      <router-view />
      <div style='padding-bottom: 220px'></div>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>

import Header from "@/views/01-header/Header";
import Footer from "@/views/04-footer/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>

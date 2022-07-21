<template>
  <v-app>
    <v-content>
      <Header></Header>
      <router-view />
      <div style='margin-top: 1em'></div>
      <Footer></Footer>
    </v-content>
  </v-app>
</template>

<script>
import Footer from "@/views/04-footer/Footer";
import Header from "@/views/01-header/Header";
export default {
  name: 'App',
  components: {
    Header,
    Footer
},
  data() {
    return {
    //
    };
  },
};
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <v-container fill-height class="justify-center">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

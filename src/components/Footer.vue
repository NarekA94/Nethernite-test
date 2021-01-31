<template>
  <v-footer  class="footer" padless w-100>
    <v-card
      flat
      tile
      width="100%"
      class="indigo lighten-1 white--text text-center "
    >
      <v-card-text>
        <v-btn v-for="(icon, index) in icons" :key="index" class="mx-4 white--text" icon>
          <a target="_blank" :href="icon.url">
            <v-icon color="white" size="24px">
              {{ icon.name }}
            </v-icon>
          </a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0"> Narek Avanesyan </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
      {
        name: "mdi-linkedin",
        url: "https://www.linkedin.com/in/narek-avanesyan-4480a3194/",
      },
      { name: "mdi-github-circle", url: "https://github.com/NarekA94" },
    ],
  }),
};
</script>


<style lang="scss" scoped>
.social {
  display: flex;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
a{
  text-decoration: none;
}
.footer{
  background-color: #115a61!important;
  .indigo{
     background-color: #115a61!important;
     border-color: #115a61!important
  }
}
</style>

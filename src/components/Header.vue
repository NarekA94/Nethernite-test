<template>
  <v-app-bar app class="header" dark>
    <v-row align="end" justify="end">
      <v-col cols="12" sm="4" class="pt-9">
        <v-text-field
          v-model="searchText"
          append-outer-icon="mdi-magnify"
          clear-icon="mdi-close-circle"
          clearable
          label="Search"
          type="text"
          outlined
          dense
          @click:append-outer="search"
          @click:clear="clearSearch"
          @keydown.enter="search"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    ...mapActions(["searchPackage", "clearData"]),
    search() {
      this.searchPackage(this.searchText, 1);
    },
    clearSearch() {
      this.searchText = "";
      this.clearData();
    },
  },
};
</script>

<style>
.header{
  background-color: #09717b!important;
}
</style>
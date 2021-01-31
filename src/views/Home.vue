<template>
  <div class="home">
    <section>
      <div
        v-for="(item, index) in packages"
        :key="index"
        class="item"
        @click="onItemClick(item)"
      >
        <v-row>
          <v-col sm="12" md="10">
            <h4>{{ item.package.name }}</h4>
            <div class="user-info">
              <h5
                style="margin-right: 10px"
                v-if="item.package.author && item.package.author.name"
              >
                {{ item.package.author.name }}
              </h5>
              <v-chip small class="ma-1" color="primary" label>
                <v-icon small left> mdi-tag-multiple </v-icon>
                {{ item.package.version }}
              </v-chip>
            </div>
            <p>{{ item.package.description }}</p>
          </v-col>
          <v-col md="2" sm="12">
            <div class="social">
              <a
                v-for="(icon, $index) in Object.keys(item.package.links)"
                :key="$index"
                :href="item.package.links[icon]"
                target="_blank"
              >
                <v-icon size="22px">
                  {{ socialMedia[icon] }}
                </v-icon>
              </a>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </section>
    <div v-if="totalItems > 10" class="text-center">
      <v-pagination
        v-model="options.page"
        :length="Math.ceil(totalItems / 10)"
        :total-visible="7"
      ></v-pagination>
    </div>

    <v-dialog v-model="packageDescriptionDialog" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ currentPackage.name }}
        </v-card-title>

        <div class="dialog-body">
          <div div style="width: 80%">
            <p style="margin-bottom: 0px">{{ currentPackage.description }}</p>
            <div class="user-info">
              <h5
                style="margin-right: 10px"
                v-if="currentPackage.author && currentPackage.author.name"
              >
                {{ currentPackage.author.name }}
              </h5>
              <v-chip v-if="!!currentPackage.author && currentPackage.author.email" small class="ma-1"  label>
                <v-icon small left> mdi-at </v-icon>
                {{ currentPackage.author.email }}
              </v-chip>
              <v-chip small class="ma-1" color="primary" label>
                <v-icon small left> mdi-tag-multiple </v-icon>
                {{ currentPackage.version }}
              </v-chip>
            </div>
            <div
              d-flex
              v-if="currentPackage.keywords && currentPackage.keywords.length"
            >
              <v-chip
                small
                v-for="(keyword, index) in currentPackage.keywords"
                :key="index"
                class="ma-2"
                label
              >
                {{ keyword }}
              </v-chip>
            </div>
          </div>
          <div style="width: 20%">
            <div v-if="!!currentPackage.links" class="social">
              <a
                v-for="(icon, $index) in Object.keys(currentPackage.links)"
                :key="$index"
                :href="currentPackage.links[icon]"
                target="_blank"
              >
                <v-icon size="22px">
                  {{ socialMedia[icon] }}
                </v-icon>
              </a>
            </div>
          </div>
        </div>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      options: {
        page: 1,
      },
      packageDescriptionDialog: false,
      currentPackage: {},
      socialMedia: {
        npm: "mdi-npm",
        repository: "mdi-github-circle",
        homepage: "mdi-earth",
      },
      page: 1,
    };
  },
  watch: {
    options: {
      handler(data) {
        this.paginate(data.page);
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["packages", "limit", "totalItems", "loading"]),
  },
  methods: {
    ...mapActions(["paginate"]),
    onItemClick(item) {
      this.currentPackage = item.package;
      this.packageDescriptionDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  .info-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .author-info {
    display: flex;
    margin: 5px 0;
    margin-right: 10px;
    border-bottom: 1px solid #c5c5c5;
    h4 {
      margin-right: 10px;
    }
    p {
      margin: 0;
    }
    a {
      word-break: break-all;
    }
  }
}
.item {
  padding: 25px 10px;
}
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin: auto;
  padding-top: 60px;
}
.user-info {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
.social {
  display: flex;
  justify-content: space-evenly;
  padding-top: 15px;
  a {
    text-decoration: none;
  }
}
.dialog-body {
  padding: 15px;
  display: flex;
  .social {
    padding: 0;
  }
}
</style>
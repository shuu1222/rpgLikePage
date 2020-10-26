<template>
  <v-app>
    <v-main class="base-app">
      <app-main-panel />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import appMainPanel from "./components/HelloWorld.vue";

export default Vue.extend({
  name: "App",

  components: {
    appMainPanel
  },

  data: () => ({
    //
  })
});
</script>

<style lang="scss" scoped>
.base-app {
  background-color: #474751;
}
</style>

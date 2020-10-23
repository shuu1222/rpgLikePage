<template>
  <v-app>
    <v-main>
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

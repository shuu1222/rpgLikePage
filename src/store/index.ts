import Vue from "vue";
import Vuex from "vuex";
import { RpgLikeWebRootState } from "./types";
import { items } from "./modules/index";

Vue.use(Vuex);
export default new Vuex.Store<RpgLikeWebRootState>({
  modules: {
    items
  }
});

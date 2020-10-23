import { ActionContext, Module } from "vuex";
import { RpgLikeWebRootState } from "../types";
import { cloneDeep } from "lodash";

export interface itemData {
  name: string;
  id: string;
}
export interface RpgItemRequest {
  itemList: itemData[];
}
export interface RpgItemStoreState {
  items: Array<{ name: string; id: string }>;
}
export const itemInitialStoreState: RpgItemStoreState = {
  items: [{ name: "", id: "" }],
};

export const items: Module<RpgItemStoreState, RpgLikeWebRootState> = {
  namespaced: true,
  state: cloneDeep(itemInitialStoreState),
  getters: {},
  mutations: {
    clear(state: RpgItemStoreState): void {
      Object.assign(state, cloneDeep(itemInitialStoreState));
    },
    storeItemList(state: RpgItemStoreState, payload: RpgItemRequest): void {
      state.items = payload.itemList;
    },
  },
  actions: {
    async registerItemlist(
      context: ActionContext<RpgItemStoreState, RpgLikeWebRootState>,
      request: RpgItemRequest
    ): Promise<void> {
      context.commit("storeItemList", request);
    },
    //
  },
};

import { ActionContext, Module } from "vuex";
import { RpgLikeWebRootState } from "../types";
import { cloneDeep } from "lodash";

export interface ItemData {
  name: string;
  id: string;
  count: number;
}
export interface RpgItemRequest {
  itemList: ItemData[];
}
export interface RpgItemStoreState {
  items: Array<{ name: string; id: string; count: number }>;
}
export const itemInitialStoreState: RpgItemStoreState = {
  items: [{ name: "", id: "", count: 0 }]
};

export const items: Module<RpgItemStoreState, RpgLikeWebRootState> = {
  namespaced: true,
  state: cloneDeep(itemInitialStoreState),
  getters: {
    getItemList: (
      state: RpgItemStoreState
    ): Array<{ name: string; id: string; count: number }> => {
      return state.items;
    }
  },
  mutations: {
    clear(state: RpgItemStoreState): void {
      Object.assign(state, cloneDeep(itemInitialStoreState));
    },
    storeItemList(
      state: RpgItemStoreState,
      payload: Array<{ name: string; id: string; count: number }>
    ): void {
      state.items = payload;
      console.log(state.items);
    }
  },
  actions: {
    async registerItemlist(
      context: ActionContext<RpgItemStoreState, RpgLikeWebRootState>,
      request: RpgItemRequest
    ): Promise<void> {
      context.commit("storeItemList", request);
    }
  }
};

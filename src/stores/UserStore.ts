import { useStorage } from "@vueuse/core";
import { merge } from "lodash";
import { defineStore } from "pinia";
import {
  FlashCardData,
  RealityCheckCardData,
  RewriteCardData,
} from "../types/types";

interface State {
  flashCardData: FlashCardData[];
  rewriteCardData: RewriteCardData[];
  realityCheckCardData: RealityCheckCardData[];
}

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    flashCardData: useStorage<FlashCardData[]>(
      "bolt-flash-card-data",
      [],
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    rewriteCardData: useStorage<RewriteCardData[]>(
      "bolt-rewrite-card-data",
      [],
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    realityCheckCardData: useStorage<RealityCheckCardData[]>(
      "bolt-reality-check-data",
      [],
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
  }),
  getters: {
    getAllCards: (
      state: State
    ): Array<FlashCardData | RewriteCardData | RealityCheckCardData> => {
      const dataArray: Array<
        FlashCardData | RewriteCardData | RealityCheckCardData
      > = [];
      dataArray.concat(
        state.flashCardData,
        state.rewriteCardData,
        state.rewriteCardData
      );
      return dataArray;
    },
  },
  actions: {
    clearAllData() {
      this.realityCheckCardData = [];
      this.flashCardData = [];
      this.rewriteCardData = [];
    },
  },
});

import { useStorage } from "@vueuse/core";
import { merge } from "lodash";
import { defineStore } from "pinia";
import {
  BoltUserPrefs,
  FlashCardData,
  FlashCardTestProgressData,
  LengthOption,
  PreexistingKnowledge,
  RealityCheckCardData,
  RewriteCardData,
  WritingStyle,
} from "../types/types";

interface State {
  flashCardData: FlashCardData[];
  rewriteCardData: RewriteCardData[];
  realityCheckCardData: RealityCheckCardData[];
  selectedWritingStyle: WritingStyle;
  selectedLengthOption: LengthOption;
  preexistingKnowledge: PreexistingKnowledge;
}

const defaultFlashCardTestProgressData: FlashCardTestProgressData = {
  flashCardGroupIndex: 0,
  currentFlashCardIndex: 0,
  flashCardProgress: [],
};

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
    selectedWritingStyle: useStorage<WritingStyle>(
      "bolt-selected-writing-style",
      { text: "" } as WritingStyle,
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    selectedLengthOption: useStorage<LengthOption>(
      "bolt-selected-length-option",
      { text: "Same" } as LengthOption,
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    preexistingKnowledge: useStorage<PreexistingKnowledge>(
      "bolt-preexisting-knowledge",
      { text: "" } as PreexistingKnowledge,
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    userPrefs: useStorage<BoltUserPrefs>(
      "bolt-user-prefs",
      { password: "" },
      localStorage,
      {
        mergeDefaults: (storageValue, defaults) =>
          merge(defaults, storageValue),
      }
    ),
    flashCardTestProgress: useStorage<FlashCardTestProgressData>(
      "bolt-flash-card-test-progress",
      defaultFlashCardTestProgressData,
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
      > = [].concat(
        state.flashCardData,
        state.rewriteCardData,
        state.realityCheckCardData
      );
      return dataArray;
    },
  },
  actions: {
    clearAllData() {
      this.realityCheckCardData = [];
      this.flashCardData = [];
      this.rewriteCardData = [];
      this.userPrefs = { password: "" };
      this.flashCardTestProgress = defaultFlashCardTestProgressData;
    },
    clearFlashCardProgress() {
      console.log(this.flashCardTestProgress);
      this.flashCardTestProgress = {
        flashCardGroupIndex: 0,
        currentFlashCardIndex: 0,
        flashCardProgress: [],
      };
      console.log(this.flashCardTestProgress);
    },
  },
});

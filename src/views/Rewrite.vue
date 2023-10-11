<template>
  <div>
    <div class="d-flex align-items-center flex-column">
      <div
        class="d-flex common-links justify-content-center align-items-center w-100 mb-2"
      >
        <RewriteContentButton />
      </div>
      <div class="d-flex justify-content-center align-items-center w-100 mb-2">
        <select class="form-select me-1" v-model="selectedWritingStyle">
          <option v-for="item in writingStyle">{{ item.text }}</option>
        </select>
        <select class="form-select me-1" v-model="selectedLengthOption">
          <option v-for="item in lengthOption">{{ item.text }}</option>
        </select>
        <input
          class="form-control me-1"
          type="text"
          v-model="preexistingKnowledge"
          placeholder="Existing experience"
        />
      </div>
    </div>
    <h2 class="pb-1 fs-6 fw-bold">Recent</h2>
    <div class="card-wrapper flex-wrap">
      <rewrite-card
        class="card-sizing"
        v-for="item in userStoreRef.rewriteCardData.value"
        :card-data="item"
      ></rewrite-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import RewriteCard from "../components/RewriteCard.vue";
import RewriteContentButton from "../components/RewriteContentButton.vue";
import { useUserStore } from "../stores/UserStore";
import { LengthOption, WritingStyle } from "../types/types";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

const writingStyle: WritingStyle[] = [
  { text: "College" },
  { text: "High School" },
  { text: "Elementary" },
  { text: "Casual and fun" },
  { text: "Simplest" },
];
const lengthOption: LengthOption[] = [
  { text: "Same" },
  { text: "Shorter" },
  { text: "Shortest" },
];

const selectedWritingStyle = ref<string>("");
const selectedLengthOption = ref<string>("");
const preexistingKnowledge = ref<string>("");

watch(selectedWritingStyle, (newWritingStyle) => {
  const newStyle: WritingStyle = { text: newWritingStyle };
  console.log("Writing Style changed to " + newWritingStyle);
  userStore.selectedWritingStyle = newStyle;
});

watch(selectedLengthOption, (newLengthOption) => {
  const newOption: LengthOption = { text: newLengthOption };
  console.log("Length Option changed to " + newLengthOption);
  userStore.selectedLengthOption = newOption;
});

watch(preexistingKnowledge, (newPreexistingKnowledge) => {
  const newKnowledge = { text: newPreexistingKnowledge };
  console.log("Preexisting Knowledge changed to " + newPreexistingKnowledge);
  userStore.preexistingKnowledge = newKnowledge;
});

onMounted(() => {
  selectedWritingStyle.value = userStore.selectedWritingStyle.text;
  selectedLengthOption.value = userStore.selectedLengthOption.text;
  preexistingKnowledge.value = userStore.preexistingKnowledge.text;
});
</script>

<style scoped>
.card-wrapper {
  --cols: 2;
  --gap: 15px;
  display: flex;
  gap: var(--gap);
}
.card-sizing {
  flex-basis: calc(
    100% / var(--cols) - var(--gap) / var(--cols) * (var(--cols) - 1)
  );
}
</style>

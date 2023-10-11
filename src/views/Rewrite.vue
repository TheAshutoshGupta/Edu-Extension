<template>
  <div>
    <div class="d-flex">
      <RewriteContentButton />
      <select>
        <option v-for="item in writingStyle">{{ item.text }}</option>
      </select>
      <select>
        <option v-for="item in lengthOption">{{ item.text }}</option>
      </select>
      <input type="text" v-model="preexistingKnowledge" />
    </div>
    <p>Recent</p>
    <div>
      <history-cards
        :card-data="userStoreRef.rewriteCardData.value"
      ></history-cards>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import HistoryCards from "../components/HistoryCards.vue";
import RewriteContentButton from "../components/RewriteContentButton.vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

interface WritingStyle {
  text: string;
}
interface LengthOption {
  text: string;
}

const writingStyle: WritingStyle[] = [{ text: "hello" }];
const lengthOption: LengthOption[] = [{ text: "Same" }];
const preexistingKnowledge = ref<string>("");
</script>

<style scoped></style>

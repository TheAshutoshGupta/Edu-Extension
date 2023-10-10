<template>
  <div>
    <div>
      <p class="pb-1 fs-6">Common Links</p>
      <router-link to="/">Go to Home</router-link>
    </div>

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
      <div v-for="item in pastReWriteItems">
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RewriteContentButton from "../components/RewriteContentButton.vue";

interface WritingStyle {
  text: string;
}
interface LengthOption {
  text: string;
}

interface ReWriteItem {
  text: string;
}

const writingStyle: WritingStyle[] = [{ text: "hello" }];
const lengthOption: LengthOption[] = [{ text: "Same" }];
const preexistingKnowledge = ref<string>("");

const pastReWriteItems = ref<ReWriteItem[]>([{ text: "This was re-written" }]);
</script>

<style scoped></style>

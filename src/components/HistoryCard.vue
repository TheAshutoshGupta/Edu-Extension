<template>
  <div class="d-flex flex-wrap card-wrapper">
    <div
      v-for="item in responseHistory"
      class="bg-light rounded-2 card-sizing p-3 position-relative"
    >
      <font-awesome-icon
        class="position-absolute rounded-pill bg-dark text-white p-2 card-icon"
        :icon="faPencilAlt"
      />
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import {
  BaseBoltData,
  FlashCardData,
  RealityCheckCardData,
  RewriteCardData,
} from "../types/types.ts";

const responseHistory = ref<
  BaseBoltData[] | RealityCheckCardData[] | RewriteCardData[] | FlashCardData[]
>([
  {
    text: "Configure the active CSS class applied when the link is active. Note the default value can also be configured globally via the linkActiveClass router constructor option.",
    url: "https://google.com",
    icon: "test",
    title: "yeah man",
  },
]);
</script>

<style scoped>
.card-wrapper {
  gap: 1rem;
}
.card-sizing {
  flex-basis: calc(50% - 1rem);
}
.card-icon {
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
}
</style>

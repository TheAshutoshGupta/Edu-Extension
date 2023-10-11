<template>
  <div class="d-flex flex-wrap card-wrapper">
    <div
      v-for="item in props.cardData"
      class="bg-light rounded-3 card-sizing p-3 position-relative"
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
import {
  BaseBoltData,
  FlashCardData,
  RealityCheckCardData,
  RewriteCardData,
} from "../types/types.ts";

type PropTypes = {
  cardData:
    | FlashCardData[]
    | BaseBoltData[]
    | RealityCheckCardData[]
    | RewriteCardData[];
};

const props = defineProps<PropTypes>();
</script>

<style scoped>
.card-wrapper {
  --cols: 2;
  --gap: 30px;
  display: flex;
  gap: var(--gap);
}
.card-sizing {
  flex-basis: calc(
    100% / var(--cols) - var(--gap) / var(--cols) * (var(--cols) - 1)
  );
}
.card-icon {
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
}
</style>

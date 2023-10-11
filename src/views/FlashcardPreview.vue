<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="flex-grow-1">
        <p class="mb-1">Note Cards</p>
        <p class="mb-1 fw-bold">
          {{ userStoreRef.flashCardData.value[props.id].title }}
        </p>
      </div>
      <div>
        <button
          class="btn btn-dark btn-sm mb-2 rounded-pill"
          @click="
            $router.push({
              path: `/flash-card-test/${props.id}`,
            })
          "
        >
          Test Me
        </button>
      </div>
    </div>

    <div class="d-flex flex-wrap card-wrapper">
      <div
        v-for="item in userStoreRef.flashCardData.value[props.id].flashCards"
        class="bg-light rounded-3 card-sizing p-3 position-relative card-sizing"
      >
        <p class="fw-bold">{{ item.term }}</p>
        <hr />
        <p>{{ item.definition }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlashCardData } from "../types/types";

import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

type PropTypes = {
  id: number;
  cardData?: FlashCardData;
};

const props = defineProps<PropTypes>();
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

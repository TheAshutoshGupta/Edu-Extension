<template>
  <div>
    <p>Note Cards</p>
    <p>{{ userStoreRef.flashCardData.value[props.id].title }}</p>
    <button
      class="btn btn-dark btn-small"
      @click="
        $router.push({
          path: `/flash-card-test/${props.id}`,
        })
      "
    >
      Test Me
    </button>
    <div class="container-fluid d-flex flex-wrap">
      <div
        v-for="item in userStoreRef.flashCardData.value[props.id].flashCards"
        class="bg-light rounded-2 card-sizing p-3 position-relative"
      >
        <p>{{ item.term }}</p>
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

<style scoped></style>

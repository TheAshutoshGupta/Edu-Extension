<template>
  <div class="d-flex flex-wrap">
    <div class="w-100 bg-light rounded-3 p-3 position-relative">
      <font-awesome-icon
        class="position-absolute rounded-pill bg-dark text-white p-2 card-icon"
        :icon="faBook"
      />
      <p class="fw-bold">{{ props.cardData.title }}</p>
      <p>{{ props.cardData.flashCards.length }} Cards</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted } from "vue";
import { FlashCardData } from "../types/types.ts";

type PropTypes = {
  cardData: FlashCardData;
};

const props = defineProps<PropTypes>();

onMounted(() => {
  console.log(props.cardData);
});
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

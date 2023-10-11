<template>
  <div class="d-flex flex-wrap card-wrapper">
    <div class="bg-light rounded-2 card-sizing p-3 position-relative">
      <font-awesome-icon
        class="position-absolute rounded-pill bg-dark text-white p-2 card-icon"
        :icon="faPencilAlt"
      />
      <p>{{ props.cardData.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted } from "vue";
import { RewriteCardData } from "../types/types.ts";

type PropTypes = {
  cardData: RewriteCardData;
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

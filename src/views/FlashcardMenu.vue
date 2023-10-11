<template>
  <div class="w-100">
    <div class="d-flex common-links mb-2">
      <NotecardButton></NotecardButton>
    </div>
    <div>
      <p class="mb-2">Recent</p>
      <div class="card-wrapper">
        <flash-card
          class="card-sizing"
          @click="
            $router.push({
              path: `/flash-card-preview/${index}`,
            })
          "
          v-for="(item, index) in userStoreRef.flashCardData.value"
          :card-data="item"
        ></flash-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import FlashCard from "../components/FlashCard.vue";
import NotecardButton from "../components/NotecardButton.vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);
</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
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

.card-sizing:hover {
  cursor: pointer;
}
</style>

<template>
  <div class="w-100">
    <p class="mb-1 fs-6">Reality Checker!!</p>
    <div class="d-flex common-links">
      <RealityCheckButton></RealityCheckButton>
    </div>
    <div>
      <h2 class="pb-1 fs-6 fw-bold">Recent</h2>
      <div class="card-wrapper">
        <reality-check-card
          class="card-sizing"
          v-for="item in userStoreRef.realityCheckCardData.value"
          :card-data="item"
        ></reality-check-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import RealityCheckButton from "../components/RealityCheckButton.vue";
import RealityCheckCard from "../components/RealityCheckCard.vue";
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
</style>

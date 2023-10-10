<template>
  <div class="w-100">
    <hr />
    <p class="mb-1 fs-6">Common Links</p>
    <div class="d-flex common-links">
      <router-link
        to="/rewrite"
        class="btn btn-dark btn-sm rounded-pill px-2 py-1"
        >Rewriter</router-link
      >
      <router-link
        to="/critical-thinking"
        class="btn btn-dark btn-sm rounded-pill px-3 py-1"
        >Critical Thinker</router-link
      >
    </div>
    <div>
      <h2 class="pb-1 fs-6">Quick Actions</h2>
      <history-cards
        :card-data="userStoreRef.getAllCards.value"
      ></history-cards>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import HistoryCards from "../components/HistoryCards.vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);
</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
</style>

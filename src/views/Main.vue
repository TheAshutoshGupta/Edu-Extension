<template>
  <div class="w-100 h-100">
    <p class="mb-2 fs-6">Quick Actions</p>
    <div class="d-flex common-links mb-2">
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
      <router-link
        to="/flash-cards"
        class="btn btn-dark btn-sm rounded-pill px-3 py-1"
        >Make Note Cards</router-link
      >
    </div>
    <div>
      <h2 class="pb-1 fs-6">Quick Actions</h2>
      <history-cards :cardData="userStoreRef.getAllCards.value"></history-cards>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import HistoryCards from "../components/HistoryCards.vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

onMounted(() => {
  console.log(userStoreRef.getAllCards.value);
});
</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
</style>

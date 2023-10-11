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
      <h2 class="pb-1 fs-6 fw-bold">Recent</h2>
      <div class="card-wrapper d-flex flex-wrap">
        <template v-for="item in userStoreRef.getAllCards.value">
          <rewrite-card
            class="card-sizing"
            v-if="item.dataType == 'rewrite'"
            :cardData="item"
          ></rewrite-card>
          <flash-card
            v-if="item.dataType == 'flashcard'"
            class="card-sizing"
            :card-data="item"
          ></flash-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import FlashCard from "../components/FlashCard.vue";
import RewriteCard from "../components/RewriteCard.vue";
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

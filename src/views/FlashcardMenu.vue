<template>
  <div class="w-100">
    <hr />
    <p class="mb-1 fs-6">Flashcard Generator!!</p>
    <div class="d-flex common-links">
      <NotecardButton></NotecardButton>
    </div>
    <div>
      <flash-card
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
</style>

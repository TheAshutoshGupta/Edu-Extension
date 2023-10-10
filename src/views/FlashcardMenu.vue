<template>
  <div class="w-100">
    <hr />
    <p class="mb-1 fs-6">Flashcard Generator!!</p>
    <div class="d-flex common-links">
      <NotecardButton></NotecardButton>
    </div>
    <div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FlashCardData } from "../types/types";
import NotecardButton from "../components/NotecardButton.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const flashcards: FlashCardData[] = [];

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'storeFlashcardData') {
    console.log('Received storeFlashcardData message');
    const responseData = request.content as FlashCardData;
    console.log(responseData);
    userStoreRef.flashCardData.value.push(responseData);
  }
  else {
    console.log('Received unknown message');
    console.log(request);
  }
});

</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
</style>

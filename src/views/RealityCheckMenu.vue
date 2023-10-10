<template>
  <div class="w-100">
    <hr />
    <p class="mb-1 fs-6">Reality Checker!!</p>
    <div class="d-flex common-links">
      <RealityCheckButton></RealityCheckButton>
    </div>
    <div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RealityCheckButton from "../components/RealityCheckButton.vue";
import { RealityCheckCardData } from "../types/types";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'storeRealityCheck') {
    console.log('Received storeRealityCheck message');
    const responseData = request.content as RealityCheckCardData;
    console.log(responseData);
    userStoreRef.realityCheckCardData.value.push(responseData);
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

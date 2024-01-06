<template>
  <div>
    <!-- <button @click="userStore.clearAllData()">clear all saved data</button>
    <button @click="userStore.clearFlashCardProgress">
      clear flashcard progress
    </button> -->
    <div class="mb-3">
  <button 
    type="button" 
    class="btn btn-sm btn-dark rounded-pill px-3 py-2 fw-bold" 
    @click="userStore.clearAllData()"
  >
    Clear All Saved Data
  </button>
<span>{{ " " }}</span>
  <button 
    type="button" 
    class="btn btn-sm btn-dark rounded-pill px-3 py-2 fw-bold" 
    @click="userStore.clearFlashCardProgress"
  >
    Clear Flash Card Progress
  </button>
</div>


<div class="mb-3">
  <label for="transparentInput" class="form-label">API Password:</label>
  <div class="input-group" style="width: 60%;">
    <input 
      type="password" 
      v-model="userStoreRef.userPrefs.value.password"
      class="form-control bg-transparent border border-dark" 
      id="transparentInput" 
      placeholder="Type here..."
    >
  </div>
</div>


    
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);
</script>

<style scoped></style>

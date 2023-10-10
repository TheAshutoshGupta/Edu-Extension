<template>
  <div>
    <button @click="userStore.clearAllData()">clear all saved data</button>
    <p>API Password</p>
    <input type="password" v-model="userStoreRef.userPrefs.value.password" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);
</script>

<style scoped></style>

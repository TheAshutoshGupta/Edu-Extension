<template>
  <div>
    <button type="button" @click="makeFetchRequest()">{{ apiCallData }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const apiCallData = ref();

const makeFetchRequest = () => {
  // Add the fetch request here
  console.log("test");
};
</script>

<style scoped></style>

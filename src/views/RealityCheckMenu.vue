<template>
  <div class="w-100">
    <p class="mb-1 fs-6">Reality Checker!!</p>
    <div class="d-flex common-links">
      <RealityCheckButton></RealityCheckButton>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import RealityCheckButton from "../components/RealityCheckButton.vue";
</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
</style>

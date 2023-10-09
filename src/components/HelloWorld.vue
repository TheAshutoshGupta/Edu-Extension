<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button">{{ count }}</button>
    <TestButton></TestButton>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR + farti
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
  background-color: yellow;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import TestButton from "./TestButton.vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

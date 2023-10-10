<template>
  <div>
    <p>Note Cards</p>
    <p>{{ userStoreRef.flashCardData.value[props.id].title }}</p>
    <button @click="">Test Me</button>
    <div class="container-fluid d-flex flex-wrap">
      <div
        v-for="item in userStoreRef.flashCardData.value[props.id].flashCards"
        class="bg-light rounded-2 card-sizing p-3 position-relative"
      >
        <font-awesome-icon
          class="position-absolute rounded-pill bg-dark text-white p-2 card-icon"
          :icon="faPencilAlt"
        />
        <p>{{ item.term }}</p>
        <hr />
        <p>{{ item.definition }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

type PropTypes = {
  id: number;
};

const props = defineProps<PropTypes>();
</script>

<style scoped></style>

<template>
  <div>
    <p>Note Cards</p>
    <p>{{ userStoreRef.flashCardData.value[activeIndex].title }}</p>
    <div
      class="bg-light w-100"
      :style="`--progress-width: ${progressBarPercent}%`"
    >
      <div class="progress-bar"></div>
    </div>
    <div class="container-fluid d-flex flex-wrap">
      <div class="bg-light rounded-2 card-sizing p-3 position-relative">
        <p>{{ currentFlashCardContent }}</p>
      </div>
      <div
        v-if="showFront"
        class="d-flex justify-content-between align-items-center"
      >
        <button class="btn btn-small btn-dark" @click="showFront = false">
          Reveal Card
        </button>
      </div>
      <div v-else class="d-flex justify-content-between align-items-center">
        <button
          class="btn btn-small btn-danger rounded-circle"
          @click="setFlashCardStatus(false)"
        >
          <font-awesome-icon class="text-dark" :icon="faTimes" />
        </button>
        <button
          class="btn btn-small btn-success rounded-circle"
          @click="setFlashCardStatus(true)"
        >
          <font-awesome-icon class="text-dark" :icon="faCheck" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

type PropTypes = {
  id: number | string;
};

const props = defineProps<PropTypes>();

const activeIndex = ref<number>(0);
const showFront = ref(true);

const currentFlashCardIndex = computed(() => {
  return userStoreRef.flashCardTestProgress.value.currentFlashCardIndex;
});

const currentFlashCardContent = computed(() => {
  if (showFront.value) {
    return userStoreRef.flashCardData.value[activeIndex.value].flashCards[
      currentFlashCardIndex.value
    ].definition;
  } else {
    return userStoreRef.flashCardData.value[activeIndex.value].flashCards[
      currentFlashCardIndex.value
    ].term;
  }
});

const progressBarPercent = computed(() => {
  if (
    Object.keys(userStoreRef.flashCardTestProgress.value.flashCardProgress)
      .length !== 0
  ) {
    return (
      userStoreRef.flashCardData.value[activeIndex.value].flashCards.length /
      Object.keys(userStoreRef.flashCardTestProgress.value.flashCardProgress)
        .length
    );
  } else {
    return 0;
  }
});

const setFlashCardStatus = (status: boolean) => {
  userStoreRef.flashCardTestProgress.value.flashCardProgress[
    currentFlashCardIndex.value
  ] = status;
  console.log(userStoreRef.flashCardTestProgress.value.flashCardProgress);
  userStoreRef.flashCardTestProgress.value.currentFlashCardIndex++;
  showFront.value = true;
};

onMounted(() => {
  if (typeof props.id == "string") {
    activeIndex.value = Number(props.id);
  } else {
    activeIndex.value = props.id;
  }

  console.log(
    userStoreRef.flashCardTestProgress.value.flashCardGroupIndex,
    activeIndex.value
  );
  console.log(userStoreRef.flashCardTestProgress.value.flashCardProgress);
  if (
    userStoreRef.flashCardTestProgress.value.flashCardGroupIndex ==
    activeIndex.value
  ) {
    console.log("not cleared");
  } else {
    console.log("cleared");
    userStoreRef.flashCardTestProgress.value.flashCardProgress = {};
  }
});
</script>

<style scoped>
.progress-bar {
  height: 5px;
  color: green;
  width: var(--progress-width);
}
</style>

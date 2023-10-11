<template>
  <div class="d-flex flex-column" style="height: 80%">
    <p class="mb-2">Note Cards</p>
    <p class="mb-2 fw-bold">
      {{ userStoreRef.flashCardData.value[activeIndex].title }}
    </p>
    <div class="mb-2 d-flex align-items-center">
      <div
        class="bg-light flashcard-progress-bar-holder rounded-pill"
        :style="`--progress-width: ${progressBarPercent}%`"
      >
        <div class="flashcard-progress-bar rounded-pill"></div>
      </div>
      <p class="mb-0 ms-2 fw-bold">
        {{
          userStoreRef.flashCardTestProgress.value.flashCardProgress.length
        }}/{{ getTotalFlashCardCount }}
      </p>
    </div>

    <div v-if="showStats" class="text-center">
      <div class="bg-light rounded-4 w-100 py-4 text-center">
        <p class="fw-bold fs-1">
          {{ getTotalRight }} / {{ getTotalFlashCardCount }}
        </p>
      </div>
      <p class="fw-bold text-center my-auto">Great Job!</p>
      <button
        @click="resetFlashcards"
        class="my-auto btn btn-outline-dark btn-sm rounded-pill"
      >
        Try Again
      </button>
    </div>
    <div v-else class="d-flex flex-wrap flex-grow-1">
      <div class="d-flex w-100 mb-2">
        <div
          v-if="showFront"
          class="w-100 bg-light rounded-4 card-sizing p-3 position-relative"
        >
          <p>
            {{
              userStoreRef.flashCardData.value[activeIndex].flashCards[
                currentFlashCardIndex
              ].definition
            }}
          </p>
        </div>
        <div
          v-else
          class="w-100 bg-light rounded-4 card-sizing p-3 position-relative"
        >
          <p class="fw-bold">
            {{
              userStoreRef.flashCardData.value[activeIndex].flashCards[
                currentFlashCardIndex
              ].term
            }}
          </p>
          <p>
            {{
              userStoreRef.flashCardData.value[activeIndex].flashCards[
                currentFlashCardIndex
              ].definition
            }}
          </p>
        </div>
      </div>

      <div
        v-if="showFront"
        class="w-100 d-flex justify-content-center align-items-center"
      >
        <button
          class="btn btn-sm btn-dark rounded-pill"
          @click="showFront = false"
        >
          Reveal Card
        </button>
      </div>
      <div
        v-else
        class="d-flex w-100 justify-content-center align-items-center"
      >
        <button
          class="btn btn-sm btn-success rounded-circle flash-card-button me-3"
          @click="setFlashCardStatus(true)"
        >
          <font-awesome-icon class="text-white" :icon="faCheck" />
        </button>
        <button
          class="btn btn-sm btn-danger rounded-circle flash-card-button"
          @click="setFlashCardStatus(false)"
        >
          <font-awesome-icon class="text-white" :icon="faTimes" />
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
const showStats = ref(false);

const getTotalFlashCardCount = computed(() => {
  return userStoreRef.flashCardData.value[activeIndex.value].flashCards.length;
});

const currentFlashCardIndex = computed(() => {
  return userStoreRef.flashCardTestProgress.value.currentFlashCardIndex;
});

const resetFlashcards = () => {
  userStore.clearFlashCardProgress();
  showStats.value = false;
};

const progressBarPercent = computed(() => {
  if (userStoreRef.flashCardTestProgress.value.flashCardProgress.length !== 0) {
    return (
      (userStoreRef.flashCardTestProgress.value.flashCardProgress.length /
        getTotalFlashCardCount.value) *
      100
    );
  } else {
    return 0;
  }
});

const getTotalRight = computed(() => {
  console.log(
    userStoreRef.flashCardTestProgress.value.flashCardProgress.filter(
      (c) => c.passed == true
    )
  );
  return userStoreRef.flashCardTestProgress.value.flashCardProgress.filter(
    (c) => c.passed == true
  ).length;
});

const setFlashCardStatus = (status: boolean) => {
  userStoreRef.flashCardTestProgress.value.flashCardProgress.push({
    cardIndex: userStoreRef.flashCardTestProgress.value.currentFlashCardIndex,
    passed: status,
  });
  console.log(userStoreRef.flashCardTestProgress.value.flashCardProgress);
  if (
    userStoreRef.flashCardTestProgress.value.currentFlashCardIndex + 1 <
    getTotalFlashCardCount.value
  ) {
    userStoreRef.flashCardTestProgress.value.currentFlashCardIndex++;
  } else if (
    userStoreRef.flashCardTestProgress.value.currentFlashCardIndex + 1 ==
    getTotalFlashCardCount.value
  ) {
    showStats.value = true;
  } else {
    showStats.value = true;
  }

  showFront.value = true;
};

onMounted(() => {
  typeof props.id == "number"
    ? (activeIndex.value = props.id)
    : (activeIndex.value = Number(props.id));

  if (
    userStoreRef.flashCardTestProgress.value.flashCardProgress.length >=
    getTotalFlashCardCount.value
  ) {
    showStats.value = true;
  }
  if (
    userStoreRef.flashCardTestProgress.value.flashCardGroupIndex ==
    activeIndex.value
  ) {
    console.log("not cleared");
  } else {
    console.log("cleared");
    userStoreRef.flashCardTestProgress.value.flashCardGroupIndex =
      activeIndex.value;
    userStoreRef.flashCardTestProgress.value.flashCardProgress = [];
  }
});
</script>

<style scoped>
.flashcard-progress-bar-holder {
  position: relative;
  height: 1rem;
  width: 50%;
}
.flashcard-progress-bar {
  height: 1rem;
  position: absolute;
  left: 0;
  top: 0;
  background: green;
  width: var(--progress-width);
}

.flash-card-button {
  height: 50px;
  width: 50px;
}
</style>

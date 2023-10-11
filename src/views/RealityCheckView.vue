<template>
  <div class="w-100">
    <p>{{ props.index }}</p>
    <p class="mb-1 fs-6"><h2>{{ userStoreRef.realityCheckCardData.value[props.index].title }} Reality Check</h2></p>
    <div></div>
    <div>
      <h3>Logical Fallacies:</h3>
      <div  v-for="item in userStoreRef.realityCheckCardData.value[props.index]['Logical Fallacies']">
        <p class="fw-bold">{{ item }}</p>
      </div>
      <h3>Biased Statements:</h3>
      <div  v-for="item in userStoreRef.realityCheckCardData.value[props.index]['Biased Statements']">
        <p class="fw-bold">{{ item }}</p>
      </div>
      <h3>Unsupported Arguments</h3>
      <div v-for="item in userStoreRef.realityCheckCardData.value[props.index]['Unsupported Arguments']">
        <p class="fw-bold">{{ item }}</p>
      </div>
      <h3>Questions for further exploration:</h3>
      <div @click="openLink(item)" v-for="item in userStoreRef.realityCheckCardData.value[props.index]['Questions for Further Exploration']">
        <ul><a class="fw-bold" href="">{{ item }}</a></ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/UserStore";
import { RealityCheckCardData } from "../types/types";
import { onMounted } from "vue";


const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

type PropTypes = {
  index: number;
  realityCheckData?: RealityCheckCardData;
};

const props = defineProps<PropTypes>();

// on load, grab each question and convert href to google link
onMounted(() => {
  const googleLinks = createGoogleLinks();
  console.log(googleLinks);
});

function createGoogleLinks() {
  // get all links
  const links = document.querySelectorAll("a");
  // for each link, replace href with google link using innerText
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    let linkText = link.innerText;
    while(linkText.includes(" ")) {
      linkText = linkText.replace(" ", "+");
    }
    const googleLink = `https://www.google.com/search?q=${linkText}`;
    link.setAttribute("href", googleLink);
    console.log(googleLink);
  }
}

function getGoogleLink(question: string)
{
    let linkText = question;
    while(linkText.includes(" ")) {
      linkText = linkText.replace(" ", "+");
    }
    const googleLink = `https://www.google.com/search?q=${linkText}`;
    return googleLink;
}

function openLink(question: string) {
  console.log("Opening question");

  const googleLink = getGoogleLink(question);


  chrome.tabs.create({ url: googleLink, active: true }, (tab) => {
    console.log("Tab created: " + tab.id);

    // // Listen for tab update events
    // chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    //   // Wait for the tab to complete loading
    //   if (tabId === tab.id && changeInfo.status === "complete") {
    //     // need to make tab active now, since we've had a chance to inject the script before the popup closes
    //     chrome.tabs.update(tab.id, { active: true });
    //   }
    // });
  });
}

</script>

<style scoped>
.common-links {
  gap: 0.25rem;
}
</style>

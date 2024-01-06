<script setup lang="ts">
import {
  faBook,
  faBrain,
  faCog,
  faHouseUser,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import Logo from "./assets/Logo.png?url";
</script>

<template>
  <div class="d-flex p-0 gx-0 h-100">
    <div class="sidebar row d-flex flex-column mx-0 p-3" style="flex-shrink: 0">
      <div class="ashu"></div>
      <router-link to="/" class="mb-4 p-1 rounded-circle nav-link"
        ><font-awesome-icon class="nav-logo" alt="homepage" :icon="faHouseUser"
      /></router-link>
      <router-link to="/rewrite" class="mb-4 p-1 rounded-circle nav-link"
        ><font-awesome-icon
          class="nav-logo"
          alt="rewrite page"
          :icon="faPencilAlt"
      /></router-link>
      <router-link to="/reality-check" class="mb-4 p-1 rounded-circle nav-link"
        ><font-awesome-icon
          class="nav-logo"
          alt="critical thinking"
          :icon="faBrain"
      /></router-link>
      <router-link to="/flash-cards" class="mb-4 p-1 rounded-circle nav-link"
        ><font-awesome-icon class="nav-logo" alt="flash cards" :icon="faBook"
      /></router-link>
      <router-link to="/user-settings" class="mb-4 p-1 rounded-circle nav-link"
        ><font-awesome-icon class="nav-logo" alt="flash cards" :icon="faCog"
      /></router-link>
    </div>
    <div
      class="row d-flex overflow-scroll flex-nowrap flex-column bg-white gx-0 h-100 p-3 justify-cotent-start align-items-start"
      style="flex-grow: 1"
    >
       <div class="d-flex align-items-center pb-3">

      <!-- <img class="logo d-block" :src="Logo" /> -->
      </div> 
      
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.logo {
  max-height: 1.5rem;
  width: auto;
}
.router-link-active {
  background: white;
  color: black !important;
}
.nav-link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  color: white;
}

.nav-logo {
  height: 100%;
  width: 100%;
}
.sidebar{
  background-color: #232b3f;
}
.ashu {
  
  
  /* clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%); */
  position: absolute;
  left: calc(50% - 11rem);
  aspect-ratio: 1155 / 678;
  width: 36.125rem;
  transform: translateX(-50%) translateY(60%) rotate(30deg);
  background: linear-gradient(to bottom right, #ff80b5, #9089fc);
  opacity: 0.1;
  filter: blur(50px); /* Add the blur effect */
  z-index: -1;
  }


</style>

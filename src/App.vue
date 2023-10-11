<script setup lang="ts">
import {
  faBook,
  faBrain,
  faCog,
  faHouseUser,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Logo from "./assets/Logo.png?url";
</script>

<template>
  <div class="d-flex px-0 gx-0 h-100">
    <div class="row bg-dark d-flex flex-column mx-0 p-2" style="flex-shrink: 0">
      <router-link to="/" class="mb-2 px-0 rounded-circle nav-link"
        ><font-awesome-icon class="" alt="homepage" :icon="faHouseUser"
      /></router-link>
      <router-link to="/rewrite" class="mb-2 px-0 rounded-circle nav-link"
        ><font-awesome-icon class="" alt="rewrite page" :icon="faPencilAlt"
      /></router-link>
      <router-link to="/reality-check" class="mb-2 px-0 rounded-circle nav-link"
        ><font-awesome-icon class="" alt="critical thinking" :icon="faBrain"
      /></router-link>
      <router-link to="/flash-cards" class="mb-2 px-0 rounded-circle nav-link"
        ><font-awesome-icon class="" alt="flash cards" :icon="faBook"
      /></router-link>
      <router-link to="/user-settings" class="mb-2 px-0 rounded-circle nav-link"
        ><font-awesome-icon class="" alt="flash cards" :icon="faCog"
      /></router-link>
    </div>
    <div
      class="row d-flex overflow-scroll flex-nowrap flex-column bg-white gx-0 h-100 p-3 justify-cotent-start align-items-start"
      style="flex-grow: 1"
    >
      <div class="d-flex align-items-center pb-3">
        <img class="logo d-block" :src="Logo" />
      </div>
      <hr />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.logo {
  max-height: 1.25rem;
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
  height: 1.5rem;
  width: 1.5rem;
  color: white;
}
</style>

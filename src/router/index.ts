import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Rewrite from "../views/Rewrite.vue";
import FlashcardMenu from "../views/FlashcardMenu.vue";
import RealityCheckMenu from "../views/RealityCheckMenu.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/rewrite",
    name: "Rewrite",
    component: Rewrite,
  },
  {
    component: Main,
    path: "/:pathMatch(.*)*",
  },
  {
    path: "/flash-cards",
    name: "Flashcard",
    component: FlashcardMenu,
  },
  {
    path: "/reality-check",
    name: "RealityCheck",
    component: RealityCheckMenu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

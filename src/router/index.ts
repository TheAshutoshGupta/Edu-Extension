import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Rewrite from "../views/Rewrite.vue";
import FlashcardMenu from "../views/FlashcardMenu.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import FlashcardMenu from "../views/FlashcardMenu.vue";
import FlashcardPreview from "../views/FlashcardPreview.vue";
import FlashcardTest from "../views/FlashcardTest.vue";
import Main from "../views/Main.vue";
import Rewrite from "../views/Rewrite.vue";
import RealityCheckMenu from "../views/RealityCheckMenu.vue";
import UserSettings from "../views/UserSettings.vue";
import RealityCheckView from "../views/RealityCheckView.vue";

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
    path: "/flash-card-preview/:id",
    name: "Flashcard Preview",
    component: FlashcardPreview,
    props: true,
  },
  {
    path: "/flash-card-test/:id",
    name: "Flashcard Test",
    component: FlashcardTest,
    props: true,
  },
  {
    path: "/user-settings",
    name: "User Settings",
    component: UserSettings,
  },
  {
    path: "/reality-check",
    name: "RealityCheck",
    component: RealityCheckMenu,
  },
  {
    path: "/reality-check-view/:index",
    name: "RealityCheckView",
    component: RealityCheckView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

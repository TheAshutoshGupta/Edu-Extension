import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Rewrite from "../views/Rewrite.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

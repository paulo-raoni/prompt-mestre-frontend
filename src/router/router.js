import { createRouter, createWebHistory } from "vue-router";
import Menu from "../components/Menu.vue";
import Category from "../components/Category.vue";
import Prompt from "../components/Prompt.vue";

const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu,
    props: true,
  },
  {
    path: "/categoria/:slug",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/prompt/:categorySlug/:promptSlug",
    name: "Prompt",
    component: Prompt,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

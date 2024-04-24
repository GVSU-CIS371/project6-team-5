import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import GroceriesView from "./components/Groceries.vue";
import BestSellerView from "./components/BestSeller.vue";
import ElectronicsView from "./components/Electronics.vue";
import ClothingView from "./components/Clothing.vue";

const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: "/electronics",
    name: "electronics",
    component: ElectronicsView,
  },
  {
    path: "/clothing",
    name: "clothing",
    component: ClothingView,
  },
  {
    path: "/groceries",
    name: "groceries",
    component: GroceriesView,
  },
  {
    path: "/bestseller",
    name: "bestseller",
    component: BestSellerView,
  },
  // you need to add more routes here
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

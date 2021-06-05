import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../views/Home.vue";
import Shop from "@/views/Shop.vue";
import ItemDisplay from "../components/ItemDisplayPage/ItemDisplay.vue";
import Contact from "@/views/Contact.vue";
import Admin from "@/components/AdminPage/AdminMainPanel.vue";
import CartView from "@/views/CartView.vue";
import CartProcess from "../components/CartPage/CartProcess.vue";
// import ShowCollection from "@/components/views/ShowCollection.vue";
import Login from "@/views/Login.vue";
import UserProfile from "../components/UserProfilePage/UserProfile.vue";
// import Payment from "@/components/CartSection/Payment.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: LandingPage,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/shop/:category",
    name: "ShowCollection",
    component: Shop,
  },
  {
    path: "/item/:id",
    name: "ItemDisplay",
    component: ItemDisplay,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },

  {
    path: "/cart",
    name: "Cart",
    component: CartView,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CartProcess,
  },
  // {
  //   path: "/shop/:category",
  //   name: "ShowCollection",
  //   component: ShowCollection,
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  // {
  //   path: "/payment",
  //   name: "Payment",
  //   component: Payment,
  // },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior() {
  //   window.scrollTo(0, 0);
  // },
  beforeEach(to, from, next) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    next();
  },
});

export default router;

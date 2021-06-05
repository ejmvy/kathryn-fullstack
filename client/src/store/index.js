import axios from "axios";
import { createStore } from "vuex";
import cartModule from "./modules/cart.js";
import productModule from "./modules/products.js";
import recentOrders from "./modules/recentOrders.js";

export default createStore({
  modules: {
    prods: productModule,
    cart: cartModule,
    recentOrders: recentOrders,
  },
  state: {
    isLoggedIn: false,
    user: {},
    userOrders: [],
    notification: {
      state: "",
      title: "",
      message: "",
    },
    userKey: "",
  },
  mutations: {
    login(state, payload) {
      console.log("user logging in...");
      console.log(payload);
      state.user = payload;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userDetails", JSON.stringify(state.user));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
      state.userKey = "";

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userDetails");
    },
    saveAddress(state, payload) {
      console.log("address to save:");
      console.log(payload);
      state.user.userAddress = payload;
    },
    setUserKey(state, payload) {
      state.userKey = payload;
    },
    setUserOrders(state, payload) {
      state.userOrders = payload;
    },
  },
  actions: {
    login: (context, payload) => context.commit("login", payload),
    logout: (context) => context.commit("logout"),
    // setUserKey: (context, payload) => {},
    saveAddress: (context, payload) => context.commit("saveAddress", payload),
    updateUserDetails: ({ dispatch, getters }) => {
      const key = getters["getUserKey"];
      console.log("key: " + key);
      axios
        .get(`${process.env.VUE_APP_BASE_URL}users/me`, {
          headers: {
            "x-auth-token": key,
          },
        })
        .then((data) => {
          dispatch("login", data.data);
        })
        .catch((e) => {
          console.log(`err ${e}`);
        });
    },
    getUserOrders: (context, userId) => {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}orders/userhistory/${userId}`)

        .then((data) => {
          context.commit("setUserOrders", data.data);
        })
        .catch((e) => {
          console.log(`err ${e}`);
        });
    },
    setKey: (context, payload) => {
      context.commit("setUserKey", payload);
    },
  },

  getters: {
    isAdmin: (state) => state.user.isAdmin,
    isAuthenticated: (state) => state.isLoggedIn,
    getUserDetails: (state) => state.user,
    getAddress: (state) => state.user.userAddress,
    getUserOrders: (state) => state.userOrders,
    getUserKey: (state) => state.userKey,
  },
});

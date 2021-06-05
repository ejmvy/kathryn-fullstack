<template>
  <div>
    <div v-if="userLoggedIn" class="mainSection slowShow h-screen">
      <div class="w-screen h-full">
        <div
          class="bg-green-light w-full flex items-center justify-between p-2 md:p-3 shadow-xl"
        >
          <router-link to="/">
            <Svg :svgColour="'white'" :svg="homeSvg"></Svg>
          </router-link>
          <h5 class="text-white uppercase text-xs md:text-lg">My Account</h5>
          <svg
            @click="logoutUser()"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <UserAccountMenu
          v-if="!hideMenu"
          @userSelect="openMenu"
          :userName="userDetails.name"
        ></UserAccountMenu>

        <transition name="fade" mode="out-in">
          <UserOrders
            v-if="menu.userOrders"
            @closeMenu="closeMenuOption"
          ></UserOrders>
        </transition>

        <transition name="fade" mode="out-in">
          <UserMainDetails
            v-if="menu.userDetails"
            @closeMenu="closeMenuOption"
          ></UserMainDetails>
        </transition>

        <transition name="fade" mode="out-in">
          <UserAddress
            v-if="menu.userAddress"
            @closeMenu="closeMenuOption"
          ></UserAddress>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UserAccountMenu from "./UserAccountMenu.vue";
import UserOrders from "./UserOrders.vue";
import UserAddress from "./UserAddress.vue";
import UserMainDetails from "./UserMainDetails.vue";
import Svg from "../Designs/SvgBase.vue";
export default {
  data() {
    return {
      homeSvg:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      hideMenu: false,
      menu: {
        userOrders: false,
        userDetails: false,
        userAddress: false,
        userHelp: false,
        userOrderLocation: false,
      },
      userDetails: {},
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.emitter.emit("showNotification", {
        state: true,
        message: "Bye for now",
      });
    },

    openMenu(path) {
      console.log("user path:" + path);
      for (var key in this.menu) {
        if (key === path) {
          console.log("key: " + this.menu[key]);
          this.hideMenu = true;
          this.menu[key] = true;
        }
      }
    },
    closeMenuOption(path) {
      console.log("path to close: " + path);
      this.menu[path] = false;
      this.hideMenu = false;
    },
  },
  computed: {
    userLoggedIn() {
      const isLogged = this.$store.getters["isAuthenticated"];
      return isLogged;
    },
  },
  mounted() {
    this.userDetails = this.$store.getters["getUserDetails"];

    const isLogged = this.$store.getters["isAuthenticated"];
    if (!isLogged) {
      console.log("to login2");
      this.$router.push("/login");
    }
  },
  components: {
    Svg,
    UserAccountMenu,
    UserOrders,
    UserMainDetails,
    UserAddress,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.fade-enter,
.fade-leave-to {
  /* transform: translateX(-10px); */
  opacity: 0;
}
</style>

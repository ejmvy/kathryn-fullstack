<template>
  <div class="slowShow">
    <div v-if="userLoggedIn">
      <div class="flex flex-col bg-white items-center pt-5">
        <div
          class="w-20 h-20 bg-green-dark border-4 border-gray-300 rounded-full text-4xl flex justify-center text-white items-center"
        >
          {{ getInitials }}
        </div>
        <div class="mt-6 mb-2">Hi,</div>
        <div class="font-bold text-lg tracking-widest pb-5">{{ userName }}</div>
      </div>
      <div class="bg-gray-200 w-full p-1"></div>

      <!-- Main Account Menu  -->

      <div
        class="md:flex md:w-full md:px-10 lg:px-32 xl:px-44 md:h-full md:pb-32 md:bg-gray-200"
      >
        <div class="md:w-1/3">
          <div
            class="md:w-full md:m-auto md:flex md:justify-center bg-white"
            v-for="path in accountPaths"
            :key="path"
          >
            <div
              @click="showRoute(path.route)"
              class="w-full flex items-center py-5 pl-6 border-b border-gray-400 cursor-pointer hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="path.icon"
                />
              </svg>
              <p class="ml-10 tracking-wider text-gray-600 text-sm">
                {{ path.pathName }}
              </p>
            </div>
          </div>
        </div>
        <div class="hidden md:ml-5 md:flex md:flex-col md:w-2/3">
          <transition name="component-fade" mode="out-in">
            <keep-alive>
              <component :is="view"></component>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import UserOrders from "./UserOrders.vue";
import UserAddress from "./UserAddress.vue";
import UserMainDetails from "./UserMainDetails.vue";
import Footer from "../LandingPage/Footer.vue";
export default {
  data() {
    return {
      userName: "",
      view: "userOrders",
      accountPaths: [
        {
          pathName: "My orders",
          icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
          route: "userOrders",
        },
        {
          pathName: "My details",
          icon:
            "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
          route: "userDetails",
        },
        {
          pathName: "Address details",
          icon:
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
          route: "userAddress",
        },
        {
          pathName: "Need help?",
          icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          route: "userHelp",
        },
        {
          pathName: "Where's my order?",
          icon:
            "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          route: "userOrderLocation",
        },
        {
          pathName: "Delivery Info",
          icon:
            "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
          route: "userOrderLocation",
        },
        {
          pathName: "Returns",
          icon:
            "M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z",
          route: "userOrderLocation",
        },
      ],
    };
  },

  methods: {
    showRoute(path) {
      if (window.innerWidth < 768) {
        this.$emit("userSelect", path);
      } else {
        this.view = path;
      }
    },
  },
  computed: {
    getInitials() {
      if (this.userName) {
        const name = this.userName.split(" ");
        const firstLetter = name[0].split("")[0];
        const lastLetter = name[1].split("")[0];
        return firstLetter + lastLetter;
      }
      return "";
    },

    userLoggedIn() {
      const isLogged = this.$store.getters["isAuthenticated"];
      return isLogged;
    },
  },
  mounted() {
    const userDetails = this.$store.getters["getUserDetails"];
    this.userName = userDetails.name;
    const isLogged = this.$store.getters["isAuthenticated"];
    if (!isLogged) {
      console.log("to login");
      this.$router.push("/login");
    }
  },
  components: {
    Footer,
    userOrders: UserOrders,
    userDetails: UserMainDetails,
    userAddress: UserAddress,
  },
};
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

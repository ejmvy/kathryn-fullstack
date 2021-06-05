<template>
  <div class="h-screen">
    <AdminLogin v-if="!userLoggedIn"></AdminLogin>

    <div v-if="userLoggedIn">
      <AdminHeader @logout="logoutUser"></AdminHeader>

      <div class="w-2/3 m-auto my-10">
        <div class="flex justify-between items-center">
          <img
            @click="changeWindow('recentOrders')"
            class="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            src="https://i.ibb.co/W3kjX3s/file-green.png"
          />
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>

          <img
            @click="changeWindow('statsPanel')"
            class="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            src="https://i.ibb.co/HdwZh2S/graph.png"
          />
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>
          <img
            @click="changeWindow('orderHistory')"
            class="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            src="https://i.ibb.co/DRD73Z5/list-green.png"
          />
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>
          <img
            @click="changeWindow('editPanel')"
            class="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
            src="https://i.ibb.co/N6vxTqj/pencil-green.png"
          />
        </div>
      </div>

      <div class="pt-8 mb-20 border-t border-gray-200">
        <transition name="component-fade" mode="out-in">
          <!-- <keep-alive> -->
          <component :is="view"></component>
          <!-- </keep-alive> -->
        </transition>
      </div>

      <transition name="slide-up">
        <ConfirmPopup
          v-if="showPopup"
          :popupData="popupMessage"
          @closePopup="closePopup"
          @confirmAction="saveAction"
        ></ConfirmPopup>
      </transition>
    </div>
  </div>
</template>

<script>
import AdminLogin from "../AdminPage/AdminLogin.vue";
import AdminHeader from "../AdminPage/AdminHeader.vue";
import RecentOrderPanel from "../AdminPage/RecentOrderPanel.vue";
import OrderHistoryPanel from "../AdminPage/OrderHistoryPanel.vue";
import StatsPanel from "../AdminPage/StatsPanel.vue";
import EditPanel from "../AdminPage/EditPanel.vue";
import ConfirmPopup from "../Designs/ConfirmPopup.vue";
import axios from "axios";

export default {
  data() {
    return {
      openConfigPanel: true,
      openOrderPanel: false,
      openHistoryPanel: false,
      currentIndex: 0,
      back: false,
      view: "recentOrders",
      showPopup: false,
      popupMessage: {
        title: "",
        message: "",
        icon: "",
      },
    };
  },
  methods: {
    changeWindow(tab) {
      this.view = tab;
    },
    logoutUser() {
      this.popupMessage.title = "Logout ?";
      this.popupMessage.message = "Are you sure you wish to leave?";
      this.popupMessage.icon =
        "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z";
      this.emitter.emit("showOverlay");
      this.showPopup = true;
    },
    saveAction() {
      this.showPopup = false;
      this.emitter.emit("hideOverlay");
      this.$store.dispatch("logout");
      this.emitter.emit("showNotification", {
        state: true,
        message: "Bye for now",
      });
    },
    closePopup() {
      this.showPopup = false;
      this.emitter.emit("hideOverlay");
    },
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters["isAdmin"];
    },
  },
  created() {
    axios.get(`${process.env.VUE_APP_BASE_URL}categories/`).then((data) => {
      this.categoryList = data.data;
    });

    console.log(`user logged: `, this.$store.state.user);

    // this.$store.dispatch("prods/callProductsApi");
  },
  components: {
    AdminLogin,
    AdminHeader,
    ConfirmPopup,
    recentOrders: RecentOrderPanel,
    statsPanel: StatsPanel,
    orderHistory: OrderHistoryPanel,
    editPanel: EditPanel,
  },
};
</script>

<style scoped>
.line {
  width: 100px;
  height: 3px;
  background: rgba(32, 72, 88, 0.7);
  border-radius: 5px;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.5s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="h-screen">
    <AdminLogin v-if="!userLoggedIn"></AdminLogin>

    <div v-if="userLoggedIn">
      <AdminHeader @logout="logoutUser"></AdminHeader>

      <div class="w-2/3 m-auto my-10">
        <div class="flex justify-between items-center">
          <Svg
            @click="changeWindow('recentOrders')"
            :svgColour="svgColour"
            :svg="recentOrdersSvg"
            :classes="svgLarge"
          ></Svg>
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>
          <Svg
            @click="changeWindow('statsPanel')"
            :svgColour="svgColour"
            :svg="statsPanelSvg"
            :classes="svgLarge"
          ></Svg>
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>
          <Svg
            @click="changeWindow('orderHistory')"
            :svgColour="svgColour"
            :svg="orderHistorySvg"
            :classes="svgLarge"
          ></Svg>
          <div class="w-20 mx-2 sm:w-24 h-0.5 bg-green-light"></div>
          <Svg
            @click="changeWindow('editPanel')"
            :svgColour="svgColour"
            :svg="editPanelSvg"
            :classes="svgLarge"
          ></Svg>
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
import Svg from "../Designs/SvgBase.vue";
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
      recentOrdersSvg:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      statsPanelSvg:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      orderHistorySvg:
        "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      editPanelSvg:
        "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
      svgColour: "#365a69",
      svgLarge: "w-8 h-8 sm:w-10 sm:h-10",
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
    Svg,
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

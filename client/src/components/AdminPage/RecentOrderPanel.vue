<template>
  <div style="height: 100%" class="w-full">
    <div class="flex flex-col h-full w-full lg:w-5/6 lg:m-auto items-center">
      <div class="w-11/12 flex justify-between">
        <div class="w-5 h-5"></div>
        <h5 class="uppercase text-sm text-gray-500 font-bold">
          Your Recent Orders
        </h5>
        <div>
          <Svg
            @click="onConfirmPopupOpen()"
            :svgColour="svgColour"
            :svg="confirmChangesSvg"
          ></Svg>
        </div>
      </div>

      <div class="mt-10 w-11/12">
        <table class="w-full">
          <tr class="bg-gray-100 text-xs text-gray-400">
            <th class="py-4 text-left pl-5">Customer</th>
            <th class="py-4">Items</th>
            <th class="py-4">Amount</th>
            <th class="py-4">Order Date</th>
            <th class="py-4">Mark as Delivered</th>
            <th class="py-4"></th>
          </tr>
          <tbody>
            <!-- <transition-group tag="tbody" name="list" mode="out-in"> -->
            <tr
              class="border-b border-gray-300 text-sm"
              v-for="item in getRecentOrders"
              :key="item"
            >
              <td class="py-6 text-left pl-5">{{ item.customer.name }}</td>
              <td class="py-6">{{ getQuantity(item.products) }}</td>
              <td class="py-6">{{ item.cartTotal }}</td>
              <td class="py-6">{{ convertDate(item.orderDate) }}</td>
              <td class="py-6">
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="item.isDelivered"
                  @click="sendDelivered()"
                  id="deliveredCheck"
                />
              </td>
              <td class="py-6 flex justify-end mr-5">
                <Svg
                  @click="showOrderDetails(item)"
                  :svgColour="svgColour"
                  :svg="viewOrderSvg"
                ></Svg>
              </td>
            </tr>
          </tbody>
          <!-- </transition-group> -->
        </table>
      </div>
    </div>
    <transition name="slide-up">
      <ViewOrderDetails
        v-if="showOrderPanel"
        :orderDetails="viewOrder"
        @closePopup="closePopup"
      ></ViewOrderDetails>
    </transition>
    <div>
      <transition name="slide-up">
        <ConfirmPopup
          v-if="showPopup"
          class="z-10"
          :popupData="popupMessage"
          @closePopup="closePopup"
          @confirmAction="saveAction"
        ></ConfirmPopup>
      </transition>
    </div>
  </div>
</template>

<script>
import ViewOrderDetails from "./ViewOrderDetails.vue";
import ConfirmPopup from "../Designs/ConfirmPopup.vue";
import Svg from "../Designs/SvgBase.vue";
import axios from "axios";
export default {
  data() {
    return {
      showDetails: false,
      viewOrder: {},
      showOrderPanel: false,
      showPopup: false,
      popupMessage: {
        title: "",
        message: "",
        icon: "",
      },
      confirmChangesSvg: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      viewOrderSvg: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      svgColour: "#365a69",
    };
  },
  methods: {
    showOrderDetails(order) {
      this.viewOrder = order;
      this.emitter.emit("showOverlay");
      this.showOrderPanel = true;
    },

    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
    sendDelivered() {
      // item.isDelivered = !item.isDelivered;
      var isDelivered = document.getElementById("deliveredCheck").checked;
      console.log("delivered: ", isDelivered);
    },
    onConfirmPopupOpen() {
      this.popupMessage.title = "Save Changes ?";
      this.popupMessage.message =
        "Please confirm if you would like to save the updated delivery status of your orders";
      this.popupMessage.icon =
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z";
      this.emitter.emit("showOverlay");
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.emitter.emit("hideOverlay");
      this.showOrderPanel = false;
    },
    saveAction() {
      const orders = this.getRecentOrders;

      const updateOrders = orders.filter((order) => order.isDelivered);

      console.log("ORDERS to save:");
      console.log(updateOrders);

      updateOrders.forEach((orderDelivered) => {
        axios
          .put(`${process.env.VUE_APP_BASE_URL}orders/${orderDelivered._id}`, {
            isDelivered: true,
          })
          .then((data) => {
            console.log("SEnt");
            console.log(data.data);
            this.$store.dispatch("recentOrders/callOrdersAPI");
            this.emitter.emit("reloadData");
            this.closePopup();
          });
      });
    },
    getQuantity(products) {
      return products.reduce((acc, cur) => cur.qty + acc, 0);
    },
  },
  computed: {
    getRecentOrders() {
      return this.$store.getters["recentOrders/getOrders"];
    },
  },
  created() {
    this.$store.dispatch("recentOrders/callOrdersAPI");
  },
  components: {
    Svg,
    ViewOrderDetails,
    ConfirmPopup,
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  /* transform: translateY(30px); */
  transition: transform 0.5s;
}
/* 
<transition-group  >


csss*/

.flip-list-move {
  transition: transform 0.5s;
}
</style>

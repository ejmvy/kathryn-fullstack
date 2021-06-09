<template>
  <div>
    <div
      class="w-full min-h-screen md:h-4/5 bg-white shadow-2xl flex flex-col items-center"
    >
      <div
        class="relative w-full flex justify-between items-center p-2 bg-green-light"
      >
        <router-link class="logo text-3xl text-white" to="/">KC</router-link>
        <div class="flex">
          <Svg :svgColour="'white'" :svg="cartSvg"></Svg>
          <div
            class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
          >
            {{ getCartLength }}
          </div>
        </div>
      </div>

      <div class="flex justify-between w-4/5 pt-2 py-3">
        <div class="flex flex-col items-center w-20">
          <div class="circleProgress progressCompleted">1</div>
          <div class="text-xxs mt-3 uppercase">Sign In</div>
        </div>
        <div class="w-20 h-0.5 bg-green-dark mt-3"></div>
        <div class="flex flex-col items-center w-20">
          <div
            class="circleProgress"
            :class="[
              getPaymentStep == 2 || getPaymentStep == 3
                ? 'progressCompleted'
                : 'progressTodo',
            ]"
          >
            2
          </div>
          <div class="text-xxs mt-3 uppercase">Address Details</div>
        </div>
        <div class="w-20 h-0.5 bg-green-dark mt-3"></div>
        <div class="flex flex-col items-center w-20">
          <div
            class="circleProgress"
            :class="[
              getPaymentStep == 3 ? 'progressCompleted' : 'progressTodo',
            ]"
          >
            3
          </div>
          <div class="text-xxs mt-3 uppercase">Confirm Order</div>
        </div>
      </div>
      <div class="w-full min-h-screen bg-gray-200">
        <div class="w-full md:w-2/3 md:m-auto md:mb-10">
          <AddressDetails class="slowShow" v-if="getPaymentStep == 1">
          </AddressDetails>
          <ConfirmOrder
            class="slowShow"
            v-if="getPaymentStep == 2"
            @orderComplete="saveOrder"
          ></ConfirmOrder>
          <OrderConfirmation
            class="slowShow"
            v-if="getPaymentStep == 3"
            :orderDetails="newOrder"
          ></OrderConfirmation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressDetails from "./AddressDetails.vue";
import ConfirmOrder from "./ConfirmOrder.vue";
import OrderConfirmation from "./OrderConfirmation.vue";
import Svg from "../Designs/SvgBase.vue";

export default {
  data() {
    return {
      newOrder: {},
      cartSvg:
        "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    };
  },

  methods: {
    saveOrder(order) {
      console.log("NEW ORDER");
      console.log(order);
      this.newOrder = order;
    },
  },

  computed: {
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },

    getPaymentStep() {
      const paymentStep = this.$store.getters["cart/paymentStep"];
      console.log("STEP: " + paymentStep);
      return paymentStep;
    },
  },
  components: {
    Svg,
    AddressDetails,
    ConfirmOrder,
    OrderConfirmation,
  },
};
</script>

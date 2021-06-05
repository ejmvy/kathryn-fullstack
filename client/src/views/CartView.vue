<template>
  <div class="w-screen h-screen">
    <div
      class="md:flex md:absolute w-screen h-screen overflow-hidden bg-green-light md:justify-center md:items-center"
    >
      <div
        class="w-full h-screen overflow-hidden md:w-4/5 md:h-4/5 bg-white shadow-2xl flex flex-col md:flex-row"
        :class="{ blackBg: customisePanel }"
      >
        <div
          class="relative flex justify-between items-center p-2 bg-green-light md:hidden"
        >
          <router-link class="logo text-3xl text-white" to="/">KC</router-link>
          <div class="flex">
            <img class="w-6 h-6" src="https://i.ibb.co/vzdx4Vj/cart.png" />
            <div
              class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
            >
              {{ getCartLength }}
            </div>
          </div>
        </div>

        <div
          class="mainContent h-4/5 md:h-full md:w-3/4 bg-gray-100 overflow-auto"
        >
          <div class="hidden md:flex w-full md:items-center p-4 mb-4 bg-white">
            <router-link to="/shop">
              <Svg :svgColour="'#627F8A'" :svg="backSvg"></Svg>
            </router-link>
            <h5 class="uppercase font-bold tracking-wider pl-5">My Bag</h5>
          </div>
          <div class="h-11/12 md:mx-5">
            <div
              v-for="(product, idx) in cartItems"
              :key="idx"
              class="bg-white w-full h-36 flex flex-col justify-center border-b border-gray-300 px-3 py-4 mb-3"
            >
              <div class="flex h-36 items-center justify-between">
                <div class="w-24 h-28">
                  <img class="h-28 w-24" :src="product.imageUrlArray[0]" />
                </div>
                <div class="flex flex-col items-center justify-between">
                  <div class="flex items-center justify-between w-full pb-4">
                    <div class="text-gray-500">{{ product.name }}</div>
                    <div class="text-xs font-bold">{{ product.price }}</div>
                  </div>
                  <div class="text-gray-400 text-xs">{{ product._id }}</div>
                  <div class="flex items-center pt-3">
                    <div class="text-xs">{{ product.colourSelected }}</div>
                    <div class="h-4 w-0.5 bg-gray-200 mx-5"></div>
                    <div class="text-xs">Qty {{ product.qty }}</div>
                  </div>
                </div>
                <div
                  @click="manageItem(product)"
                  class="self-start cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="absolute bottom-0 w-full py-5 bg-green-dark p-3 flex justify-between items-center text-white md:relative md:right-0 md:w-1/4 md:flex-col md:justify-center md:items-start"
        >
          <div class="flex w-full flex-col text-left text-white">
            <div class="md:hidden">
              <div class="text-xs uppercase">Total:</div>
              <div class="font-bold">€ {{ getTotal }}</div>
            </div>
            <div class="hidden md:flex flex-col">
              <div
                class="text-sm uppercase font-bold pb-3 mb-6 border-b border-gray-light tracking-wider"
              >
                Total:
              </div>
              <div class="flex items-center justify-between">
                <p class="mr-2 text-xs">Sub Total:</p>
                <div class="font-bold text-right">€ {{ getTotal }}</div>
              </div>
              <div class="flex items-center justify-between mt-5">
                <p class="mr-2 text-xs">Delivery:</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full flex flex-col items-center">
            <button
              class="btn-white btn-lrg md:mt-20"
              :class="{ disable: !getCartLength }"
              @click="checkLoginDetails"
            >
              Checkout
            </button>
            <p class="text-xxs mt-5 hidden md:flex">* Payment with Stripe</p>
          </div>
        </div>
      </div>
    </div>
    <transition :name="mobileWidth ? 'slideUp' : 'slide-up'" class="transition">
      <div
        v-if="customisePanel"
        class="customisePanel absolute bottom-0 md:relative md:top-1/3 md:w-1/3 md:m-auto w-full flex flex-col items-center bg-white"
      >
        <div class="py-3 md:pt-8">
          <div class="font-bold">{{ customiseItem.name }}</div>
          <div class="text-gray-500 py-4">
            {{ customiseItem.description }}
          </div>
          <div class="flex flex-col items-center">
            <div class="text-green-light text-xs">Customise Item</div>
            <div class="flex items-center pt-3">
              <div class="cursor-pointer" @click="minusPrice(customiseItem)">
                <Svg :svgColour="'#627F8A'" :svg="minusSvg"></Svg>
              </div>

              <div class="font-bold mx-5">{{ customiseItem.qty }}</div>
              <div class="cursor-pointer" @click="plusPrice(customiseItem)">
                <Svg :svgColour="'#627F8A'" :svg="plusSvg"></Svg>
              </div>
            </div>
          </div>
          <div class="text-gray-600 text-xs py-3">
            Price: {{ (customiseItem.price * customiseItem.qty).toFixed(2) }}
          </div>

          <div
            class="text-xs text-red-500 font-bold cursor-pointer opacity-0"
            :class="{ fullOpacity: customiseItem.qty == '0' }"
            @click="removeItem(customiseItem)"
          >
            Remove ?
          </div>
        </div>

        <div class="border border-gray-200 w-full"></div>
        <div class="flex justify-end w-full text-sm font-bold py-1 px-3">
          <button
            @click="closeCustomisePanel()"
            class="text-gray-400 bg-transparent border-transparent p-1 hover:bg-green-light hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Svg from "../components/Designs/SvgBase.vue";
export default {
  data() {
    return {
      plusSvg: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
      minusSvg: "M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
      backSvg: "M15 19l-7-7 7-7",
      cartItems: [],
      total: 0,
      isRemoved: false,
      windowWidth: window.innerWidth,
      paymentStep: 1,
      detailsConfirmed: false,
      openBottom: false,
      showAddressForm: false,
      customisePanel: false,
      customiseItem: {},
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    minusPrice(product) {
      if (product.qty > 0) {
        this.$store.dispatch("cart/decreaseQty", product);
      }
    },
    plusPrice(product) {
      this.$store.dispatch("cart/increaseQty", product);
    },
    removeItem(product) {
      product.isRemoved = true;
      this.$store.dispatch("cart/removeFromCart", {
        item: product,
      });
      this.customiseItem = {};
      this.customisePanel = false;
    },
    addressDetailsConfirmed() {
      console.log("Details Confirmed");
      this.detailsConfirmed = true;
    },
    checkLoginDetails() {
      this.$store.dispatch("cart/increasePaymentStep");
      const userLoggedIn = this.$store.getters["isAuthenticated"];
      console.log(`userLoggedIn: ${userLoggedIn}`);
      if (!userLoggedIn) {
        return this.$router.push("/login");
      }
      if (userLoggedIn) {
        const addressDetails = this.$store.getters["getAddress"];
        if (!addressDetails) return this.$router.push("/checkout");
        else {
          this.$store.dispatch("cart/setPaymentStep", 2);
          this.$router.push("/checkout");
        }
      }
    },
    manageItem(product) {
      this.customiseItem = product;
      this.customisePanel = true;
    },
    closeCustomisePanel() {
      this.customiseItem = {};
      this.customisePanel = false;
    },
  },
  computed: {
    getTotal: function () {
      var totalValue = 0;
      this.cartItems.forEach((product) => {
        let productTotal = product.price * product.qty;
        totalValue = totalValue + productTotal;
      });
      return totalValue.toFixed(2);
    },
    mobileWidth() {
      return this.windowWidth <= 750;
    },
    isDisabled() {
      return this.detailsConfirmed ? false : true;
    },

    getPaymentStep() {
      return this.$store.getters["cart/paymentStep"];
    },
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },
  },
  created() {
    this.cartItems = this.$store.getters["cart/products"];
    console.log("cart: ", this.cartItems);
  },
  components: {
    Svg,
  },
};
</script>

<style scoped>
.blackBg {
  background: black;
  opacity: 0.4;
}
.mainContent {
  z-index: 0;
  transition: all 0.8s ease-in-out;
  min-height: 50%;
}
.customisePanel {
  /* bottom: 0; */
  transition: all 0.5s ease-in-out;
  z-index: 5;
}

.transition {
  z-index: 10;
}

.slideUp-enter,
.slideUp-enter-active,
.slideUp-leave-active {
  bottom: -100%;
}

.fullOpacity {
  opacity: 1;
}
</style>

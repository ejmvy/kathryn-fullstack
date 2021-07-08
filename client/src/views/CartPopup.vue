<template>
  <div>
    <div v-if="windowWidth > 700" class="showArrow"></div>
    <div
      class="cartPopup overflow-hidden flex flex-col bg-green-dark"
      :class="
        windowWidth < 700
          ? 'h-screen mt-0 pb-5'
          : 'webPopup rounded-2xl absolute right-0 mt-20'
      "
    >
      <div class="absolute right-3 top-3 cursor-pointer">
        <Svg
          @click="$emit('closePopup')"
          :svgColour="svgColour"
          :svg="closePopupSvg"
        ></Svg>
      </div>
      <div
        class="flex items-center justify-between px-8 py-3 mt-8 border-b border-gray-light"
      >
        <div class="flex">
          <Svg :svgColour="'white'" :svg="cartSvg"></Svg>
          <div
            class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
          >
            {{ getCartLength }}
          </div>
        </div>
        <h5 class="text-white font-bold fontRegular">
          Total: {{ getCartTotal }}
        </h5>
      </div>

      <div class="h-2/3 overflow-y-auto pt-10 px-5 sm:px-16 md:px-32 lg:px-5">
        <h5 v-if="!getCartLength" class="text-white fontRegular">
          There are no items in your cart
        </h5>
        <div
          class="flex justify-between items-center py-4 border-b border-gray-300"
          v-for="(item, idx) in cartData"
          :key="item"
        >
          <img
            class="w-20 h-20"
            :src="
              item.imageUrlArray[0]
                ? item.imageUrlArray[0]
                : 'https://i.ibb.co/NCDk0sY/corrupt-Image.png'
            "
          />
          <div class="flex flex-col items-start">
            <label class="text-white font-bold">{{ item.name }}</label>
            <p class="text-gray-300 text-xs">{{ item.price }}</p>
            <p class="text-gray-300 text-xs">{{ item.colourSelected }}</p>
          </div>
          <div class="text-white">{{ item.qty }}</div>
          <Svg
            @click="deleteItemFromCart(item, idx)"
            :svgColour="'white'"
            :svg="binSvg"
          ></Svg>
        </div>
      </div>
      <div class="flex justify-center cartBtn">
        <router-link to="/cart" class="absolute bottom-12">
          <button
            class="btn-white btn-lrg fontRegular"
            :class="{ disable: !getCartLength }"
          >
            View Cart
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../components/Designs/SvgBase.vue";
export default {
  data() {
    return {
      cartData: [],
      cartTotal: 0,
      totalItems: 12,
      closePopupSvg: "M6 18L18 6M6 6l12 12",
      cartSvg:
        "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
      binSvg:
        "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
      svgColour: "#ccc",
      windowWidth: 0,
    };
  },

  methods: {
    deleteItemFromCart(item) {
      console.log("item to delete:", item);
      this.$store.dispatch("cart/removeFromCart", {
        item: item,
      });
      this.getCartItems();
    },
    getCartItems() {
      const items = this.$store.getters["cart/products"];
      console.log("UPDATED CART ITEMS:");
      console.log(items);
    },
  },
  computed: {
    getCartTotal() {
      return this.$store.getters["cart/totalSum"].toFixed(2);
    },
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },
  },
  created() {
    const cartItems = this.$store.getters["cart/products"];

    this.cartData = cartItems;
    this.windowWidth = window.innerWidth;
    console.log("width: " + this.windowWidth);
  },
  components: {
    Svg,
  },
};
</script>

<style scoped>
.cartPopup {
  z-index: 5;
}

.webPopup {
  width: 300px;
  height: 600px;
}

.showArrow {
  z-index: 5;
  position: absolute;
  top: 65px;
  right: 90px;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 25px solid #365a69;
}
</style>

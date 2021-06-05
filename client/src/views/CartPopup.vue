<template>
  <div
    class="cartPopup h-screen lg:absolute lg:right-0 overflow-hidden lg:w-1/4 flex flex-col bg-green-dark mt-0 pb-5"
  >
    <div class="absolute right-3 top-3 cursor-pointer">
      <img
        @click="$emit('closePopup')"
        class="w-4 h-4"
        src="https://i.ibb.co/tmmDGnL/close-x.png"
      />
    </div>
    <div
      class="flex items-center justify-between px-8 py-3 mt-8 border-b border-gray-light"
    >
      <div class="flex">
        <img class="w-5 h-5" src="https://i.ibb.co/vzdx4Vj/cart.png" />
        <div
          class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
        >
          {{ getCartLength }}
        </div>
      </div>
      <h5 class="text-white font-bold">Total: {{ getCartTotal }}</h5>
    </div>

    <div
      class="h-2/3 overflow-y-auto mt-10 md:mt-20 px-5 sm:px-16 md:px-32 lg:px-5"
    >
      <h5 v-if="!getCartLength" class="text-white">
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
        <img
          class="w-5 h-5 cursor-pointer"
          src="https://i.ibb.co/TKgDyPN/bin.png"
          @click="deleteItemFromCart(item, idx)"
        />
      </div>
    </div>
    <div class="flex justify-center cartBtn">
      <router-link to="/cart" class="absolute bottom-5">
        <button class="btn-white" :class="{ disable: !getCartLength }">
          View Cart
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: [],
      cartTotal: 0,
      totalItems: 12,
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
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
    mobileWidth() {
      return this.windowWidth <= 600;
    },
  },
  created() {
    const cartItems = this.$store.getters["cart/products"];

    this.cartData = cartItems;
  },
};
</script>

<style scoped>
.cartPopup {
  z-index: 5;
}
</style>

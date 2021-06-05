<template>
  <div class="slowShow md:bg-white">
    <div
      class="bg-white px-3 py-4 flex w-full justify-between md:justify-center items-center md:shadow-lg"
    >
      <img
        @click="closeMenu()"
        class="w-5 h-5 md:hidden transform rotate-90 curos"
        src="https://i.ibb.co/dQxfSHq/down.png"
      />
      <p class="uppercase text-sm tracking-wider">My Orders</p>
      <div class="w-5 h-5"></div>
    </div>
    <div class="bg-gray-200 w-full p-1"></div>

    <div class="p-3 md:flex md:flex-col md:w-3/4 md:m-auto">
      <div class="mt-10" v-if="!getUserOrders.length">
        <p class="text-xs text-gray-500">There are no orders to show</p>
        <button class="btn-green btn-sm mt-10">Start Shopping now!</button>
      </div>

      <div>
        <div class="w-full mt-4" v-for="order in getUserOrders" :key="order">
          <div class="flex items-center px-3">
            <div class="labelxs mr-10">Status:</div>
            <div>
              {{ order.orderStatus ? order.orderStatus : "Processing.." }}
            </div>
          </div>
          <div class="w-full h-0.5 bg-gray-200 my-2"></div>
          <div
            class="w-full mt-3 h-24 flex overflow-auto"
            :class="
              order.products.length < 3 ? 'justify-center' : 'justify-between'
            "
          >
            <div
              class="imageArea h-24 w-24 mx-2 relative"
              v-for="(product, index) in order.products.slice(0, 3)"
              :key="product"
            >
              <img class="h-24 w-24" :src="getImageUrl(product._id)" />
              <div
                @click="viewOrder(order)"
                :class="{ overlayImg: order.products.length > 3 && index == 2 }"
              >
                <div
                  v-if="order.products.length > 3 && index == 2"
                  class="flex items-center cursor-pointer"
                >
                  <div class="text-xl font-bold">+</div>
                  <div class="font-bold text-4xl">
                    {{ order.products.length - 3 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col ml-8 w-60">
            <div class="flex mt-5 items-center">
              <div class="labelxs mr-5">Total:</div>
              <p class="text-sm self-end">€ {{ order.paymentTotal }}</p>
            </div>
            <div class="flex mt-1 items-center">
              <div class="labelxs mr-5">Order No:</div>
              <p class="text-sm">{{ order.orderRef }}</p>
            </div>
            <div class="flex mt-1 items-center">
              <div class="labelxs mr-5">Order Date:</div>
              <p class="text-sm">
                {{ convertDate(order.orderDate) }}
              </p>
            </div>
            <div v-if="order.deliveredDate" class="flex mt-1 items-center">
              <div class="labelxs mr-5">Shipped Date:</div>
              <p class="text-sm">
                {{ convertDate(order.deliveredDate) }}
              </p>
            </div>
          </div>

          <button class="mt-10 btn-green btn-lrg" @click="viewOrder(order)">
            View Order
          </button>
          <div class="bg-gray-200 w-full p-1 my-5"></div>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <OrderViewPopup
        v-if="openOrder"
        :orderInfo="viewChosenOrder"
        @closePopop="closePopup"
      ></OrderViewPopup>
    </transition>
  </div>
</template>

<script>
import OrderViewPopup from "./OrderViewPopup.vue";
export default {
  data() {
    return {
      userOrders: [],
      openOrder: false,
      viewChosenOrder: {},
    };
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu", "userOrders");
    },
    closePopup() {
      this.openOrder = false;
      this.emitter.emit("hideOverlay");
    },
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
    getImageUrl(productId) {
      const products = this.$store.getters["prods/products"];
      const product = products.find((prod) => prod._id == productId);

      return product
        ? product.imageUrlArray[0]
        : "https://i.ibb.co/NCDk0sY/corrupt-Image.png";
    },
    viewOrder(order) {
      this.viewChosenOrder = order;
      this.emitter.emit("showOverlay");
      this.openOrder = true;
    },
  },
  computed: {
    getUserOrders() {
      return this.$store.getters["getUserOrders"];
    },
  },

  created() {
    let user = this.$store.getters["getUserDetails"];
    this.$store.dispatch("getUserOrders", user._id);
  },
  components: {
    OrderViewPopup,
  },
};
</script>

<style scoped>
.imageArea .overlayImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: block;
  z-index: 2;
  background: rgba(36, 116, 109, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div
    class="popupIndex h-screen w-screen fixed top-0 left-0 flex justify-center items-center"
  >
    <div
      class="bg-white w-11/12 h-4/5 md:w-4/5 lg:w-2/3 xl:w-1/2 md:h-2/3 flex flex-col rounded-sm"
    >
      <div class="w-full flex items-center border-b-4 border-gray-100 p-4">
        <Svg @click="closePopup" :svgColour="'#C4C3C5'" :svg="closeSvg"></Svg>
        <p class="ml-16 labelxs text-gray-dark">
          {{ orderInfo.orderStatus ? orderInfo.orderStatus : "In Progress.." }}
        </p>
      </div>

      <div class="flex flex-col md:flex-row h-5/6">
        <div
          class="w-full md:w-2/3 h-full overflow-auto flex flex-col md:border-r-4 border-gray-100"
        >
          <div v-for="(product, idx) in orderInfo.products" :key="idx">
            <div class="w-full flex h-36 items-center justify-center">
              <div class="w-24 h-28 mr-16">
                <img class="h-28 w-24" :src="getImageUrl(product._id)" />
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
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 h-full flex flex-col justify-between">
          <div class="">
            <div class="flex justify-between w-full">
              <div class="h-8 w-8"></div>
              <div class="uppercase text-green-dark font-bold mb-10 pt-5">
                Order Details
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 transform rotate-90 relative -top-5 right-0"
                viewBox="0 0 20 20"
                fill="#365a69"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="px-5">
              <div class="text-left">
                <label class="label-grey">Ordered: </label>
                <p class="my-2 text-sm">
                  {{ convertDate(orderInfo.orderDate) }}
                </p>
              </div>
              <div class="text-left">
                <label class="label-grey">Ref Number: </label>
                <p class="my-2" text-sm>{{ orderInfo.orderRef }}</p>
              </div>
              <div class="text-left">
                <label class="label-grey">Shipped: </label>
                <p class="my-2 text-sm">
                  {{ convertDate(orderInfo.deliveredDate) }}
                </p>
              </div>
            </div>
          </div>
          <div class="text-left px-5">
            <label class="label-grey"> Payment Total: </label>
            <p class="my-2 text-xl font-bold text-green-light text-right">
              € {{ orderInfo.cartTotal }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../Designs/SvgBase.vue";
export default {
  props: ["orderInfo"],
  data() {
    return {
      closeSvg: "M15 19l-7-7 7-7",
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopop");
    },
    getImageUrl(productId) {
      const products = this.$store.getters["prods/products"];
      const product = products.find((prod) => prod._id == productId);

      return product
        ? product.imageUrlArray[0]
        : "https://i.ibb.co/NCDk0sY/corrupt-Image.png";
    },
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
  },
  components: {
    Svg,
  },
};
</script>

<style scoped>
.popupArea {
  top: 20%;
  left: 25%;
}
</style>

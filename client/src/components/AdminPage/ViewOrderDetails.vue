<template>
  <div
    class="popupIndex w-screen h-screen fixed top-0 left-0 flex justify-center"
  >
    <div
      class="w-10/12 lg:w-2/3 xl:w-1/2 lg:m-auto h-10/12 bg-white shadow-xl m-auto rounded-md flex"
    >
      <div class="purchases">
        <div class="h-full flex flex-col justify-between">
          <table class="productArea w-full mt-6 mb-10">
            <tr>
              <th class="text-left pb-8 text-xs uppercase text-gray-400">
                Product
              </th>
              <th class="pb-8 text-xs uppercase text-gray-400">Type</th>
              <th class="pb-8 text-xs uppercase text-gray-400">Quantity</th>
              <th class="pb-8 text-xs uppercase text-gray-400">Total</th>
            </tr>
            <tbody class="w-full">
              <tr
                class=""
                v-for="(product, idx) in orderDetails.products"
                :key="idx"
              >
                <td>
                  <img class="w-20 h-20 my-1" :src="getImageUrl(product._id)" />
                </td>
                <td>
                  <p class="text-sm font-bold">{{ product.name }}</p>
                  <div class="text-xs text-gray-400">
                    {{ product.colourSelected }}
                  </div>
                </td>
                <td class="">{{ product.qty }}</td>
                <td class="text-sm">
                  € {{ (product.price * product.qty).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-between items-center">
            <p class="text-sm uppercase text-gray-500">Total</p>

            <div class="text-green-light text-2xl font-bold">
              € {{ orderDetails.cartTotal }}
            </div>
          </div>
        </div>
      </div>
      <div class="buySection bg-green-dark">
        <div class="w-full flex justify-end p-1">
          <Svg
            @click="closePopup()"
            :svgColour="svgColour"
            :svg="closePopupSvg"
          ></Svg>
        </div>
        <div
          class="relative text-left pl-3 my-5 text-white flex h-11/12 flex-col justify-between"
        >
          <div class="text-sm">
            <h5
              class="text-sm text-gray-400 uppercase mb-8 font-bold tracking-widest"
            >
              Customer Details
            </h5>
            <p class="my-2">{{ orderDetails.customer.name }}</p>
            <div>
              <label class="label-grey">Address: </label>
              <p class="my-2">
                {{ orderDetails.customer.userAddress.addressLine1 }}
              </p>
              <p class="my-2">{{ orderDetails.customer.userAddress.city }}</p>
              <p class="my-2">
                {{ orderDetails.customer.userAddress.postcode }}
              </p>
            </div>
            <div>
              <label class="label-grey">Email: </label>
              <p class="my-2">{{ orderDetails.customer.email }}</p>
            </div>
            <div>
              <label class="label-grey">Tel: </label>
              <p class="my-2">
                {{ orderDetails.customer.userAddress.phoneNumber }}
              </p>
            </div>
          </div>
          <div class="text-sm mt-10">
            <h5
              class="text-sm text-gray-400 uppercase mb-8 font-bold tracking-widest"
            >
              Order Details
            </h5>
            <div>
              <label class="label-grey">Order Ref: </label>
              <p class="my-2">{{ orderDetails.orderRef }}</p>
            </div>
            <div>
              <label class="label-grey">Ordered: </label>
              <p class="my-2">{{ convertDate(orderDetails.orderDate) }}</p>
            </div>
            <div>
              <label class="label-grey">Delivered: </label>

              <p v-if="orderDetails.deliveredDate" class="my-2">
                {{ convertDate(orderDetails.deliveredDate) }}
              </p>
              <div
                v-if="!orderDetails.deliveredDate"
                class="flex items-center mt-2"
              >
                <input type="checkbox" v-model="isChecked" />
                <p class="ml-8">Mark as Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../Designs/SvgBase.vue";
export default {
  props: ["orderDetails"],
  data() {
    return {
      isChecked: false,
      closePopupSvg: "M6 18L18 6M6 6l12 12",
      svgColour: "#ccc",
    };
  },

  methods: {
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
    closePopup() {
      console.log("checked: " + this.isChecked);
      if (this.isChecked) {
        this.$store.dispatch(
          "recentOrders/updateDeliveredStatus",
          this.orderDetails._id
        );
      }
      this.$emit("closePopup");
    },
    getImageUrl(productId) {
      const products = this.$store.getters["prods/products"];
      const product = products.find((prod) => prod._id == productId);

      return product
        ? product.imageUrlArray[0]
        : "https://i.ibb.co/NCDk0sY/corrupt-Image.png";
    },
  },
  components: {
    Svg,
  },
};
</script>

<style scoped>
.purchases {
  flex: 2;
  padding: 20px;
  padding-left: 50px;
}

.buySection {
  flex: 1;
}

.productArea {
  max-height: 500px !important;
}
</style>

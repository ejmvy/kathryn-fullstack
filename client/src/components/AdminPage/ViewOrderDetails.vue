<template>
  <div
    class="cartArea popupIndex fixed w-10/12 lg:m-auto h-10/12 bg-white shadow-xl flex"
  >
    <div class="purchases">
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
              {{ (product.price * product.qty).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex absolute bottom-5 w-1/2 items-center justify-between">
        <p class="text-sm uppercase text-gray-500">Total</p>

        <div class="text-green-light text-2xl font-bold">
          € {{ orderDetails.paymentTotal }}
        </div>
      </div>
    </div>
    <div class="buySection bg-green-dark">
      <div class="absolute right-0 flex self-end p-2">
        <img
          @click="closePopup()"
          class="w-4 h-4 cursor-pointer"
          src="https://i.ibb.co/tmmDGnL/close-x.png"
        />
      </div>
      <div
        class="relative text-left pl-3 my-10 text-white flex h-11/12 flex-col justify-between"
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
            <p class="my-2">{{ orderDetails.customer.userAddress.postcode }}</p>
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
        <div class="text-sm mt-16">
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
</template>

<script>
export default {
  props: ["orderDetails"],
  data() {
    return {
      isChecked: false,
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
};
</script>

<style scoped>
.cartArea {
  top: 10%;
  left: 10%;
}

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

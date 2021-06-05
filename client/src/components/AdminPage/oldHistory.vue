<template>
  <div style="height: 100%">
    <div
      class="flex flex-col h-full w-11/12 m-auto items-center justify-center"
    >
      <div class="w-full flex justify-between">
        <div class="w-5 h-5"></div>
        <h5 class="labelxs text-gray-500">Order history</h5>
        <img
          @click="showSearch = !showSearch"
          class="w-7 h-7 cursor-pointer hover:scale-110"
          src="https://i.ibb.co/tPpm16k/specs.png"
        />
      </div>

      <table class="w-full border-none mt-8" cellspacing="0" cellpadding="0">
        <tr class="bg-green-light text-white uppercase text-xs">
          <th>Order</th>
          <th>Recipient</th>
          <th>Ordered</th>
          <th>Status</th>
          <th>Delivered</th>
          <th>Items</th>
          <th>Total</th>
          <th class="w-6 h-6"></th>
        </tr>
        <tr v-if="showSearch" class="pt-10">
          <td>
            <input type="text" placeholder="Filter..." v-model="orderValue" />
          </td>
          <td>
            <input type="text" placeholder="Filter..." v-model="nameValue" />
          </td>
          <td>
            <input
              type="text"
              placeholder="Filter..."
              v-model="orderedDateValue"
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Filter..."
              v-model="orderStatusValue"
            />
          </td>
          <td>
            <div style="min-width: 100px"></div>
          </td>
          <td>
            <div style="min-width: 100px"></div>
          </td>
          <td>
            <div style="min-width: 50px"></div>
          </td>
        </tr>
        <tbody>
          <tr v-for="order in displayedPosts" :key="order">
            <td>#{{ order.orderRef }}</td>
            <td>{{ order.customer.name }}</td>
            <td>{{ convertDate(order.orderDate) }}</td>
            <td>{{ order.isDelivered ? "Delivered" : "In Progress" }}</td>
            <td>{{ convertDate(order.deliveredDate) }}</td>
            <td>{{ order.products.length }}</td>
            <td>{{ order.paymentTotal }}</td>
            <td>
              <img
                class="w-5 h-5 cursor-pointer"
                src="https://i.ibb.co/Ph8LWtv/view.png"
                @click="showOrderDetails(order)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end w-full absolute bottom-16 right-10">
        <div
          class="p-3 w-90 shadow-xl rounded-full flex justify-end items-center"
        >
          <svg
            v-if="page != 1"
            @click="page--"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#627F8A"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <div class="mx-5 flex">
            <button
              class="mx-3 border-transparent w-10 h-10 font-bold"
              :class="{
                'bg-green-light rounded-full text-white': page == pageNumber,
              }"
              v-for="(pageNumber, idx) in pages.slice(page - 1, page + 5)"
              :key="idx"
              @click="page = pageNumber"
            >
              {{ pageNumber }}
            </button>
          </div>
          <svg
            v-if="page < pages.length"
            @click="page++"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#627F8A"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
      <transition name="slide-up">
        <ViewOrderDetails
          v-if="showOrderPanel"
          :orderDetails="viewOrder"
          @closePopup="closeShowOrderDetails"
        ></ViewOrderDetails>
      </transition>
    </div>
  </div>
</template>

<script>
import ViewOrderDetails from "./ViewOrderDetails.vue";
import axios from "axios";

export default {
  data: () => ({
    orders: [],
    ordersLength: 1,
    page: 1,
    perPage: 5,
    pages: [],
    showSearch: false,
    viewOrder: {},
    showOrderPanel: false,

    orderValue: "",
    nameValue: "",
    orderedDateValue: "",
    orderStatusValue: "",
  }),

  methods: {
    showOrderDetails(order) {
      this.viewOrder = order;
      this.emitter.emit("showOverlay");
      this.showOrderPanel = true;
    },
    closeShowOrderDetails() {
      this.emitter.emit("hideOverlay");
      this.showOrderPanel = false;
    },
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
    setPages() {
      let numberOfPages = Math.ceil(this.ordersLength / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(orders) {
      this.ordersLength = orders.length;
      // this.setPages();
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return orders.slice(from, to);
    },
    loadData() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}orders/history`)
        .then((data) => {
          this.orders = data.data;
          this.ordersLength = this.orders.length;
        });
    },
  },
  computed: {
    displayedPosts() {
      let ordersToDisplay = [];

      if (this.nameValue) {
        ordersToDisplay = this.orders.filter((order) => {
          return order.customer.name.toLowerCase().includes(this.nameValue);
        });
      } else {
        ordersToDisplay = this.orders;
      }

      return this.paginate(ordersToDisplay);
    },
  },

  watch: {
    orders() {
      this.setPages();
    },
  },
  mounted() {
    this.loadData();
    this.emitter.on("reloadData", () => {
      console.log("reload");
      this.loadData();
    });
  },
  components: {
    ViewOrderDetails,
  },
};
</script>

<style scoped>
table td {
  font-size: 13px;
  padding: 22px 0;
  border-bottom: 1px solid rgb(228, 227, 227);
}

table th {
  padding: 10px 0 10px 0;
}

table tbody tr:hover {
  background: rgb(234, 235, 235);
}

input {
  border: none;
  border-bottom: 1px solid #365a69;
  background: none;
  padding: 8px 0;
  width: 120px;
  /* margin: 0 10px 0 10px; */
}

input:focus {
  outline: none;
}

/* https://codepen.io/bilalo05/pen/oNgrKXo?editors=1010 */
</style>

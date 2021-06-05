<template>
  <table class="w-full border-none mt-8 mb-16" cellspacing="0" cellpadding="0">
    <thead class="bg-green-light text-white uppercase text-xs">
      <th class="py-3" v-for="th in tableHeader" :key="th">
        <div class="flex justify-center items-center">
          <span>{{ th.text }}</span>
        </div>
      </th>
    </thead>
    <tbody>
      <tr v-for="order in tableData" :key="order">
        <td>{{ order.orderRef }}</td>
        <td>{{ order.customer.name }}</td>
        <td>{{ convertDate(order.orderDate) }}</td>
        <td>{{ order.orderStatus }}</td>
        <td>{{ convertDate(order.deliveredDate) }}</td>
        <td>{{ order.products.length }}</td>
        <td>€ {{ order.paymentTotal }}</td>
        <td>
          <img
            class="w-5 h-5 cursor-pointer ml-3"
            src="https://i.ibb.co/Ph8LWtv/view.png"
            @click="$emit('showOrderDetails', order)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table Data",
  props: {
    columns: Array,
    entries: Array,
  },
  methods: {
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
  },
  computed: {
    tableHeader() {
      return this.columns || [];
    },
    tableData() {
      return this.entries || [];
    },
  },
};
</script>

<style scoped>
table td {
  font-size: 13px;
  padding: 22px 0;
  border-bottom: 1px solid rgb(228, 227, 227);
}
</style>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
</svg>

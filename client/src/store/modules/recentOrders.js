import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
    };
  },
  mutations: {
    setOrders(state, orderData) {
      state.orders = orderData;
    },
    updateDeliveredStatus(state, orderId) {
      try {
        const order = state.orders.find((order) => order._id === orderId);
        if (order) order.isDelivered = true;
        console.log("updated order: ");
        console.log(order);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
  },
  actions: {
    async callOrdersAPI({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}orders/recent`)
        .then((result) => {
          commit("setOrders", result.data);
        });
    },
    updateDeliveredStatus(context, orderId) {
      context.commit("updateDeliveredStatus", orderId);
    },
  },
  getters: {
    getOrders: (state) => state.orders,
  },
};

import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      total: 0,
    };
  },
  mutations: {
    setProducts(state, productData) {
      state.products = productData;
      state.total = state.products.length;
    },
  },
  actions: {
    async callProductsApi({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}products/`)
        .then((result) => {
          commit("setProducts", result.data);
          console.log("PRODCUTS FROM STORE");
          console.log(result.data);
        });
    },
  },
  getters: {
    products: (state) => state.products,
    productTotal: (state) => state.total,
  },
};

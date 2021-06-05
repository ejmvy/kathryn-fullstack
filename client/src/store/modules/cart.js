export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
      paymentStep: 0,
    };
  },

  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;
      const prodId = payload._id;

      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === productData.colourSelected
      );

      if (productInCartIdx >= 0) {
        state.items[productInCartIdx].qty =
          state.items[productInCartIdx].qty + payload.qty;
      } else {
        state.items.push(productData);
      }

      state.qty += payload.qty;
      state.total += productData.price * payload.qty;

      console.log("new cart: ", state.items);

      sessionStorage.setItem("cartDetails", JSON.stringify(state.items));
    },
    removeProductFromCart(state, payload) {
      const prodId = payload._id;

      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );
      const productInCart = state.items.find(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      state.items.splice(productInCartIdx, 1);
      state.qty -= productInCart.qty;
      state.total -= productInCart.price * productInCart.qty;

      sessionStorage.setItem("cartDetails", JSON.stringify(state.items));
    },

    increaseQty(state, payload) {
      const prodId = payload._id;
      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      state.items[productInCartIdx].qty++;
      state.qty++;
      state.total += state.items[productInCartIdx].price;

      sessionStorage.setItem("cartDetails", JSON.stringify(state.items));
    },
    decreaseQty(state, payload) {
      const prodId = payload._id;
      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      state.items[productInCartIdx].qty--;
      state.qty--;
      state.total -= state.items[productInCartIdx].price;

      sessionStorage.setItem("cartDetails", JSON.stringify(state.items));
    },

    increasePaymentStep(state) {
      state.paymentStep++;
    },
    setPaymentStep(state, payload) {
      state.paymentStep = payload;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.qty = 0;
      state.paymentStep = 0;

      sessionStorage.removeItem("cartDetails");
    },
    updateCartFromStorage(state, cartDetails) {
      state = cartDetails;
    },
  },

  actions: {
    addToCart(context, payload) {
      const prodId = payload.id ? payload.id : payload._id;
      const products = context.rootGetters["prods/products"];
      try {
        const product = products.find((prod) => prod._id == prodId);
        const newProduct = { ...product };
        newProduct.colourSelected = payload.colourSelected;
        newProduct.qty = payload.qty ? payload.qty : 1;
        context.commit("addProductToCart", newProduct);
      } catch (e) {
        console.log("api error", e);
      }
    },
    removeFromCart(context, payload) {
      context.commit("removeProductFromCart", payload.item);
    },
    increaseQty(context, payload) {
      context.commit("increaseQty", payload);
    },
    decreaseQty(context, payload) {
      context.commit("decreaseQty", payload);
    },
    increasePaymentStep(context) {
      context.commit("increasePaymentStep");
    },
    setPaymentStep(context, payload) {
      context.commit("setPaymentStep", payload);
    },
    clearCart(context) {
      context.commit("clearCart");
    },
    clearCartTotal(context) {
      context.commit("clearCart");
    },
    updateCartFromStorage(context, userCart) {
      context.commit("updateCartFromStorage", userCart);
    },
  },
  getters: {
    products: (state) => state.items,
    totalSum: (state) => state.total,
    quantity: (state) => state.qty,
    paymentStep: (state) => state.paymentStep,
  },
};

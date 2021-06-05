<template>
  <div class="bg-white mt-3 pb-5">
    <h5 class="uppercase text-xs py-4">Confirm Order</h5>

    <div class="w-full flex flex-col p-3">
      <h5 class="labelxs self-start">My Bag</h5>
      <div class="flex w-full overflow-auto py-4">
        <div class="" v-for="item in cartItems" :key="item">
          <img class="pic px-1 w-20 h-16" :src="item.imageUrlArray[0]" />
        </div>
      </div>
      <div class="flex w-full justify-between border-t border-gray-300 pt-3">
        <div class="text-xs">{{ getTotalItems }} items</div>
        <div class="text-xs">€ {{ getItemsAmount }}</div>
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex flex-col p-3">
      <h5 class="labelxs self-start">Email Address</h5>
      <div class="text-xs self-start pt-5">{{ userDetails.email }}</div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>
    <div class="w-full flex flex-col p-3">
      <div class="flex justify-between">
        <h5 class="labelxs">Shipping Address</h5>
        <img
          @click="changeAddress()"
          class="w-4 h-4 cursor-pointer"
          src="https://i.ibb.co/N6vxTqj/pencil-green.png"
        />
      </div>
      <div class="text-xs self-start pt-5">
        {{ userDetails.userAddress.firstName }}
        {{ userDetails.userAddress.lastName }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.addressLine1 }}
        {{ userDetails.userAddress.addressLine2 }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.city }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.postCode }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.country }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.phoneNumber }}
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex flex-col p-3">
      <h5 class="labelxs self-start">Delivery Info</h5>
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <div class="text-xs self-start pt-5">
            Shipped within 3-5 Working Days
          </div>
          <div class="text-xs self-start pt-2">Standard Delivery</div>
          <div class="text-xs self-start pt-2">Expected date: 1 - 2 weeks</div>
        </div>
        <div class="text-sm">€ {{ shippingFee }}</div>
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex justify-between items-center p-3">
      <div class="flex flex-col text-left">
        <h5 class="labelxs">Complete Order</h5>
        <p class="text-xs text-gray-500 pt-3">Pay with Stripe</p>
      </div>
      <div class="font-bold">€ {{ getTotalAmount }}</div>
    </div>
    <div class="w-full p-3">
      <div id="cardElement"></div>
    </div>
    <button class="btn-green btn-lrg mt-4" @click="processPayment()">
      <div class="spinner hidden" id="spinner"></div>
      <span id="button-text">Confirm</span>
    </button>
    <p id="card-error"></p>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
export default {
  data() {
    return {
      cartItems: [],
      userDetails: {},
      shippingFee: 6.99,
      totalAmount: 0,
      stripe: {},
      cardElement: {},
      paymentComplete: false,
    };
  },

  methods: {
    loading(isLoading) {
      if (isLoading) {
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
      } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
      }
    },
    async processPayment() {
      const confirmOrder = {
        userId: this.userDetails._id,
        cartTotal: this.getItemsAmount,
        paymentTotal: this.getTotalAmount,
        products: this.cartItems,
      };

      console.log("payment obj:");
      console.log(confirmOrder);

      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        "card",
        this.cardElement,
        {
          billing_details: {
            name: "EJ McVey",
          },
        }
      );

      if (error) {
        alert(error);
        console.log("error1", error);
      } else {
        confirmOrder.payment_method_id = paymentMethod.id;

        axios
          .post(
            `${process.env.VUE_APP_BASE_URL}payments/create-payment-intent`,
            confirmOrder
          )
          .then((response) => {
            console.log("payment response");
            console.log(response);

            this.payWithCard(
              this.stripe,
              this.cardElement,
              response.data.clientSecret,
              confirmOrder
            );
          })
          .catch((error) => {
            console.log("error", error);
            alert(error);
          });
      }
    },
    payWithCard(stripe, card, clientSecret, confirmOrder) {
      this.loading(true);
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              address: {
                city: this.userDetails.userAddress.city,
                country: "IE",
                line1: this.userDetails.userAddress.addressLine1,
                line2: this.userDetails.userAddress.addressLine2,
                postal_code: this.userDetails.userAddress.postcode,
              },
              email: this.userDetails.email,
              name: this.userDetails.name,
              phone: this.userDetails.phoneNumber,
            },
          },
        })
        .then(
          function (result) {
            if (result.error) {
              this.loading(false);
              // Show error to your customer
              this.showError(result.error.message);
              console.log("error 3", result.error);
            } else {
              this.loading(false);
              // The payment succeeded!
              console.log("successsss", confirmOrder);
              console.log(result);
              this.sendOrderToDB(confirmOrder);
            }
          }.bind(this)
        );
    },
    sendOrderToDB(confirmOrder) {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}orders`, confirmOrder)
        .then((data) => {
          console.log("payment taken");
          let newOrder = data.data;
          console.log(newOrder);

          this.$store.dispatch("cart/clearCart");
          this.$store.dispatch("cart/setPaymentStep", 3);
          this.$emit("orderComplete", newOrder);

          // this.updateUserDetails();

          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeAddress() {
      console.log("change address");
      this.$store.dispatch("cart/setPaymentStep", 1);
    },
    // updateUserDetails() {
    //   const key = this.$store.getters["getUserKey"];
    //   console.log("user key: " + key);
    //   axios
    //     .get(`${process.env.VUE_APP_BASE_URL}users/me`, {
    //       headers: {
    //         "x-auth-token": key,
    //       },
    //     })
    //     .then((data) => {
    //       data.userKey = key;
    //       this.$store.dispatch("login", data.data);
    //     })
    //     .catch((e) => {
    //       console.log(`err ${e}`);
    //     });
    // },
    // Show the customer the error from Stripe if their card fails to charge
    showError(errorMsgText) {
      this.loading(false);
      var errorMsg = document.querySelector("#card-error");
      errorMsg.textContent = errorMsgText;
      setTimeout(function () {
        errorMsg.textContent = "";
      }, 4000);
    },
  },

  computed: {
    getTotalItems() {
      return this.$store.getters["cart/quantity"];
    },
    getItemsAmount() {
      return this.$store.getters["cart/totalSum"].toFixed(2);
    },
    getTotalAmount() {
      const itemsAmount = parseFloat(this.$store.getters["cart/totalSum"]);

      return (parseFloat(this.shippingFee) + itemsAmount).toFixed(2);
    },
  },

  async mounted() {
    this.stripe = await loadStripe(
      "pk_test_51IsWpaAPVQ6hfOWZhtQaeXAKkvTKreGX7EJEL1RDVle6p1s0LIkOwIzyYtkfJ2UqFAW71Ticdo441qhEO0woWPcF0031xNl9Oo"
    );

    const elements = this.stripe.elements();
    this.cardElement = elements.create("card", {
      classes: {
        base:
          "bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 outline-none text-gray-700 p-3 leading-8",
      },
    });

    this.cardElement.mount("#cardElement");
  },

  created() {
    this.cartItems = this.$store.getters["cart/products"];
    this.userDetails = this.$store.getters["getUserDetails"];
  },
};
</script>

<style scoped>
.pic {
  min-width: 40px;
}

.hidden {
  display: none;
}
#card-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}
@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

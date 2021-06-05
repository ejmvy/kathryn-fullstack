<template>
  <div
    class="absolute w-full h-full flex justify-center items-center overflow-hidden bg-green-light"
  >
    <WebLogin
      v-if="!isMobile"
      @loginUser="loginUserFn"
      @registerNewUser="registerUser"
    ></WebLogin>

    <!-- MOBILE LOGIN -->
    <MobileLogin
      v-if="isMobile"
      @loginUser="loginUserFn"
      @registerNewUser="registerUser"
    ></MobileLogin>
  </div>
</template>

<script>
import WebLogin from "../components/Designs/WebLogin.vue";
import MobileLogin from "../components/Designs/MobileLogin.vue";
import axios from "axios";
export default {
  data() {},
  methods: {
    loginUserFn(loginUser) {
      this.getUserAuthKey(loginUser, "login");
    },

    registerUser(newUser) {
      console.log("REGI:  ", newUser);

      axios
        .post(`${process.env.VUE_APP_BASE_URL}users`, newUser)
        .then((data) => {
          const registeredUser = data.data;
          this.$store.dispatch("login", registeredUser);

          delete newUser["name"];
          this.getUserAuthKey(newUser, "register");

          const cartProcess = this.$store.getters["cart/paymentStep"];

          let userName = registeredUser.name.split(" ")[0];
          this.emitter.emit("showNotification", {
            state: true,
            message: `Welcome ${userName} !`,
          });

          if (cartProcess > 0) {
            return this.$router.push("/checkout");
          } else {
            this.$router.push("/userprofile");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
    getUserAuthKey(userDetails, type) {
      fetch(`${process.env.VUE_APP_BASE_URL}auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userDetails),
        mode: "cors",
      })
        .then((res) => {
          const resp = res.text();
          return resp;
        })
        .then((key) => {
          this.$store.dispatch("setKey", key);
          if (type == "login") {
            this.getUserDetails(key);
          }
          return key;
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    getUserDetails(key) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}users/me`, {
          headers: {
            "x-auth-token": key,
          },
        })
        .then((res) => {
          const data = res.data;
          data.userKey = key;
          this.$store.dispatch("login", data);

          const cartProcess = this.$store.getters["cart/paymentStep"];

          let userName = data.name.split(" ")[0];
          this.emitter.emit("showNotification", {
            state: true,
            message: `Welcome Back ${userName} !`,
          });

          if (cartProcess > 0) {
            if (data.userAddress) {
              this.$store.dispatch("cart/setPaymentStep", 2);
            }
            return this.$router.push("/checkout");
          } else {
            this.$router.push("/userprofile");
          }
        })
        .catch((err) => {
          console.log(`Err: ${err}`);
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 600;
    },
  },
  components: {
    WebLogin,
    MobileLogin,
  },
};
</script>

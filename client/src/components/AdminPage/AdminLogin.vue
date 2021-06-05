<template>
  <div class="w-full h-screen flex bg-white">
    <div class="imageArea w-1/3 h-screen">
      <router-link to="/">
        <div
          class="logo text-white text-4xl absolute top-3 left-8 bg-green-dark"
        >
          KC
        </div>
      </router-link>
    </div>
    <div class="flex w-2/3 flex-col justify-center items-center">
      <div class="absolute top-2 right-2">
        Back to
        <router-link to="/" class="text-green-light underline font-black"
          >Home</router-link
        >
      </div>
      <div class="w-2/3">
        <div class="elementSlideUp">
          <h5 class="text-4xl text-left mb-4">Log In</h5>
          <p class="text-left text-gray-500 mb-12 text-xs">
            Enter your details to access the Admin Panel
          </p>
        </div>
        <div class="flex flex-col elementSlideUp2">
          <div class="label-grey self-start mb-2">Email</div>
          <input
            id="emailInput"
            class="adminLoginInput"
            v-model="userEmail"
            ref="email"
          />
        </div>
        <div class="flex flex-col mt-8 elementSlideUp3">
          <div class="label-grey self-start mb-2">Password</div>
          <div>
            <input
              id="passwordInput"
              class="adminLoginInput w-full"
              v-model="userPassword"
              type="password"
            />

            <transition name="fade-button">
              <span class="viewPassword cursor-pointer">
                <Svg
                  v-if="!viewUserPassword"
                  @click="viewPassword()"
                  :svgColour="svgColour"
                  :svg="viewPasswordSvg"
                ></Svg>

                <Svg
                  v-else
                  :svg="hidePasswordSvg"
                  :svgColour="svgColour"
                  @click="viewPassword()"
                ></Svg>
              </span>
            </transition>
          </div>
          <p class="self-end text-xs text-green-light" @click="sendPassword()">
            Forgot Password?
          </p>
        </div>

        <button
          v-on:click="checkUserAuth"
          class="btn-green btn-lrg mt-10 elementSlideUp3"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Svg from "../Designs/SvgBase.vue";
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
      viewUserPassword: false,
      viewPasswordSvg:
        "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
      hidePasswordSvg:
        "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      svgColour: "black",
    };
  },
  methods: {
    checkUserAuth() {
      if (!this.userEmail || !this.userPassword) {
        return this.emitter.emit("showNotification", {
          state: false,
          title: "Ooops!",
          message: "Some information is missing",
        });
      }
      // first do call to AUTH api to check user is correct. Receive token
      // then check with token if user is Admin.

      axios
        .post(`${process.env.VUE_APP_BASE_URL}auth`, {
          email: this.userEmail,
          password: this.userPassword,
        })
        .then((key) => {
          console.log("key" + key.data);
          this.checkAdminDetails(key.data);
        })
        .catch((error) => {
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: `${error}`,
          });
        });
    },
    checkAdminDetails(key) {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}users/me`, {
          headers: {
            "x-auth-token": key,
          },
        })
        .then((res) => {
          console.log("admin: ", res.data);
          let data = res.data;
          if (data.isAdmin) {
            this.$store.dispatch("setKey", key);
            this.$store.dispatch("login", data);

            let userName = data.name.split(" ")[0];
            this.emitter.emit("showNotification", {
              state: true,
              message: `Welcome ${userName} !`,
            });
          } else {
            this.emitter.emit("showNotification", {
              state: false,
              title: "Ooops!",
              message: "User not recognised",
            });
          }
        })
        .catch(() => {
          this.emitter.emit("showNotification", {
            state: false,
            message: `${key}`,
          });
        });
    },
    viewPassword() {
      const pass = document.getElementById("passwordInput");

      this.viewUserPassword = !this.viewUserPassword;

      return (pass.type = this.viewUserPassword ? "text" : "password");
    },
    sendPassword() {
      console.log("send new password");
    },
  },
  computed: {
    detailsEntered() {
      return this.userEmail && this.userPassword;
    },
  },
  created() {
    // this.$refs.email.focus();
    const reff = this.$refs.email;

    console.log("reff: ", reff);
  },
  components: {
    Svg,
  },
};
</script>

<style scoped>
.imageArea {
  background: black;
  overflow: hidden;
  background: rgb(54, 90, 105);
  background: linear-gradient(
    90deg,
    rgba(54, 90, 105, 1) 0%,
    rgba(54, 90, 105, 1) 100%
  );
}
.leftImage {
  object-fit: cover;
  opacity: 0.4;
}

input {
  transition: all 0.3s ease-in-out;
}

.passwordIcon {
  transition: all 0.2s ease-in-out;
}

.fullOpacity {
  opacity: 1;
}

.viewPassword {
  z-index: 2;
  position: relative;
  float: right;
  right: 10px;
  top: -35px;
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}
.fade-button-enter-active {
  transition: opacity 0.6s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.6s ease-in;
}
.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
</style>

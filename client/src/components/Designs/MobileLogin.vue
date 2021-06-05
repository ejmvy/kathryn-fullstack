<template>
  <div class="h-screen w-full overflow-hidden bg-green-light">
    <router-link to="/">
      <Svg
        class="absolute left-0 m-2"
        :svgColour="'white'"
        :svg="homeSvg"
      ></Svg>
    </router-link>
    <div
      class="flex flex-col justify-around items-center text-white w-full h-4/5 pt-6"
      v-if="!toLogin"
    >
      <img class="w-20 h-20" src="https://i.ibb.co/wBkvvKz/owl.png" />
      <form
        class="flex items-center justify-center flex-col h-full w-4/5 text-center px-0"
      >
        <h5 class="text-white uppercase">Create Account</h5>
        <input
          class="loginInput mobileInput"
          placeholder="Name"
          v-model="newUser.name"
        />
        <input
          class="loginInput mobileInput"
          placeholder="Email"
          v-model="newUser.email"
        />
        <div class="w-full">
          <input
            id="passwordInput"
            class="loginInput mobileInput"
            placeholder="Password"
            v-model="newUser.password"
            type="password"
          />
          <transition name="fade-button">
            <span class="viewPassword cursor-pointer">
              <Svg
                @click="viewPassword()"
                v-if="!viewUserPassword"
                :svgColour="'#aaaaaa'"
                :svg="showPasswordSvg"
              ></Svg>
              <PasswordHideSvg v-else @click="viewPassword()"></PasswordHideSvg>
            </span>
          </transition>
        </div>
        <button
          class="btn-full-white btn-lrg"
          @click.prevent="registerUserFn"
          :class="{ disable: informationComplete }"
        >
          Sign Up
        </button>
      </form>
      <div class="otherRoute">
        <h5 class="text-xs uppercase text-green-dark mt-5">
          Already have an Account?
        </h5>
        <button
          class="btn-green btn-sm mt-3"
          id="signIn"
          @click="toLogin = !toLogin"
        >
          Sign In
        </button>
      </div>
    </div>
    <div
      class="flex flex-col justify-around items-center text-white w-full h-4/5 pt-6"
      v-if="toLogin"
    >
      <img class="w-20 h-20" src="https://i.ibb.co/wBkvvKz/owl.png" />
      <form
        class="flex items-center justify-center flex-col h-full w-4/5 text-center px-0 text-white"
      >
        <h5 class="text-white uppercase">Sign in</h5>
        <input
          class="loginInput mobileInput"
          placeholder="Email"
          v-model="loginUser.email"
        />
        <div class="w-full">
          <input
            id="passwordInput"
            class="loginInput mobileInput"
            placeholder="Password"
            v-model="loginUser.password"
            type="password"
          />
          <transition name="fade-button">
            <span class="viewPassword cursor-pointer">
              <Svg
                @click="viewPassword()"
                v-if="!viewUserPassword"
                :svgColour="'#aaaaaa'"
                :svg="showPasswordSvg"
              ></Svg>
              <PasswordHideSvg v-else @click="viewPassword()"></PasswordHideSvg>
            </span>
          </transition>
        </div>
        <button
          @click.prevent="loginUserFn"
          class="btn-full-white btn-lrg"
          :class="{ disable: loginComplete }"
        >
          Sign In
        </button>
      </form>
      <div class="otherRoute">
        <h5 class="text-xs uppercase mt-5 text-green-dark">New Friend?</h5>
        <button
          class="btn-green btn-sm mt-3"
          id="signIn"
          @click="toLogin = !toLogin"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordHideSvg from "./PasswordHideSvg.vue";
import Svg from "../Designs/SvgBase.vue";

export default {
  data() {
    return {
      homeSvg:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      showPasswordSvg:
        "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
      toLogin: true,
      toRegister: false,
      newUser: {
        name: "",
        email: "",
        password: "",
      },
      loginUser: {
        email: "",
        password: "",
      },
      viewUserPassword: false,
    };
  },
  methods: {
    signInButton() {
      console.log("Sign in!");
      const container = this.$refs.containerRef;
      this.viewUserPassword = false;
      this.newUser.password = "";
      container.classList.remove("right-panel-active");
    },
    signUpButton() {
      console.log("Sign Up!");
      const container = this.$refs.containerRef;
      this.viewUserPassword = false;
      this.loginUser.password = "";
      container.classList.add("right-panel-active");
    },
    viewPassword() {
      let pass = document.getElementById("passwordInput");

      this.viewUserPassword = !this.viewUserPassword;

      return (pass.type = this.viewUserPassword ? "text" : "password");
    },

    viewPassword2() {
      let pass = document.getElementById("passwordInput2");

      this.viewUserPassword = !this.viewUserPassword;

      return (pass.type = this.viewUserPassword ? "text" : "password");
    },

    registerUserFn() {
      this.$emit("registerNewUser", this.newUser);
    },

    loginUserFn() {
      this.$emit("loginUser", this.loginUser);
    },
  },
  computed: {
    informationComplete() {
      if (this.newUser.name && this.newUser.email && this.newUser.password) {
        return false;
      }
      return true;
    },
    loginComplete() {
      if (this.loginUser.email && this.loginUser.password) {
        return false;
      }
      return true;
    },
  },

  components: {
    Svg,
    PasswordHideSvg,
  },
};
</script>

<style scoped>
span {
  font-size: 12px;
}
.viewPassword {
  z-index: 2;
  position: relative;
  float: right;
  right: 10px;
  top: -35px;
}

.otherRoute {
  height: 400px;
  width: 140%;
  border-radius: 50%;
  background: white;
  color: #365a69;
  padding-top: 10px;
  position: absolute;
  overflow: hidden;
  bottom: -40%;
}
</style>

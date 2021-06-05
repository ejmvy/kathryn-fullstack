<template>
  <div class="container" id="container" ref="containerRef">
    <div class="form-container sign-up-container bg-green-dark text-white">
      <router-link to="/">
        <Svg
          class="absolute right-0 m-3"
          :svgColour="'#aaaaaa'"
          :svg="homeSvg"
        ></Svg>
      </router-link>
      <form
        class="bg-white flex items-center justify-center flex-col h-full text-center px-10"
      >
        <h5 class="uppercase text-gray-400 font-bold tracking-widest">
          Create Account
        </h5>
        <input
          class="loginInput webInput"
          placeholder="Name"
          v-model="newUser.name"
        />
        <input
          class="loginInput webInput"
          placeholder="Email"
          v-model="newUser.email"
        />
        <div class="w-full">
          <input
            id="passwordInput"
            class="loginInput webInput"
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
          class="btn-green btn-lrg mt-10"
          @click.prevent="registerUserFn"
          :class="{ disable: informationComplete }"
        >
          Sign Up
        </button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <router-link to="/">
        <Svg
          class="absolute left-0 m-3"
          :svgColour="'#aaaaaa'"
          :svg="homeSvg"
        ></Svg>
      </router-link>
      <form
        class="bg-white flex items-center justify-center flex-col h-full text-center px-10"
      >
        <h5 class="text-gray-600 uppercase font-bold tracking-widest">
          Sign in
        </h5>
        <input
          class="loginInput webInput"
          placeholder="Email"
          v-model="loginUser.email"
        />
        <div class="w-full">
          <input
            id="passwordInput2"
            class="loginInput webInput"
            placeholder="Password"
            v-model="loginUser.password"
            type="password"
          />
          <transition name="fade-button">
            <span class="viewPassword cursor-pointer">
              <Svg
                @click="viewPassword2()"
                v-if="!viewUserPassword"
                :svgColour="'#aaaaaa'"
                :svg="showPasswordSvg"
              ></Svg>
              <PasswordHideSvg
                v-else
                @click="viewPassword2()"
              ></PasswordHideSvg>
            </span>
          </transition>
        </div>
        <button
          @click.prevent="loginUserFn"
          class="btn-green btn-lrg mt-10"
          :class="{ disable: loginComplete }"
        >
          Sign In
        </button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h5 class="uppercase pb-10 text-lg font-bold tracking-widest">
            Already have an Account?
          </h5>
          <p>Click here to login</p>
          <button
            class="btn-white btn-lrg mt-10"
            id="signIn"
            @click="signInButton"
          >
            Sign In
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h5 class="uppercase pb-10 text-lg font-bold tracking-widest">
            New Friend?
          </h5>
          <p>Click here to register</p>
          <button
            class="btn-white btn-lrg mt-10"
            id="signUp"
            @click.prevent="signUpButton"
          >
            Sign Up
          </button>
        </div>
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

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #365a69;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel p {
  color: white;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>

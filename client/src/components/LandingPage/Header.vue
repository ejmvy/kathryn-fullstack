<template>
  <header
    class="w-full flex justify-between items-center py-3 px-7"
    :class="{ 'shadow-lg': addShadow }"
  >
    <router-link to="/" :class="{ navLogo: hamburgerOpen }">
      <p
        class="logo text-green-light text-4xl sm:text-5xl"
        :class="{ navLogo: hamburgerOpen }"
      >
        KC
      </p>
    </router-link>

    <div class="flex">
      <div class="flex">
        <svg
          @click="openCart()"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 cartIcon cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#627F8A"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <div
          v-if="getCartLength"
          class="w-5 h-5 text-xs flex items-center justify-center bg-green-light rounded-full text-white font-bold relative -top-2"
        >
          {{ getCartLength }}
        </div>
      </div>

      <div
        class="hamburger"
        @click="openNavPanel"
        :class="hamburgerOpen ? 'hamburgerOpen' : ''"
      >
        <div class="hamburger-line hamburger-line-first"></div>
        <div class="hamburger-line hamburger-line-middle"></div>
        <div class="hamburger-line hamburger-line-last"></div>
      </div>

      <transition name="fall-down">
        <nav
          v-if="openNav"
          class="absolute top-0 left-0 w-screen h-screen flex flex-col items-center bg-black-dark opacity-80 leading-5 text-2xl text-white pt-32"
        >
          <router-link to="/">
            <li>Home</li>
          </router-link>
          <router-link to="/shop">
            <li>Shop</li>
          </router-link>
          <router-link :to="checkLoggedIn ? '/userprofile' : '/login'">
            <li>My Account</li>
          </router-link>
          <router-link to="#">
            <li>Gallery</li>
          </router-link>
          <router-link to="/contact">
            <li>Contact</li>
          </router-link>
        </nav>
      </transition>
      <transition name="slide">
        <div
          v-if="cartOpen"
          class="cartImport absolute top-0 right-0 w-screen h-screen"
        >
          <CartPopup @closePopup="openCart()"></CartPopup>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import CartPopup from "../../views/CartPopup.vue";
export default {
  props: ["addShadow"],
  data() {
    return {
      cartOpen: false,
      openNav: false,
      hamburgerOpen: false,
    };
  },

  methods: {
    openCart() {
      this.cartOpen = !this.cartOpen;
    },
    showUser() {
      // console.log(`user logged: `, this.$store.state.user);
    },
    openNavPanel() {
      this.openNav = !this.openNav;
      this.hamburgerOpen = !this.hamburgerOpen;
    },
  },
  computed: {
    checkLoggedIn() {
      console.log(`LOGGED IN: ${this.$store.getters.isAuthenticated}`);
      return this.$store.getters.isAuthenticated;
    },
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },
  },
  components: {
    CartPopup,
  },
};
</script>

<style scoped>
nav {
  transition: all 0.5s ease-in-out;
  z-index: 3;
}
nav li {
  list-style-type: none;
  font-family: "Playfair Display SC", serif;
  line-height: 4rem;
  padding-bottom: 16px;
  transition: color 0.3s ease;
  cursor: pointer;
  opacity: 0;
  border-bottom: 1px solid transparent;
  animation: slide_up_img 0.9s ease 1.5s forwards;
}

li:hover {
  border-bottom: 1px solid #50ccc7;
  color: #50ccc7;
}

header {
  z-index: 1;
}

.navLogo {
  z-index: 10;
  color: #d0e8e2;
}

/* CART POPUP STYLES */
.cartImport {
  z-index: 5;
  transition: all 0.5s ease-in-out;
}

.fall-down-enter,
.fall-down-enter-active,
.fall-down-leave-active {
  top: -100%;
}

.slide-enter,
.slide-enter-active,
.slide-leave-active {
  right: -100%;
}

/* HAMBURGER BAR  */

.hamburger {
  margin-left: 20px;
  /* padding: 2px; */
  padding-top: 6px;

  height: 1.8rem;
  width: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
  /* border: 1px solid red; */
}

.hamburger:hover {
  cursor: pointer;
}

.hamburgerOpen {
  z-index: 10;
}

.hamburger-line {
  height: 0.18rem;
  width: 80%;
  background: #627f8a;
  transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
    opacity 300ms linear;
}

.hamburgerOpen .hamburger-line-first {
  transform: translate(0, 9px) rotate(45deg);
  background: #d0e8e2;
  width: 100%;
}

.hamburgerOpen .hamburger-line-middle {
  opacity: 0;
}

.hamburgerOpen .hamburger-line-last {
  transform: translate(0, -11px) rotate(-45deg);
  background: #d0e8e2;
  width: 100%;
}

@keyframes slide_up_img {
  0% {
    transform: translateY(250px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

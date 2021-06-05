<template>
  <div id="indexMain">
    <div :class="{ overlay: showOverlay }" id="indexMain"></div>
    <transition name="appear">
      <div v-if="showNotification" class="noteTransition">
        <Notification :notificationObj="noteObjet"></Notification>
      </div>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Notification from "./components/Designs/Notification.vue";
export default {
  name: "App",
  data() {
    return {
      showNotification: "",
      noteObjet: {},
      showOverlay: false,
    };
  },
  async created() {
    await this.$store.dispatch("prods/callProductsApi");

    // update user logged in details
    const isLogged = localStorage.getItem("isLoggedIn");
    console.log("logged: " + isLogged);
    if (isLogged) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      console.log("user: ", userDetails);
      this.$store.dispatch("login", userDetails);
      this.$store.dispatch("setKey", userDetails.userKey);
    }

    // update user cart details
    const userCart = sessionStorage.getItem("cartDetails");
    if (userCart) {
      const cartDetails = JSON.parse(userCart);
      cartDetails.forEach((item) => {
        this.$store.dispatch("cart/addToCart", item);
      });
    }
  },
  mounted() {
    this.emitter.on("showNotification", (noteMessage) => {
      this.noteObjet = noteMessage;
      this.showNotification = true;

      setTimeout(() => {
        this.noteObjet = {};
        this.showNotification = false;
      }, 4000);
    });

    this.emitter.on("showOverlay", () => {
      this.showOverlay = true;
    });
    this.emitter.on("hideOverlay", () => {
      setTimeout(() => {
        this.showOverlay = false;
      }, 600);
    });
  },
  components: {
    Notification,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.indexMain {
  transition: all 1s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
}

.overlay {
  transition: opacity 1s ease;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
}

h1 {
  font-family: "Playfair Display SC", serif;
  letter-spacing: 2px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

button:focus,
input:focus {
  outline: none;
}

.logo {
  font-family: "Megrim", cursive;
}

.popupIndex {
  z-index: 12;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.noteTransition {
  transition: all 0.5s ease-in-out;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 12;
}

.appear-enter,
.appear-enter-active,
.appear-leave-active {
  top: -130px;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  /* transition: transform 0.3s ease; */
  transition: opacity 0.5s ease-in;
}

.slide-fade-leave-to {
  /* transform: translateX(-10px); */
  opacity: 0;
}

/* SLIDE IN  */
.slide-in-enter-active {
  transition: all 0.8s ease;
}
.slide-in-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* SLIDE UP */
.slide-up-enter-active {
  transition: all 0.8s ease;
}
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.elementSlideUp {
  animation: slide_up_img 0.6s ease;
}

.elementSlideUp2 {
  animation: slide_up_img 0.9s ease;
}

.elementSlideUp3 {
  animation: slide_up_img 1.2s ease;
}

.elementSlideUp4 {
  animation: slide_up_img 1.5s ease;
}

.slowShow {
  animation: appear 1s ease;
}

@keyframes slide_up_img {
  0% {
    opacity: 0;
    transform: translateY(250px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide_up_content {
  0% {
    transform: translateY(30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide_up_entrance {
  0% {
    opacity: 0;
    transform: translateY(250px);
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translateY(250px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

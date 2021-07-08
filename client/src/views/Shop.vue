<template>
  <div>
    <Header :addShadow="windowWidth <= 600 ? false : true"></Header>
    <section class="section pb-8 mb-24">
      <h1 class="text-2xl sm:text-4xl mt-5 md:mt-10 mb-10 md:mb-0">
        Our Collection
      </h1>
      <div
        class="w-11/12 mt-4 md:pt-5 pb-3 flex justify-between text-gray-dark border-b border-gray-300"
      >
        <div class="flex">
          <p class="fontRegular uppercase">Collections</p>
          <div class="px-5 fontRegular">/</div>
          <select
            class="fontRegular bg-transparent cursor-pointer"
            :class="windowWidth > 700 ? 'pr-10' : 'pr-2'"
            v-model="categorySelected"
          >
            <option
              v-for="category in categoryOptions"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <p class="fontRegular">{{ productData.length }} products</p>
      </div>

      <div v-if="isLoading" class="lds-roller mt-24">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div v-else class="w-11/12 pt-0 md:pt-6 flex flex-wrap justify-center">
        <!-- <transition-group name="projects"> -->
        <div v-for="(item, idx) in getProductData" :key="idx">
          <ItemCard data-aos="fade-up" :displayItem="item"></ItemCard>
        </div>
        <!-- </transition-group> -->
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/LandingPage/Header.vue";
import Footer from "../components/LandingPage/Footer.vue";
import ItemCard from "../components/Designs/ItemCard.vue";
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      titleText: "Our Collection",
      windowWidth: window.innerWidth,
      productData: [],
      categoryName: "",
      categoryOptions: ["All", "Bowls", "Mugs", "Dishes", "Plates", "Misc"],
      categorySelected: "All",
      serverData: [],
    };
  },
  created() {
    this.isLoading = true;
    const categoryParam = this.$route.params.category;
    if (categoryParam)
      this.categoryName =
        categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

    axios.get(`${process.env.VUE_APP_BASE_URL}products/`).then((data) => {
      this.serverData = data.data;
      if (categoryParam) {
        this.categorySelected =
          this.categoryName.slice(0, 1).toUpperCase() +
          this.categoryName.slice(1);
      }
      this.isLoading = true;
      this.isLoading = false;
      this.productData = data.data;
    });
  },

  computed: {
    getProductData() {
      return this.productData.filter((item) =>
        this.categorySelected == "All"
          ? this.productData
          : item.category.name == this.categorySelected
      );
    },
  },

  components: {
    Header,
    Footer,
    ItemCard,
  },
};
</script>

<style scoped>
.routerLink {
  transition: all 0.2s ease;
}
.routerLink:hover {
  border-bottom: 2px solid rgba(32, 72, 88, 0.7);
  transform: scale(1.1);
}

select {
  -webkit-appearance: menulist;
}

select:focus {
  outline: none;
}

.projects-enter-active {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
}

/* // Loading animation */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #365a69;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

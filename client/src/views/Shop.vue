<template>
  <div>
    <Header :addShadow="windowWidth <= 600 ? false : true"></Header>
    <section class="section pb-8 mb-24">
      <h1 class="text-2xl sm:text-4xl mt-5 md:mt-10 mb-10 md:mb-0">
        Our Collection
      </h1>
      <div class="w-11/12 mt-4 flex justify-between text-gray-dark">
        <div class="flex">
          <p>Collections</p>
          <div class="px-5">/</div>
          <select
            class="bg-transparent pr-10 cursor-pointer"
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
        <p>{{ productData.length }} items</p>
      </div>

      <div class="w-11/12 pt-0 md:pt-6 flex flex-wrap justify-center">
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
</style>

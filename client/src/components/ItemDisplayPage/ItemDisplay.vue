<template>
  <div>
    <Header :addShadow="true"></Header>
    <section class="section pt-2 md:pt-4">
      <div class="w-11/12 flex justify-between">
        <div class="flex items-center text-gray-500">
          <router-link
            class="routerLink border-b-2 border-transparent text-gray-500 py-3 cursor-pointer"
            to="/shop"
            >Collection</router-link
          >
          <div class="px-8">/</div>
          <p>{{ item.name }}</p>
        </div>
      </div>

      <div
        class="w-10/12 sm:w-8/12 md:w-10/12 lg:w-8/12 flex flex-col md:flex-row items-center justify-center mt-5 md:mt-10"
      >
        <div class="hidden md:flex flex-col md:flex-row w-full md:w-3/5">
          <div class="flex w-full md:w-20 md:flex-col order-2">
            <div
              class="smImage w-full m-1"
              v-for="smImg in item.imageUrlArray"
              :key="smImg"
            >
              <img
                class="w-full h-16 md:h-16 cursor-pointer"
                :src="smImg"
                @click="changeImage(smImg)"
              />
            </div>
          </div>
          <div class="lrgImage md:w-3/4 order-1 md:order-last">
            <img
              class="w-full h-80 md:h-full ml-0 md:ml-5 md:shadow-sm"
              :src="imageView"
            />
          </div>
        </div>

        <div class="flex md:hidden w-full h-80">
          <ImageSlider :images="item.imageUrlArray"></ImageSlider>
        </div>

        <div
          class="flex flex-col w-11/12 md:w-2/5 pt-8 md:pt-0 md:ml-5 text-left"
        >
          <h3 class="uppercase title1 pb-3">{{ item.name }}</h3>
          <p class="pb-3 text-gray-500 font-bold">€ {{ item.price }}</p>
          <p class="text-sm text-gray-500">{{ item.description }}</p>

          <div class="flex justify-between w-full mt-10 md:mt-20 pb-5">
            <label class="uppercase text-xs font-bold">Color</label>
            <select v-model="colourSelected" class="displaySelect">
              <option v-for="col in item.colourArr" :key="col" :value="col">
                {{ col }}
              </option>
            </select>
          </div>
          <div class="flex justify-between w-full mt-5 pb-5">
            <label class="uppercase text-xs font-bold">Quantity</label>
            <select v-model="quantityChosen" class="displaySelect">
              <option v-for="num in quantityValues" :key="num" :value="num">
                {{ num }}
              </option>
            </select>
          </div>

          <div class="w-full flex justify-center">
            <button
              :class="{ disable: !colourSelected || !quantityChosen }"
              @click="addItemToCart(item)"
              class="btn-green btn-lrg mt-10"
            >
              Add To Basket
            </button>
          </div>
        </div>
      </div>

      <ProductDescription :itemInfo="item"></ProductDescription>
    </section>
    <FrequentQuestions></FrequentQuestions>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../LandingPage/Header.vue";
import Footer from "../LandingPage/Footer.vue";
import ProductDescription from "./ProductDesription.vue";
import FrequentQuestions from "./FrequentQuestions.vue";
import ImageSlider from "../Designs/ImageSlider.vue";
import axios from "axios";

export default {
  data() {
    return {
      item: {},
      colourVal: null,
      quantityValues: ["One", "Two", "Three", "Four", "Five"],
      colourSelected: "",
      quantityChosen: "",
      quantityList: {
        One: 1,
        Two: 2,
        Three: 3,
        Four: 4,
        Five: 5,
      },
      imageView: "",
    };
  },
  methods: {
    changeImage(imgUrl) {
      this.imageView = imgUrl;
    },
    addItemToCart(item) {
      console.log("ITEM ADDED: ", item);

      this.$store.dispatch("cart/addToCart", {
        id: item._id,
        colourSelected: this.colourSelected,
        qty: this.quantityList[this.quantityChosen],
      });

      this.emitter.emit("showNotification", {
        state: true,
        message: "Item Added to Cart",
      });
    },
  },

  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_URL}products/${this.$route.params.id}`)

      .then((res) => {
        const data = res.data;
        data.colourArr = data.colour.split(",");
        data.colourArr = data.colourArr.map((col) => col.trim());
        console.log(data);
        this.imageView = data.imageUrlArray[0];
        this.item = data;
      });
  },
  components: {
    Header,
    Footer,
    ImageSlider,
    ProductDescription,
    FrequentQuestions,
  },
};
</script>

<style scoped>
.routerLink {
  transition: all 0.2s ease-in-out;
}
.routerLink:hover {
  border-bottom: 2px solid #ccc;
}

@media screen and (min-width: 768px) {
  .lrgImage {
    min-height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .smImage {
    max-width: 105px;
  }
}
</style>

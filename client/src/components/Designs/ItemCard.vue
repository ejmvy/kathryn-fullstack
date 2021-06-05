<template>
  <div
    data-aos="fade-up"
    class="bg-white w-80 flex justify-center flex-col items-center shadow-xl my-10 mx-4"
  >
    <router-link :to="{ name: 'ItemDisplay', params: { id: displayItem._id } }">
      <div @click="viewItemScroll()" class="w-80 h-48">
        <div
          class="hoverBtn absolute w-80 h-48 opacity-0 flex justify-center items-center"
        >
          <button class="btn-white">View</button>
        </div>
        <img
          class="w-full h-48 cursor-pointer imgBorder"
          :src="displayItem.imageUrlArray[0]"
        />
      </div>
    </router-link>
    <div class="p-3 pb-1 text-left w-full">
      <div class="pb-3">
        <h2 class="mb-3 text-lg">{{ displayItem.name }}</h2>
        <h3 class="pt-1 text-gray-dark text-sm">
          {{ displayItem.description }}
        </h3>
        <p class="pt-1 text-xs text-gray-500">€ {{ displayItem.price }}</p>
      </div>
      <div class="flex pb-5 pt-3">
        <div
          v-for="color in getColourArray(displayItem.colour)"
          :key="color"
          class="flex space-x-4 px-4"
        >
          <button
            @click="chooseColour(color)"
            class="h-6 w-6 border-gray-200 border rounded-full cursor-pointer colorBtn"
            :style="{
              backgroundColor: colourMatch[color]
                ? colourMatch[color]
                : '#52B5B5',
            }"
          ></button>
        </div>
      </div>
      <div
        class="flex justify-between items-center border-t border-gray-light pt-1"
      >
        <p class="text-xs uppercase font-bold text-green-dark">Quick Add</p>
        <div
          @click="addItemToCart(displayItem)"
          class="bg-transparant cursor-pointer p-2 hover:bg-gray-100 focus:ring-2 rounded-full"
        >
          <Svg :svgColour="svgColour" :svg="addSvg"></Svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Svg from "../Designs/SvgBase.vue";
export default {
  props: ["displayItem"],
  data() {
    return {
      addSvg: "M12 6v6m0 0v6m0-6h6m-6 0H6",
      svgColour: "#627F8A",
      colourMatch: {
        Rose: "#F7CAC9",
        Pink: "#FFC0CB",
        Red: "#F6404F",
        Teal: "#52B5B5",
        Blue: "#10A5F5",
        Navy: "#003366",
        Green: "#47B881",
        Purple: "#9B6DFF",
        Beige: "#FFFEEB",
        Cream: "#F9E4B7",
        White: "#F2F2F2",
        Terracotta: "#CB6843",
        Coffee: "#98694F",
        Brown: "#66462F",
      },
      colorCode: "",
      colourChosen: "",
    };
  },
  methods: {
    chooseColour(colour) {
      this.colourChosen = colour;
      console.log("chosen: " + this.colourChosen);
    },
    findColorCode(colour) {
      return this.colourMatch[colour];
    },
    getColourArray(colorString) {
      return colorString.split(",").map((val) => val.trim());
    },
    addItemToCart(item) {
      const colourArray = this.getColourArray(this.displayItem.colour);

      if (
        !this.colourChosen.length ||
        !colourArray.includes(this.colourChosen)
      ) {
        this.colourChosen = "";
        console.log("empt? " + this.colourChosen);
        return;
      }

      console.log("colour: " + this.colourChosen);

      this.$store.dispatch("cart/addToCart", {
        id: item._id,
        colourSelected: this.colourChosen,
      });

      this.emitter.emit("showNotification", {
        state: true,
        message: "Item Added to Cart",
      });

      this.getCartItems();
      this.colourChosen = "";
    },

    getCartItems() {
      return this.$store.getters["cart/products"];
    },
    viewItemScroll() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 600);
    },
  },

  components: {
    Svg,
  },
};
</script>

<style scoped>
.hoverBtn {
  background: rgba(251, 251, 251, 0.5);
  transition: all 0.5s ease-in-out;
}

.hoverBtn:hover {
  opacity: 1;
}
</style>

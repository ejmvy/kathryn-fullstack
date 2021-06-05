<template>
  <div class="w-full">
    <transition-group name="fade" tag="div" mode="out-in">
      <div v-for="i in [currentIndex]" :key="i">
        <img class="imgMain w-full h-80 relative shadow-xl" :src="currentImg" />
      </div>
    </transition-group>
    <div class="flex justify-center relative -top-12">
      <div
        class="imageBtn flex justify-center items-center w-10 h-10 rounded-full p-3"
      >
        <div class="prev text-xl" @click="prev">&#10094;</div>
      </div>
      <div class="mx-10"></div>
      <div
        class="imageBtn flex justify-center items-center w-10 h-10 rounded-full p-3"
      >
        <div class="next text-xl" @click="next">&#10095;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: ["images"],
  data() {
    return {
      timer: null,
      currentIndex: 0,
    };
  },

  mounted: function () {
    // this.startSlide();
  },

  methods: {
    // startSlide: function () {
    //   this.timer = setInterval(this.next, 5000);
    // },

    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentImg: function () {
      if (this.images) {
        return this.images[Math.abs(this.currentIndex) % this.images.length];
      }
      return "";
    },
  },
};
</script>

<style scoped>
.imgMain {
  transition: all 0.5s ease-in-out;
}
.imageBtn {
  transition: all 0.5s ease-in-out;
  z-index: 3;
  cursor: pointer;
  /* position: relative; */
}

.imageBtn:hover,
.imageBtn:focus {
  background: white;
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  /* transition: all 0.9s ease; */
  overflow: hidden;
  /* visibility: visible;  */
  position: absolute;
  /* width: 100%;  */
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  /* width: 100%;  */
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
  visibility: hidden;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
  position: absolute;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

/* https://www.vuescript.com/full-featured-carousel/
https://fengyuanchen.github.io/vue-carousel/#
https://github.com/fengyuanchen/vue-carousel
https://codepen.io/BracketMan/pen/QzYxvQ */
</style>

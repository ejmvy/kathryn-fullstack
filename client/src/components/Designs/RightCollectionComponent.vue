<template>
  <div
    data-aos="fade-left"
    data-aos-duration="1000"
    class="flex flex-col justify-center items-center lg:relative lg:-right-20 my-5 md:flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
  >
    <div
      class="flex flex-col order-last md:order-first items-center text-center relative -top-10 md:top-0 w-11/12 md:-right-5 p-8 md:flex-1 md:w-40 z-10 bg-white shadow-xl"
    >
      <div>
        <h1 class="text-left text-lg pb-2 mb-5 border-b border-gray-200">
          {{ displayCollection.title }}
        </h1>
        <p class="text-xs tracking-wider text-left leading-5 text-gray-500">
          {{
            getProductText
              ? displayCollection.shortText
              : displayCollection.longText
          }}
        </p>
        <div class="flex items-center mt-5">
          <p class="text-gray-500 text-xs mr-5">From</p>
          <h1 class="text-xl font-bold">€24</h1>
        </div>
        <router-link
          :to="{ name: 'ShowCollection', params: { category: collection } }"
        >
          <button class="btn-green-full btn-sm mt-8">SHOP NOW</button>
        </router-link>
      </div>
    </div>
    <div class="h-96 w-full md:w-8/12 z-0 shadow-xl">
      <img
        class="w-full h-full"
        :src="require(`../../assets/${displayCollection.img}`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["displayCollection", "collection"],
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    getProductText() {
      return this.windowWidth <= 600;
    },
  },
};
</script>

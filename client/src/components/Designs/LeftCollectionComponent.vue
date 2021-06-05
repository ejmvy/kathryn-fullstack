<template>
  <div
    data-aos="fade-right"
    data-aos-duration="1000"
    class="flex flex-col justify-center items-center lg:relative lg:-left-20 my-5 md:flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
  >
    <div class="h-96 w-full md:w-8/12 z-0 shadow-xl">
      <img
        class="w-full h-full"
        :src="require(`../../assets/${displayCollection.img}`)"
      />
    </div>
    <div
      class="flex flex-col items-center text-center relative -top-10 md:top-0 w-11/12 md:-left-5 p-7 md:flex-1 bg-white shadow-xl rounded-sm"
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
          <h1 class="text-xl font-bold">€58</h1>
        </div>
        <router-link
          :to="{ name: 'ShowCollection', params: { category: collection } }"
        >
          <button class="btn-green-full btn-sm mt-8">SHOP NOW</button>
        </router-link>
      </div>
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

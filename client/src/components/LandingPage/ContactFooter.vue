<template>
  <div class="bg-black-dark flex flex-col w-full py-5">
    <div
      class="flex flex-col md:flex-row justify-around items-center md:w-full"
    >
      <div class="logo">
        <p class="logo text-green-white text-4xl sm:text-5xl">KC</p>
      </div>
      <div
        class="fontRegular text-xxs md:text-left mt-8 md:mt-0 text-gray-light"
      >
        <p>+353 85 2577 656</p>
        <p class="leading-6">kathrynokelly@gmail.com</p>
        <p>Dublin, Ireland</p>
      </div>
      <div
        class="flex md:flex-col w-full md:w-44 justify-around fontRegular text-xxs md:text-left mt-8 md:mt-0 text-gray-light"
      >
        <p class="leading-6">
          @2021 {{ getfooterText ? shortName : longName }}
        </p>
        <p class="leading-6">Designed by EJ</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const windowWidth = ref(window.innerWidth);
    const longName = "Kathryn Ceramics";
    const shortName = "KC";

    /**
     *  @summary Changes footer text depending on space
     */
    const getfooterText = computed(() => windowWidth.value <= 600);

    // window.addEventListener("rezise", () => {
    //   windowWidth.value = window.innerWidth;
    //   console.log("window1:" + windowWidth.value);
    // });

    return {
      windowWidth,
      longName,
      shortName,
      getfooterText,
    };
  },
};
</script>

<style scoped>
.circle {
  transition: all 0.2s ease-in-out;
  min-width: 45px;
}
.circle:hover {
  transform: scale(1.05);
}
</style>

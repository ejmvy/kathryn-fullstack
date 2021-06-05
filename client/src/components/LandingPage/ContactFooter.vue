<template>
  <div class="bg-black-dark flex flex-col w-full py-5">
    <div
      class="flex flex-col md:flex-row justify-around items-center md:w-full"
    >
      <div class="logo">
        <p class="logo text-green-white text-4xl sm:text-5xl">KC</p>
      </div>
      <div class="text-xs md:text-left mt-8 md:mt-0 text-gray-light">
        <p>+353 85 2577 656</p>
        <p>kathrynokelly@gmail.com</p>
        <p>Dublin, Ireland</p>
      </div>
      <div
        class="flex md:flex-col w-full md:w-44 justify-around text-xs md:text-left mt-8 md:mt-0 text-gray-light"
      >
        <p>@2021 {{ getfooterText ? shortName : longName }}</p>
        <p>Designed by EJ</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      longName: "Kathryn Ceramics",
      shortName: "KC",
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    getfooterText() {
      return this.windowWidth <= 600;
    },
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

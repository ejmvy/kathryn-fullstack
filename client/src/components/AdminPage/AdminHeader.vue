<template>
  <header
    class="w-full bg-green-light flex justify-between px-3 py-4 items-center shadow-2xl"
  >
    <router-link to="/">
      <Svg :svgColour="svgColour" :svg="homeSvg"></Svg>
    </router-link>
    <p class="text-white font-bold">Welcome Kathryn!</p>
    <svg
      @click="logoutUser()"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 cursor-pointer"
      viewBox="0 0 20 20"
      fill="white"
    >
      <path
        fill-rule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
        clip-rule="evenodd"
      />
    </svg>
  </header>
</template>

<script>
import Svg from "../Designs/SvgBase.vue";
export default {
  data() {
    return {
      openConfigPanel: true,
      openOrderPanel: false,
      openHistoryPanel: false,
      currentIndex: 0,
      back: false,
      svgColour: "white",
      homeSvg:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      logoutSvg:
        "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",
    };
  },
  methods: {
    logoutUser() {
      this.$emit("logout");
    },
  },
  components: {
    Svg,
  },
};
</script>

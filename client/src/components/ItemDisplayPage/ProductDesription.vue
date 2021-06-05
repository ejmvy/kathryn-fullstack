<template>
  <section class="section w-full mt-20">
    <TitleDesign :title="titleText"></TitleDesign>

    <div class="flex w-11/12 xl:w-3/4 mt-10">
      <div class="flex flex-1 flex-col text-left px-2">
        <div class="pb-5 md:flex md:items-center">
          <label class="title1 text-xs pr-10">{{ itemInfo.name }}</label>
          <p class="text-gray-dark">{{ itemInfo.description }}</p>
        </div>
        <div class="flex flex-col items-start sm:flex-row sm:items-center pb-5">
          <label class="title1 text-xs pr-10">Dimensions</label>
          <p class="text-gray-dark">{{ itemInfo.dimensions }}</p>
        </div>
        <div class="flex flex-col items-start sm:flex-row sm:items-center pb-5">
          <label class="title1 text-xs pr-10">Colors</label>
          <p class="text-gray-dark">{{ itemInfo.colour }}</p>
        </div>
      </div>
      <div class="flex flex-1 flex-col text-left px-2">
        <div class="md:flex md:flex-row md:items-center">
          <label class="title1 text-xs pr-10">Washing Instructions</label>
          <p class="text-gray-dark">{{ itemInfo.washing }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
export default {
  props: ["itemInfo"],
  data() {
    return {
      titleText: "Product Info",
    };
  },
  components: {
    TitleDesign,
  },
};
</script>

<style scoped></style>

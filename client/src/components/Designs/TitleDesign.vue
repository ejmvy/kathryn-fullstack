<template>
  <div class="flex items-center w-11/12 justify-center mt-5 mb-7">
    <div class="w-1/2 sm:w-full bg-gray-light lineHeight"></div>
    <div class="w-4/6 text-sm uppercase text-gray-dark">
      {{ title }}
    </div>
    <div class="w-1/2 sm:w-full bg-gray-light lineHeight"></div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.lineHeight {
  height: 1px;
}
</style>

<template>
  <div class="flex flex-wrap justify-center mt-10 w-full">
    <div data-aos="fade-up" v-for="img in images" :key="img">
      <img
        class="my-8 sm:mx-8 h-60 w-80"
        :src="require(`../../assets/${img}`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
};
</script>

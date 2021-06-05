<template>
  <div class="flex flex-col items-center py-14 bg-green-white">
    <h1
      data-aos="fade-right"
      data-aos-duration="1000"
      class="text-4xl font-bold"
    >
      Keep in Touch ?
    </h1>
    <div class="flex justify-between m-auto w-1/3 my-14">
      <div v-for="icon in logos" :key="icon">
        <img :src="icon" class="w-7 h-7 cursor-pointer" />
      </div>
    </div>
    <router-link to="/contact">
      <button class="btn-black btn-lrg">Contact Us</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        "https://i.ibb.co/BjyZdsG/insta-Logo.png",
        "https://i.ibb.co/FDkCfv4/fb-f.png",
        "https://i.ibb.co/xmwsQMm/etsy2.png",
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: "Playfair Display SC", serif;
}
.pic {
  min-width: 160px;
  height: 150px;
}
</style>

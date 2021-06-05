<template>
  <section class="section mt-20">
    <TitleDesign :title="titleHeader"></TitleDesign>
    <ImageDisplay :images="recentImages"></ImageDisplay>
  </section>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
import ImageDisplay from "../Designs/ImageDisplay.vue";
export default {
  data() {
    return {
      titleHeader: "Latest Designs",
      recentImages: [
        "latestDesigns/bowl1.jpeg",
        "latestDesigns/dish1.jpeg",
        "latestDesigns/bowl2.jpeg",
        "latestDesigns/mug1.jpeg",
        "latestDesigns/mug2.jpeg",
        "latestDesigns/misc1.jpeg",
        "latestDesigns/dish2.jpeg",
        "latestDesigns/mug3.jpeg",
        // "https://i.ibb.co/CQqJwDn/bowl1.jpg",
        // "https://i.ibb.co/Bw1N2kw/dish1.jpg",
        // "https://i.ibb.co/Z6KDS3z/bowl2.jpg",
        // "https://i.ibb.co/ZJBzkxp/mug1.jpg",
        // "https://i.ibb.co/kHNCjdK/mug2.jpg",
        // "https://i.ibb.co/596y5hL/misc1.jpg",
        // "https://i.ibb.co/d6SqvBc/dish2.jpg",
        // "https://i.ibb.co/xj9zYyt/mug3.jpg",
      ],
    };
  },
  components: {
    TitleDesign,
    ImageDisplay,
  },
};
</script>

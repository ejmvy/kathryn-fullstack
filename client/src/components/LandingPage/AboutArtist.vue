<template>
  <section class="section py-14">
    <TitleDesign :title="titleHeader"></TitleDesign>

    <div class="flex flex-col md:flex-row w-4/5 lg:w-2/3 py-20 items-center">
      <div
        class="order-2 md:order-first w-4/5 md:w-3/5 py-12 md:pr-16 line leading-10"
      >
        <h1 class="title1 text-2xl pb-10">Kathryn O'Kelly</h1>
        <p class="text-sm leading-8 text-gray-500">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour. There are many variations of passages of Lorem Ipsum
          available, but the majority have suffered alteration in some form, by
          injected humour.
        </p>
      </div>
      <img
        class="order-1 w-80 h-80 sm:w-96 sm:h-96 rounded-full"
        src="../../assets/latestDesigns/artist.jpg"
      />
    </div>
  </section>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
export default {
  data() {
    return {
      titleHeader: "From Lockdown to Passion",
    };
  },
  components: {
    TitleDesign,
  },
};
</script>

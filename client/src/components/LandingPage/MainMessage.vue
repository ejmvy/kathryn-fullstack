<template>
  <section class="mainMessage section py-14 bg-gray-50">
    <div class="flex flex-col w-4/6 items-center justify-center pb-5">
      <div class="lineTop mb-14">
        <div class="line1 w-60"></div>
        <div class="line2 w-32 mt-5"></div>
        <div class="dot mt-5"></div>
      </div>
      <div class="mt-5 lg:w-2/3" data-aos="fade-up">
        <h4 class="font-bold text-2xl mb-5">
          "Thoughtful, Authentic, Personal"
        </h4>
        <p class="mt-10 text-sm leading-7">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
      </div>
      <div class="lineBottom mt-14">
        <div class="dot mt-5"></div>
        <div class="line2 w-32 mt-5"></div>
        <div class="line1 w-60 mt-5"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mainMessage {
  opacity: 0;
  animation: slide_up_content 2s forwards 3s;
}
</style>

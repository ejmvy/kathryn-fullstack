<template>
  <div
    class="banner absolute flex items-center top-5 right-5 py-3 px-6 text-left rounded-sm bg-white shadow-xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 mr-5"
      viewBox="0 0 20 20"
      :fill="notificationObj.state ? '#50ccc7' : 'red'"
    >
      <path
        fill-rule="evenodd"
        :d="notificationObj.state ? successIcon : errorIcon"
        clip-rule="evenodd"
      />
    </svg>

    <div class="tracking-widest">
      <h5 v-if="notificationObj.title" class="text-xs uppercase pb-2">
        {{ notificationObj.title }}
      </h5>
      <p class="text-xs" v-if="notificationObj.message">
        {{ notificationObj.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notificationObj"],
  data() {
    return {
      successIcon:
        "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      errorIcon:
        "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    };
  },
};
</script>

<style scoped>
.banner {
  min-width: 250px;
  z-index: 5;
  /* color: #51e68a; */
}
</style>

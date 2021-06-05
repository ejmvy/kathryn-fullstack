<template>
  <div
    class="popupIndex w-screen h-screen fixed top-0 left-0 flex justify-center"
  >
    <div class="popupArea w-1/2 lg:w-1/3 bg-white shadow-xl m-auto rounded-md">
      <div
        class="w-14 h-14 bg-green-med relative m-auto -top-5 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="popupData.icon"
          />
        </svg>
      </div>
      <div class="font-bold">
        {{ popupData.title }}
      </div>
      <div class="text-sm p-10 text-gray-500">
        {{ popupData.message }}
      </div>

      <div class="flex justify-between border-t border-gray-300 py-3 px-2">
        <button class="btn-light-green btn-sm" @click="$emit('closePopup')">
          Close
        </button>
        <button
          class="btn-light-green-full btn-sm"
          @click="$emit('confirmAction')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["popupData"],
};
</script>

<style scoped>
/* #50ccc7; */
.popupArea {
  min-height: 100px;
  border-top: 4px solid #50ccc7;
}
</style>

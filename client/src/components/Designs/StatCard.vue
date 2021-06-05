<template>
  <div
    class="cardItem border border-gray-300 shadow-xl py-5 px-6 flex flex-col justify-between rounded-xl h-44 hover:shadow-2xl cursor-pointer"
  >
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h5 class="uppercase text-green-light text-xs font-bold">
          {{ cardObject.cardTitle }}
        </h5>
        <p
          class="text-left mt-3 text-green-dark"
          :class="cardObject.change == 'Top 1' ? 'text-2xl' : ' text-4xl'"
        >
          {{ cardObject.cardFigure }}
        </p>
      </div>
      <div class="cardIcon">
        <div
          class="bg-green-light p-4 h-16 w-16 flex justify-center items-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="cardObject.icon"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="cardObject.direction" class="flex items-center self-start">
      <img
        class="w-4 h-4"
        :src="
          cardObject.direction == 'up'
            ? 'https://i.ibb.co/n6wwL5x/green-Increase.png'
            : 'https://i.ibb.co/qksddSx/redDown.png'
        "
      />
      <div class="px-4 flex">{{ cardObject.change }}</div>
      <p class="text-gray-400 text-sm">Since last month</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardObject"],
};
</script>

<style scoped>
/* increaseColor = #4BDD68   #71CC98*/
/* decreaseColor = #E23F36 */
/* // #365a69; */
.cardItem {
  border-top: 4px solid #627f8a;
  width: 300px;
}
</style>

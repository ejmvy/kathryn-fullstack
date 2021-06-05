<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    :stroke="svgColour ? svgColour : 'currentColor'"
  >
    <path
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="svg"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  props: ["svg", "svgColour"],
};
</script>

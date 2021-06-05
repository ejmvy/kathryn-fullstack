<template>
  <div class="w-full">
    <div class="w-11/12 m-auto flex justify-between">
      <Svg @click="closeChart()" :svg="backSvg"></Svg>
      <h1>{{ getDashboardName }}</h1>
      <div></div>
    </div>
    <div class="w-full">
      <div class="flex flex-wrap justify-center">
        <div
          style="width: 300px; height: 300px"
          class="my-20 mx-10"
          v-for="category in categoryNames"
          :key="category"
        >
          <h1>{{ category }}</h1>
          <p
            v-if="!categories[category].data.length"
            class="mt-10 text-gray-400 text-sm"
          >
            No Data
          </p>
          <PieChart :pieData="categories[category]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../Charts/PieChart.vue";
import Svg from "../Designs/SvgBase.vue";
export default {
  props: ["dashboardData"],
  data() {
    return {
      backSvg: "M15 19l-7-7 7-7",
      dashboardNames: {
        categoryStats: "Category Breakdown Dashboard",
      },
      pieData: {
        labels: [],
        data: [],
      },
      categories: {},
      categoryNames: [],
    };
  },

  methods: {
    closeChart() {
      this.$emit("closeChart");
    },
  },

  computed: {
    getDashboardName() {
      return this.dashboardNames[this.dashboardData.name];
    },
  },

  created() {
    console.log("stats: ");
    console.log(this.dashboardData);

    this.categoryNames = Object.keys(this.dashboardData.data);

    for (var key in this.dashboardData.data) {
      this.categories[key] = {
        labels: Object.keys(this.dashboardData.data[key]),
        data: Object.values(this.dashboardData.data[key]),
      };
    }
  },

  components: {
    Svg,
    PieChart,
  },
};
</script>

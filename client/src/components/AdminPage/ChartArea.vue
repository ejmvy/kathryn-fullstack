<template>
  <div class="w-full lg:w-3/4">
    <div class="w-full flex justify-between">
      <Svg @click="closeChart()" :svg="backSvg"></Svg>
      <h1>{{ getChartName }}</h1>
      <div>
        <select
          v-model="monthSelected"
          v-if="chartData.name == 'mostPopular'"
          @change="onChange()"
        >
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-14">
      <div
        v-if="
          chartData.name != 'monthlyIncome' && chartData.name != 'averageOrder'
        "
      >
        <BarChart :chartData="chartData"></BarChart>
      </div>
      <div v-else>
        <LineChart :chartData="chartData"></LineChart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../Charts/BarChart.vue";
import LineChart from "../Charts/LineChart.vue";
import Svg from "../Designs/SvgBase.vue";

export default {
  props: ["chartData"],
  data() {
    return {
      backSvg: "M15 19l-7-7 7-7",
      chartTitles: {
        totalSales: "Total Sales",
        newUsers: "New Users",
        monthlyIncome: "Monthly Income",
        mostPopular: "Most Popular Products This Month",
        averageOrder: "Average Order Value",
        returningUsers: "Returning Users",
      },
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthSelected: "",
    };
  },
  methods: {
    closeChart() {
      this.$emit("closeChart");
    },
    onChange() {
      console.log("month::");
      console.log(this.monthSelected);
    },
  },

  computed: {
    getChartName() {
      return this.chartTitles[this.chartData.name];
    },
  },

  components: {
    Svg,
    BarChart,
    LineChart,
  },
};
</script>

<style scoped></style>

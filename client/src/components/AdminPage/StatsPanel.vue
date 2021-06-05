<template>
  <div style="height: 100%">
    <div
      v-if="showMenu"
      class="slowShow flex flex-col h-full w-full items-center"
    >
      <h5 class="mb-3 labelxs text-gray-500">Sales This Month</h5>
      <div class="flex w-full justify-around flex-wrap">
        <StatCard
          data-aos="fade-up"
          @click="showBarChart('totalSales')"
          class="mx-2 mt-8"
          :cardObject="totalSales"
        ></StatCard>
        <StatCard
          data-aos="fade-up"
          data-aos-delay="100"
          @click="showBarChart('averageOrder')"
          class="mx-2 mt-8"
          :cardObject="averageOrderValue"
        ></StatCard>

        <StatCard
          data-aos="fade-up"
          data-aos-delay="150"
          @click="showBarChart('monthlyIncome')"
          class="mx-2 mt-8"
          :cardObject="monthlyIncome"
        ></StatCard>
      </div>

      <h5 class="pt-20 mb-3 labelxs text-gray-500">Monthly Figures</h5>
      <div class="flex w-full justify-around flex-wrap">
        <StatCard
          data-aos="fade-up"
          data-aos-delay="200"
          @click="showBarChart('mostPopular')"
          class="mx-2 mt-8"
          :cardObject="mostPopular"
        ></StatCard>
        <StatCard
          data-aos="fade-up"
          data-aos-delay="250"
          @click="showBarChart('newUsers')"
          class="mx-2 mt-8"
          :cardObject="newUsers"
        ></StatCard>
        <StatCard
          data-aos="fade-up"
          data-aos-delay="300"
          class="mx-2 mt-8"
          @click="showBarChart('returningUsers')"
          :cardObject="returningUsers"
        ></StatCard>
      </div>
      <h5 class="pt-20 mb-3 labelxs text-gray-500">Analytics Dashboards</h5>
      <div class="flex w-full justify-around flex-wrap mb-16">
        <button
          class="btn-green btn-lrg mt-10"
          @click="getDashboardData('categoryStats')"
        >
          View Category Dashboard
        </button>
      </div>
    </div>
    <div v-if="showChart" class="w-full flex justify-center py-2 px-5">
      <ChartArea
        class="slowShow"
        :chartData="chartData"
        @closeChart="closeChart()"
      ></ChartArea>
    </div>
    <div v-if="showDashboard" class="w-full flex justify-center py-2 px-5">
      <Dashboard
        class="slowShow"
        @closeChart="closeChart()"
        :dashboardData="dashboardData"
      ></Dashboard>
    </div>
  </div>
</template>

<script>
import Dashboard from "./DashboardArea.vue";
import StatCard from "../Designs/StatCard.vue";
import ChartArea from "./ChartArea.vue";
import axios from "axios";

export default {
  data: () => ({
    showMenu: true,
    showChart: false,
    showDashboard: false,
    chartData: {
      name: "",
      data: [],
    },
    dashboardData: {
      name: "",
      data: [],
    },

    totalSales: {
      cardTitle: "Total Sales",
      icon:
        "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    newUsers: {
      cardTitle: "New Users",
      icon:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    monthlyIncome: {
      cardTitle: "Monthly Income",
      icon:
        "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    },
    mostPopular: {
      cardTitle: "Most Popular Product",
      direction: "up",
      change: "Top 1",
      icon:
        "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
    returningUsers: {
      cardTitle: "Returning Users",
      icon:
        "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    },
    averageOrderValue: {
      cardTitle: "Average Order Value",
      icon:
        "M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  }),
  methods: {
    async getDashboardData(dashboardName) {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}stats/${dashboardName}`)
        .then((data) => {
          this.dashboardData.data = data.data;
          this.dashboardData.name = dashboardName;
          this.showDashboard = true;
          this.showMenu = false;
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    },
    async showBarChart(chartName) {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}stats/${chartName}`)
        .then((data) => {
          this.chartData.name = chartName;
          this.chartData.data = Object.values(data.data);
          if (chartName == "mostPopular")
            this.chartData.labels = Object.keys(data.data);
          this.showMenu = false;
          this.showChart = true;
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    },
    closeChart() {
      this.showDashboard = false;
      this.showChart = false;
      this.showMenu = true;
    },
  },
  created() {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    console.log(`year: ${year} : month ${month}`);

    axios
      .get(`${process.env.VUE_APP_BASE_URL}stats/orders/${year}/${month}`)
      .then((result) => {
        console.log("data stats: ");
        console.log(result.data);
        let data = result.data;
        this.totalSales.cardFigure = data.current;
        this.totalSales.change = `${data.orderDifference.toFixed(0)}%`;
        this.totalSales.direction = data.current > data.prev ? "up" : "down";

        this.monthlyIncome.cardFigure = `€ ${data.currentSales.toFixed(0)}`;
        this.monthlyIncome.change = `${data.salesDifference.toFixed(0)}%`;
        this.monthlyIncome.direction =
          data.currentSales > data.prevSales ? "up" : "down";

        this.mostPopular.cardFigure = data.topSales[0]
          ? data.topSales[0].name
          : "";

        this.returningUsers.cardFigure = data.currentReturningUsers;
        this.returningUsers.change = `${data.returningUserDifference.toFixed(
          2
        )}%`;
        this.returningUsers.direction =
          data.currentReturningUsers > data.prevReturningUsers ? "up" : "down";

        this.averageOrderValue.cardFigure = data.currentAverage
          ? `€ ${data.currentAverage.toFixed(2)}`
          : "0";
        this.averageOrderValue.change = data.averageSalesDifference
          ? `${data.averageSalesDifference.toFixed(0)}%`
          : "0";
        this.averageOrderValue.direction =
          data.currentAverage > data.prevAverage ? "up" : "down";
      });

    axios
      .get(`${process.env.VUE_APP_BASE_URL}stats/newUsers/${year}/${month}`)
      .then((result) => {
        console.log("users stats: ");
        console.log(result.data);
        let data = result.data;
        this.newUsers.cardFigure = data.current;
        this.newUsers.change = `${data.difference.toFixed(0)}%`;
        this.newUsers.direction = data.current > data.prev ? "up" : "down";
      });
  },

  components: {
    StatCard,
    ChartArea,
    Dashboard,
  },
};
</script>

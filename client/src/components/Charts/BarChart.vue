<script>
import { defineComponent } from "vue";
import { Bar } from "vue3-chart-v2";

export default defineComponent({
  name: "Chart",
  extends: Bar,
  props: ["chartData"],
  data() {
    return {
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
    };
  },

  mounted() {
    this.renderChart(
      {
        labels:
          this.chartData.name != "mostPopular"
            ? this.months
            : this.chartData.labels,
        datasets: [
          {
            barPercentage: 0.4,
            label: "Total per month",
            backgroundColor: "#627F8A",
            height: "500px",
            data: this.chartData.data,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
      }
    );
  },
});
</script>

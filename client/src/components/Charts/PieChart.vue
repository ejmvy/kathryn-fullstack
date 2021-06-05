<script>
import { defineComponent } from "vue";
import { Pie } from "vue3-chart-v2";

export default defineComponent({
  name: "PieChart",
  extends: Pie,
  props: ["pieData"],
  mounted() {
    this.renderChart(
      {
        labels: this.pieData.labels,
        datasets: [
          {
            label: "Total per month",
            height: "300px",
            width: "280px",
            backgroundColor: [
              "#627F8A",
              "#D0E8E2",
              "#365a69",
              "#50ccc7",
              "#C4C3C5",
            ],

            data: this.pieData.data,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
});
</script>

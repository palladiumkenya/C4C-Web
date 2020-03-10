<template>
  <section class="charts">
        <h3>Exposure Rates</h3>
        <vue-highcharts :options="options" ref="barChart"></vue-highcharts>
    </section>
</template>


<script>
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";

const data = {
  chart: {
    type: "bar"
  },
  title: {
    text: "Exposures Rates Per Cadre"
  },

  xAxis: {
    categories: ["Doctor", "Clinical Officer", "Nurse", "Student", "Laboratory Technologist", "Cleaner", "Waste Handler", "VCT Counsellor", "Other"],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Number",
      align: "high"
    },
    labels: {
      overflow: "justify"
    }
  },
  tooltip: {
    valueSuffix: " hundreds"
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: "Reported Exposures",
      data: [107, 31, 635, 203, 2, 55, 8, 90, 21]
    },
    {
      name: "Registered HCWs",
      data: [133, 156, 947, 408, 6, 82, 67, 104, 78]
    },

  ]
};
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data
    };
  }
};
</script>
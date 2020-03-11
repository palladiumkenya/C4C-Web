<template>
  <div>
    <highmaps :options="chartOptions"></highmaps>
  </div>
</template>

<script>
  import VueHighcharts from "vue2-highcharts";
  import Highcharts from "highcharts";
  //import json from './components/map.json'

  export default {
    components: {
    VueHighcharts
  },
    data() {
      return {
        chartOptions: {
          chart: {
            map: json,
          },
        }

      }
    }
  }
</script>
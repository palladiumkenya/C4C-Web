<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary Report</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Type</v-tab>
      <v-tab>Report By Time</v-tab>
      <v-tab>Report By Location</v-tab>
      <v-tab>Report By Hours</v-tab>
      <v-tab>Report By Gender</v-tab>
      <v-tab-item
        v-for="n in 8"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <div id="chartType">
        <h3>Select chart type:</h3>
        <select v-model="chartType">
          <option>Spline</option>
          <option>AreaSpline</option>
          <option>Line</option>
          <option>Scatter</option>
          <option>Column</option>
          <option>Area</option>
        </select>
      </div>

              <template>
                <section class="charts">
                  <h3>Exposures Visualization</h3>
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
          <v-card-text v-if="n==2">This is the second tab</v-card-text>
          <v-card-text v-if="n==3">This is the Third tab</v-card-text>
          <v-card-text v-if="n==4">This is the Third tab</v-card-text>
          <v-card-text v-if="n==5">This is the Third tab</v-card-text>
          <v-card-text v-if="n==6">This is the Third tab</v-card-text>
          <v-card-text v-if="n==7">This is the Third tab</v-card-text>
          <v-card-text v-if="n==8">This is the Third tab</v-card-text>
          <v-card-text v-if="n==9">This is the Third tab</v-card-text>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>
import VueHighcharts from 'vue2-highcharts'
// import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
// SeriesLabel(Highcharts);
exportingInit(Highcharts);
const datas = 'https://jsonplaceholder.typicode.com/users'
console.log(datas);
const data = {
  title: {
    text: 'Exposures Chart Analysis'
  },
  xAxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  labels: {
    items: [
      {
        html: 'Exposures Summary',
        style: {
          left: '50px',
          top: '18px',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
        }
      }
    ]
  },
  series: [

    {
      type: 'column',
      name: 'Monthly Exposures',
      data: [7, 3, 3, 9, 0, 5, 6, 2, 4, 1, 8, 0]
    }

  ]
}

export default {
  components: {
    VueHighcharts
  },
  data () {
    return {
         chartType: 'Spline',
        chartOptions: {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Sin chart'
            },
        },
      options: data
    }
  }
}
</script>

<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>

      <!-- Start Cards -->
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="white"
          title="Number of Registered HCWs"
          value="34,245"
          sub-icon="mdi-tag"

        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="white"
          title="Number of Reported Exposures"
          value="1800"
          sub-icon="mdi-alert"
          sub-icon-color="error"

        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="white"
          title="HCWs With Reported Exposures"
          value="75"
          sub-icon="mdi-tag"

        />
      </v-flex>

      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="white"
          title="Number of Broadcast Messages"
          value="1075"
          sub-icon="mdi-tag"

        />
      </v-flex>

      <!-- End Cards -->


      <!-- Filters -->
      <template>
        <core-filters />
      </template>

  <!-- Filters -->
     <template>
        <core-DatePicker />
     </template>


    <template>
        <core-filters/>
    </template>

      <!-- Start Tables -->

      <!-- Start Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >
        <template>
          <section class="charts">
            <h3>Exposures Visualization</h3>
            <vue-highcharts :options="options" />
          </section>
        </template>

      </v-flex>

      <!-- End Graphs -->

      <!-- Start Maps -->
      <v-flex
      >

        <template>
          <div>
            <highmaps :options="chartOptions"/>
          </div>
        </template>

      </v-flex>

      <!-- Start Tables -->

    </v-layout>
  </v-container>
</template>

<script>

import Filters from './views/filters.vue'
export default {
  components: {
    'dashboard-filters': Filters,
    VueHighcharts
  },
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },

      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
<!-- Pie Exposure chart -->

<script>
import VueHighcharts from "vue2-highcharts";
//import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from "highcharts";

//SeriesLabel(Highcharts);

const data = {
  title: {
    text: "Exposures Chart Analysis"
  },
  xAxis: {
    categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  labels: {
    items: [
      {
        html: "Exposures Per Cadre",
        style: {
          left: "50px",
          top: "18px",
          color: (Highcharts.theme && Highcharts.theme.textColor) || "black"
        }
      }
    ]
  },
  series: [

    {
      type: "column",
      name: "Monthly Exposures",
      data: [7, 3, 3, 9, 0, 5, 6, 2, 4, 1, 8, 0]
    },
    {

    },
    {
      type: "pie",
      name: "Number of Exposure:",
      data: [
        {
          name: "Doctor",
          y: 13,
          color: Highcharts.getOptions().colors[0] // Jane's color
        },
        {
          name: "Nurse",
          y: 23,
          color: Highcharts.getOptions().colors[1] // John's color
        },
        {
          name: "Clinical Officer",
          y: 19,
          color: Highcharts.getOptions().colors[2] // Joe's color
        }
      ],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }
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

<!-- chart scripts

<script>
  import HighCharts from 'vue-highcharts';
  import json from '../map.json'

  export default {
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
</script> -->

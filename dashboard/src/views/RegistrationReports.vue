
<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary</v-tab>
      <v-tab>Report By Cadre</v-tab>
      <v-tab>Report By Age</v-tab>
      <v-tab>Report By Gender</v-tab>
<<<<<<< HEAD


      <v-tab-item
        v-for="n in 4"
=======
      <v-tab-item
        v-for="n in 3"
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >
<<<<<<< HEAD

              <template>
                <section class="charts">
                  <h3>Registration Visualization</h3>
                    <core-filters />
=======
              <template>
                <section class="charts">
                  <h3>Registration Visualization</h3>
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
<<<<<<< HEAD
          <v-card-text v-if="n==2">

            <v-flex
              md12
              sm12
              lg12
            >
              <template>
                <section class="charts">
                  <h3>Cadre Visualization</h3>
                    <core-filters />
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>

          </v-card-text>
          <v-card-text v-if="n==3">

               <v-flex
              md12
              sm12
              lg12
            >
              <template>
                <section class="charts">
                  <h3>Age Visualization</h3>
                    <core-filters />
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>

          </v-card-text>
           <v-card-text v-if="n==4">
              <v-flex
              md12
              sm12
              lg12
            >

              <template>
                <section class="charts">
                  <h3>Gender Visualization</h3>
                    <core-filters />
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>

           </v-card-text>
=======
          <v-card-text v-if="n==2">This is the second tab</v-card-text>
          <v-card-text v-if="n==3">This is the Third tab</v-card-text>
>>>>>>> 0fa2db61c103f3ff3124c00af8465b1e363c9f84
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>

<script>
import VueHighcharts from 'vue2-highcharts'
// import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from 'highcharts'

// SeriesLabel(Highcharts);

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
        html: 'Exposures Per Cadre',
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
    },
    {

    },
    {
      type: 'pie',
      name: 'Number of Exposure:',
      data: [
        {
          name: 'Doctor',
          y: 13,
          color: Highcharts.getOptions().colors[0] // Jane's color
        },
        {
          name: 'Nurse',
          y: 23,
          color: Highcharts.getOptions().colors[1] // John's color
        },
        {
          name: 'Clinical Officer',
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
}
export default {
  components: {
    VueHighcharts
  },
  data () {
    return {
      options: data
    }
  }
}
</script>

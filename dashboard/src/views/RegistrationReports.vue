
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


      <v-tab-item
        v-for="n in 4"
        :key="n">
        <v-container fluid>
          <v-card-text v-if="n==1">
            <!-- Start Graphs -->

            <v-flex
              md12
              sm12
              lg12
            >

              <template>
                <section class="charts">
                  <h3>Registration Visualization</h3>
                    <core-filters />
                  <vue-highcharts :options="options" />
                </section>
              </template>

            </v-flex>
          </v-card-text>
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
                  <views-HbvReports :options="options" />
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
    text: 'Registration Summary'
  },
  xAxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },

  series: [

    {
      type: 'column',
      name: 'Monthly Exposures',
      data: []
    },
    {

    },

  ]
}
export default {
  components: {
    VueHighcharts
  },

   mounted() {
     // Imitate sending data request
     setTimeout(() => {
       console.log(this.$refs.chart.chart)
       this.chartOptions.series[0].data = [1, 2, 3];
       this.$refs.chart.chart.hideLoading();
     }, 2000)
   },

  data () {
    return {
       counter: 2,
      chartOptions: {
        chart: {
          events: {
            load() {
              this.showLoading();
            }
          }
        },
        series: [{
          data: []
        }]
      },

      options: data
    }
  }
}
</script>

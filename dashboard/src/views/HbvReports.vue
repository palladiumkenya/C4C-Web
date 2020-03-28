<template>
  <v-card>
    <v-tabs
      color="teal lighten-5"
      centered
    >
      <v-tab>Summary</v-tab>
      <v-tab>HBV Listing</v-tab>



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
               <h4>Select Type</h4>
  <v-select :options="options"></v-select>
                <Hbvfilter/>
           </template>
              <template>
                   <div>
                       <highcharts
                       :options="chartOptions"
                        ref="lineCharts"
                        :constructor-type="stockChart">
                       </highcharts>

                   </div>

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

              </template>

            </v-flex>

          </v-card-text>

        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>

</template>



<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";

import { EventBus } from "./../event-bus.js";

//import Hbvfilter from '@/components/Filters/Hbvfilter.vue';


stockInit(Highcharts);
exportingInit(Highcharts);

export default {
  props: {
    partsdata: {
      type: Array
    }
  },

  components: {
    Hbvfilter,
    highcharts: Chart,
    btn: Hbvfilter

  },

  created() {
    EventBus.$on("btn-clicked", data => {
      this.chartOptions.series[0].data = data.newData;
    });
  },

  data() {

    return {
      chartOptions: {
        chart: {
          type: "spline",
          title: "Hassaan"
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: "#666666",
              lineWidth: 1
            }
          }
        },
        series: [
          {
            data: []
          }
        ]
      }

    };
  }
};
</script>

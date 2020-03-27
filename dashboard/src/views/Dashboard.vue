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



          <template>
  <v-card
    class="mx-auto"
    color="#2196f3"
    dark
  >

    <v-card-text>

       <h2  align="center">{{ resultCount }}</h2>
        <h5 align="center">Registered HCWs</h5>
    </v-card-text>
 <v-icon
        left
      >
        mdi-twitter
      </v-icon>
  </v-card>
</template>


      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >



          <template>
  <v-card
    class="mx-auto"
    color="#2196f3"
    dark
  >

    <v-card-text>

       <h2 align="center">{{ facilityCount }}</h2>
        <h5 align="center">Reported Exposures</h5>
    </v-card-text>
 <v-icon
        left
      >
        mdi-twitter
      </v-icon>
  </v-card>
</template>

      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >

          <template>
  <v-card
    class="mx-auto"
    color="#2196f3"
    dark
  >

    <v-card-text>

       <h2 align="center">{{ exposuresCount }}</h2>
        <h5 align="center">HCWs With Exposures</h5>
    </v-card-text>
 <v-icon
        left
      >
        mdi-twitter
      </v-icon>
  </v-card>
</template>


      </v-flex>

      <v-flex
        sm6
        xs12
        md6
        lg3
      >

         <template>
  <v-card
    class="mx-auto"
    color="#2196f3"
    dark
  >

    <v-card-text>

       <h2 align="center">{{ facilityCount }}</h2>
        <h5 align="center">Broadcast Messages</h5>
    </v-card-text>
 <v-icon
        left
      >
        mdi-twitter
      </v-icon>
  </v-card>
</template>

      </v-flex>

      <!-- End Cards -->

      <!-- Filters -->

      <!-- Start Graphs -->
      <v-flex
        md12
        sm12
        lg12
      >
        <template>
          <section class="charts" >

            <vue-highcharts :options="options" />
          </section>
        </template>

      </v-flex>

      <!-- End Graphs -->
        <v-flex
         md12
        sm12
        lg12
        >
          <template>
            <section v-if="chartOptions.series[0].data.length">
               <vue-highcharts class="hc" :options="chartOptions" ref="chart"></vue-highcharts>
            </section>
          </template>

        </v-flex>

        <v-flex
          md12
        sm12
        lg12
        >

              <template>
            <section v-if="pieOptions.series[0].data.length">
        <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
           </section>
        </template>

        </v-flex>

      <!-- Start Maps -->


      <!-- Start Tables -->

    </v-layout>
  </v-container>
</template>


<!-- Pie Exposure chart -->

<script>
import VueHighcharts from "vue2-highcharts";
//import SeriesLabel from "highcharts/modules/series-label";
import Highcharts from "highcharts";
import axios from "axios";

//SeriesLabel(Highcharts);

export const data = {
  title: {
    text: "Exposures Chart Analysis"
  },
  xAxis: {
    categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  series: [

    {
      type: "column",
      name: "Monthly Exposures On Yearly Basis",
     data: []
    },

  ]
};

export const PieData = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: "General Exposures Per Cadre"
  },
  subtitle: {
    text: ""
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [
    {
      name: "Number of Exposures",
      data: [


      ]
    }
  ]
};

// my test api


//end test


export default {

    // test script
    beforeCreate() {
        fetch('https://api.myjson.com/bins/hj6se')   // column chart api call
            .then(resp => resp.json())
            .then(resp => {
                this.chartOptions.series[0].data = resp;
            });

        fetch('https://api.myjson.com/bins/hj6se')  // pie chart api call
            .then(resp => resp.json())
            .then(resp => {
                this.pieOptions.series[0].data = resp;
            });
    },




  components: {
    VueHighcharts
  },
  data() {
    return {
        Options: {

            series: [
                {
                  data: []
                }
            ]

      },
      chartOptions: data,
        pieOptions: PieData,

        facilityList: [],

        // returning count on the dashboard

            facility_exposures: {},
            hcw_exposures: {},
            registered_hcw: {}


    };
  },


    // number of registered HCW # mounted

   mounted() {

        // number of registered HCW #mounted

      axios.get('http://c4ctest.mhealthkenya.org/api/hcw/facility/1')
        .then(response => {
        this.registered_hcw = response.data  // <--- Im thinking this is an object
        this.registered_hcwData = response
      .catch(error => console.log(error))
      })

       // all facility exposures

       axios.get('http://c4ctest.mhealthkenya.org/api/exposures/facility/1')
       .then(response => {
        this.facility_exposures = response.data  // <--- Im thinking this is an object
        this.facility_exposuresData = response
      .catch(error => console.log(error))
      })

       // hcw with exposures # mounted

        axios.get('http://c4ctest.mhealthkenya.org/api/hcw/facility/1')
            .then(response => {
        this.hcw_exposures = response.data  // <--- Im thinking this is an object
        this.hcw_exposuresData = response
      .catch(error => console.log(error))
      })
    },
        // number of registered HCWs # computed
    computed: {
        resultCount () {
            return Object.keys(this.registered_hcw).length
        },

        // all facility exposures # computed

         facilityCount () {
            return Object.keys(this.facility_exposures).length
        },

        // hcws with exposures # computed

        exposuresCount () {
            return Object.keys(this.hcw_exposures).length
        },
    },

    // hcw with exposures



    // my test A




}

</script>

//script 2

